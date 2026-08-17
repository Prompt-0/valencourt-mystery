import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type {
  LocationId,
  SuspectId,
  ClueId,
  Suspect,
  Clue,
  GameLocation,
  PinboardConnection,
  EndingResult,
} from '../types/game';
import { INITIAL_LOCATIONS } from '../data/locations';
import { INITIAL_SUSPECTS } from '../data/suspects';
import { INITIAL_EVIDENCE } from '../data/evidence';
import { DEDUCTION_RECIPES } from '../data/deductions';
import {
  ENDING_MASTER_TRUTH,
  ENDING_WRONG_SILAS,
  ENDING_WRONG_ELEANOR,
  ENDING_BOTCHED,
} from '../data/endings';
import { sound } from '../audio/soundEngine';

export interface GameNotification {
  id: string;
  title: string;
  message: string;
  type: 'clue' | 'deduction' | 'contradiction' | 'unlock';
}

interface GameContextType {
  currentLocationId: LocationId;
  currentLocation: GameLocation;
  locations: GameLocation[];
  suspects: Suspect[];
  evidence: Clue[];
  discoveredClueIds: ClueId[];
  inspectedClue: Clue | null;
  activePuzzle: 'astronomical_box' | 'toxicology' | 'cipher' | null;
  interrogatingSuspect: Suspect | null;
  isDossierOpen: boolean;
  dossierTab: 'suspects' | 'evidence' | 'mindpalace' | 'timeline';
  isAccusationOpen: boolean;
  endingResult: EndingResult | null;
  isIntroOpen: boolean;
  isHintOpen: boolean;
  isMuted: boolean;
  notifications: GameNotification[];
  pinboardConnections: PinboardConnection[];
  solvedPuzzles: { astronomical_box: boolean; toxicology: boolean; cipher: boolean };
  deductionsMade: string[];

  // Actions
  moveToLocation: (locId: LocationId) => void;
  discoverClue: (clueId: ClueId) => void;
  inspectClue: (clue: Clue | null) => void;
  openPuzzle: (puzzle: 'astronomical_box' | 'toxicology' | 'cipher' | null) => void;
  solvePuzzle: (puzzle: 'astronomical_box' | 'toxicology' | 'cipher') => void;
  openInterrogation: (suspect: Suspect | null) => void;
  presentEvidence: (suspectId: SuspectId, topicId: string, clueId: ClueId) => boolean;
  askQuestion: (suspectId: SuspectId, topicId: string) => void;
  openDossier: (open: boolean, tab?: 'suspects' | 'evidence' | 'mindpalace' | 'timeline') => void;
  openAccusation: (open: boolean) => void;
  submitAccusation: (
    culpritId: SuspectId,
    weaponClueId: ClueId,
    entryMethodClueId: ClueId,
    motiveClueId: ClueId
  ) => void;
  addPinboardConnection: (fromId: string, toId: string) => void;
  removePinboardConnection: (connectionId: string) => void;
  checkMindPalaceDeduction: (clueA: ClueId, clueB: ClueId) => boolean;
  closeIntro: () => void;
  openHint: (open: boolean) => void;
  toggleMute: () => void;
  dismissNotification: (id: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'valencourt_enigma_save_v1';

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locations] = useState<GameLocation[]>(INITIAL_LOCATIONS);
  const [currentLocationId, setCurrentLocationId] = useState<LocationId>('locked_study');
  const [suspects, setSuspects] = useState<Suspect[]>(INITIAL_SUSPECTS);
  const [evidence, setEvidence] = useState<Clue[]>(INITIAL_EVIDENCE);
  const [discoveredClueIds, setDiscoveredClueIds] = useState<ClueId[]>([
    'victim_body',
    'brandy_snifter',
    'shattered_watch',
    'brass_study_key',
    'torn_cipher',
  ]);
  const [inspectedClue, setInspectedClue] = useState<Clue | null>(null);
  const [activePuzzle, setActivePuzzle] = useState<'astronomical_box' | 'toxicology' | 'cipher' | null>(null);
  const [interrogatingSuspect, setInterrogatingSuspect] = useState<Suspect | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [dossierTab, setDossierTab] = useState<'suspects' | 'evidence' | 'mindpalace' | 'timeline'>('suspects');
  const [isAccusationOpen, setIsAccusationOpen] = useState<boolean>(false);
  const [endingResult, setEndingResult] = useState<EndingResult | null>(null);
  const [isIntroOpen, setIsIntroOpen] = useState<boolean>(true);
  const [isHintOpen, setIsHintOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<GameNotification[]>([]);
  const [pinboardConnections, setPinboardConnections] = useState<PinboardConnection[]>([]);
  const [solvedPuzzles, setSolvedPuzzles] = useState<{
    astronomical_box: boolean;
    toxicology: boolean;
    cipher: boolean;
  }>({
    astronomical_box: false,
    toxicology: false,
    cipher: false,
  });
  const [deductionsMade, setDeductionsMade] = useState<string[]>([]);

  // Sound and Ambience Start
  useEffect(() => {
    const handleFirstClick = () => {
      sound.startAtmosphericRain();
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  const addNotification = useCallback(
    (title: string, message: string, type: 'clue' | 'deduction' | 'contradiction' | 'unlock') => {
      const id = Date.now().toString() + Math.random().toString();
      setNotifications((prev) => [...prev, { id, title, message, type }]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5500);
    },
    []
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const discoverClue = useCallback(
    (clueId: ClueId) => {
      if (!discoveredClueIds.includes(clueId)) {
        setDiscoveredClueIds((prev) => [...prev, clueId]);
        setEvidence((prev) =>
          prev.map((c) => (c.id === clueId ? { ...c, discovered: true } : c))
        );
        const targetClue = evidence.find((c) => c.id === clueId);
        sound.playPaperRustle();
        addNotification(
          'New Clue Discovered!',
          targetClue ? targetClue.name : 'A new piece of evidence was recorded.',
          'clue'
        );
      }
    },
    [discoveredClueIds, evidence, addNotification]
  );

  const moveToLocation = useCallback((locId: LocationId) => {
    setCurrentLocationId(locId);
    sound.playPaperRustle();
    if (Math.random() > 0.6) {
      sound.playThunder();
    }
  }, []);

  const inspectClue = useCallback((clue: Clue | null) => {
    setInspectedClue(clue);
    if (clue) sound.playPaperRustle();
  }, []);

  const openPuzzle = useCallback(
    (puzzle: 'astronomical_box' | 'toxicology' | 'cipher' | null) => {
      setActivePuzzle(puzzle);
      if (puzzle) sound.playPinTap();
    },
    []
  );

  const solvePuzzle = useCallback(
    (puzzle: 'astronomical_box' | 'toxicology' | 'cipher') => {
      setSolvedPuzzles((prev) => ({ ...prev, [puzzle]: true }));
      sound.playPuzzleSolved();

      if (puzzle === 'astronomical_box') {
        discoverClue('secret_amended_will');
        addNotification(
          'Safe Unlocked!',
          'Discovered the secret amended Last Will & Testament disinheriting Eleanor and Silas!',
          'unlock'
        );
      } else if (puzzle === 'toxicology') {
        discoverClue('cyanide_reagent_result');
        addNotification(
          'Forensic Analysis Complete!',
          'Toxicology test confirms Potassium Cyanide masked with Rosewater Syrup!',
          'deduction'
        );
      } else if (puzzle === 'cipher') {
        discoverClue('torn_cipher');
        addNotification(
          'Cipher Decoded!',
          'Decoded dying message: "ALB... Not the shadow of night kills me, but the cup of a friend..."',
          'deduction'
        );
      }
    },
    [discoverClue, addNotification]
  );

  const openInterrogation = useCallback((suspect: Suspect | null) => {
    setInterrogatingSuspect(suspect);
    if (suspect) sound.playPaperRustle();
  }, []);

  const askQuestion = useCallback((suspectId: SuspectId, _topicId: string) => {
    sound.playTypewriterKey();
    setSuspects((prev) =>
      prev.map((s) => {
        if (s.id !== suspectId) return s;
        return { ...s };
      })
    );
  }, []);

  const presentEvidence = useCallback(
    (suspectId: SuspectId, topicId: string, clueId: ClueId): boolean => {
      const suspect = suspects.find((s) => s.id === suspectId);
      if (!suspect) return false;

      const topic = suspect.dialogueTopics.find((t) => t.id === topicId);
      if (!topic || !topic.isContradictionTrigger) {
        sound.playPinTap();
        return false;
      }

      if (topic.contradictionClueId === clueId) {
        // Successful contradiction break!
        sound.playContradictionBreak();
        const damage = topic.composureDamage || 30;
        const newComposure = Math.max(0, suspect.composure - damage);
        const isNowConfessed = newComposure <= 0;

        setSuspects((prev) =>
          prev.map((s) => {
            if (s.id !== suspectId) return s;
            return {
              ...s,
              composure: newComposure,
              brokenContradictions: [...s.brokenContradictions, topicId],
              isConfessed: isNowConfessed || s.isConfessed,
            };
          })
        );

        addNotification(
          'Contradiction Broken!',
          `${suspect.name}'s alibi has collapsed! Composure weakened.`,
          'contradiction'
        );
        return true;
      } else {
        sound.playPinTap();
        return false;
      }
    },
    [suspects, addNotification]
  );

  const openDossier = useCallback(
    (open: boolean, tab?: 'suspects' | 'evidence' | 'mindpalace' | 'timeline') => {
      setIsDossierOpen(open);
      if (tab) setDossierTab(tab);
      sound.playPaperRustle();
    },
    []
  );

  const openAccusation = useCallback((open: boolean) => {
    setIsAccusationOpen(open);
    sound.playPaperRustle();
    if (open) sound.playThunder();
  }, []);

  const addPinboardConnection = useCallback(
    (fromId: string, toId: string) => {
      const id = `${fromId}-${toId}`;
      if (!pinboardConnections.some((c) => c.id === id || c.id === `${toId}-${fromId}`)) {
        setPinboardConnections((prev) => [...prev, { id, fromNodeId: fromId, toNodeId: toId }]);
        sound.playPinTap();
      }
    },
    [pinboardConnections]
  );

  const removePinboardConnection = useCallback((connectionId: string) => {
    setPinboardConnections((prev) => prev.filter((c) => c.id !== connectionId));
    sound.playPaperRustle();
  }, []);

  const checkMindPalaceDeduction = useCallback(
    (clueA: ClueId, clueB: ClueId): boolean => {
      const matched = DEDUCTION_RECIPES.find(
        (r) =>
          (r.clueA === clueA && r.clueB === clueB) || (r.clueA === clueB && r.clueB === clueA)
      );

      if (matched && !deductionsMade.includes(matched.id)) {
        setDeductionsMade((prev) => [...prev, matched.id]);
        sound.playPuzzleSolved();
        if (matched.unlockedClueId) {
          discoverClue(matched.unlockedClueId);
        }
        addNotification(`Deduction: ${matched.title}`, matched.conclusion, 'deduction');
        return true;
      }
      return false;
    },
    [deductionsMade, discoverClue, addNotification]
  );

  const submitAccusation = useCallback(
    (
      culpritId: SuspectId,
      weaponClueId: ClueId,
      _entryMethodClueId: ClueId,
      motiveClueId: ClueId
    ) => {
      setIsAccusationOpen(false);
      sound.playThunder();

      if (culpritId === 'albright') {
        if (
          (weaponClueId === 'brandy_snifter' || weaponClueId === 'cyanide_reagent_result') &&
          (motiveClueId === 'secret_amended_will' || motiveClueId === 'half_burned_letter')
        ) {
          setEndingResult(ENDING_MASTER_TRUTH);
        } else {
          setEndingResult(ENDING_MASTER_TRUTH);
        }
      } else if (culpritId === 'silas') {
        setEndingResult(ENDING_WRONG_SILAS);
      } else if (culpritId === 'eleanor') {
        setEndingResult(ENDING_WRONG_ELEANOR);
      } else {
        setEndingResult(ENDING_BOTCHED);
      }
    },
    []
  );

  const closeIntro = useCallback(() => {
    setIsIntroOpen(false);
    sound.startAtmosphericRain();
    sound.playThunder();
  }, []);

  const openHint = useCallback((open: boolean) => {
    setIsHintOpen(open);
    if (open) sound.playPaperRustle();
  }, []);

  const toggleMute = useCallback(() => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCurrentLocationId('locked_study');
    setSuspects(INITIAL_SUSPECTS);
    setEvidence(INITIAL_EVIDENCE);
    setDiscoveredClueIds([
      'victim_body',
      'brandy_snifter',
      'shattered_watch',
      'brass_study_key',
      'torn_cipher',
    ]);
    setInspectedClue(null);
    setActivePuzzle(null);
    setInterrogatingSuspect(null);
    setIsDossierOpen(false);
    setIsAccusationOpen(false);
    setEndingResult(null);
    setIsIntroOpen(true);
    setPinboardConnections([]);
    setSolvedPuzzles({ astronomical_box: false, toxicology: false, cipher: false });
    setDeductionsMade([]);
  }, []);

  const currentLocation = locations.find((l) => l.id === currentLocationId) || locations[0];

  return (
    <GameContext.Provider
      value={{
        currentLocationId,
        currentLocation,
        locations,
        suspects,
        evidence,
        discoveredClueIds,
        inspectedClue,
        activePuzzle,
        interrogatingSuspect,
        isDossierOpen,
        dossierTab,
        isAccusationOpen,
        endingResult,
        isIntroOpen,
        isHintOpen,
        isMuted,
        notifications,
        pinboardConnections,
        solvedPuzzles,
        deductionsMade,
        moveToLocation,
        discoverClue,
        inspectClue,
        openPuzzle,
        solvePuzzle,
        openInterrogation,
        presentEvidence,
        askQuestion,
        openDossier,
        openAccusation,
        submitAccusation,
        addPinboardConnection,
        removePinboardConnection,
        checkMindPalaceDeduction,
        closeIntro,
        openHint,
        toggleMute,
        dismissNotification,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
