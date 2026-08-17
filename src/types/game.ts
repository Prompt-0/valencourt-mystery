export type LocationId =
  | 'locked_study'
  | 'grand_conservatory'
  | 'antiquities_library'
  | 'drawing_room'
  | 'wine_cellar'
  | 'bell_tower';

export type SuspectId =
  | 'eleanor'
  | 'albright'
  | 'moritz'
  | 'cecile'
  | 'silas';

export type ClueId =
  | 'victim_body'
  | 'brandy_snifter'
  | 'torn_cipher'
  | 'shattered_watch'
  | 'brass_study_key'
  | 'half_burned_letter'
  | 'astronomical_lockbox'
  | 'secret_amended_will'
  | 'physician_satchel'
  | 'cyanide_reagent_result'
  | 'soot_stained_robe'
  | 'whale_oil_winch'
  | 'blue_velvet_thread'
  | 'muddy_work_boots'
  | 'boathouse_lockpick'
  | 'belladonna_clippings'
  | 'dumbwaiter_secret_shaft'
  | 'arthurs_latin_journal';

export interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  clueId?: ClueId;
  puzzleId?: 'astronomical_box' | 'toxicology' | 'cipher';
  description: string;
  detailedText: string;
  iconType: 'search' | 'document' | 'lock' | 'skull' | 'flask' | 'key' | 'eye';
  requiresClueId?: ClueId;
  requiredMessage?: string;
  discoveredText?: string;
}

export interface GameLocation {
  id: LocationId;
  name: string;
  subtitle: string;
  image: string;
  ambienceDescription: string;
  hotspots: Hotspot[];
  unlockedAtStart: boolean;
  requiredClueToUnlock?: ClueId;
  unlockReason?: string;
}

export interface SuspectDialogueTopic {
  id: string;
  title: string;
  question: string;
  response: string;
  unlockedByDefault: boolean;
  requiresClueId?: ClueId;
  unlockedClueId?: ClueId;
  isContradictionTrigger?: boolean;
  contradictionClueId?: ClueId;
  contradictionSuccessResponse?: string;
  composureDamage?: number;
}

export interface Suspect {
  id: SuspectId;
  name: string;
  title: string;
  portrait: string;
  age: number;
  role: string;
  background: string;
  initialAlibi: string;
  motiveSummary: string;
  composure: number; // 0 to 100 (100 = guarded, 0 = broken confession)
  dialogueTopics: SuspectDialogueTopic[];
  brokenContradictions: string[];
  isConfessed: boolean;
}

export interface Clue {
  id: ClueId;
  name: string;
  category: 'Physical' | 'Document' | 'Forensic' | 'Testimony';
  summary: string;
  detailedInspection: string;
  locationFound: string;
  imageFallbackIcon: string;
  inspectableImage?: string;
  relatedSuspects: SuspectId[];
  isKeyEvidence: boolean;
  discovered: boolean;
  tags: string[];
}

export interface DeductionRecipe {
  id: string;
  clueA: ClueId;
  clueB: ClueId;
  title: string;
  conclusion: string;
  unlockedClueId?: ClueId;
  points: number;
}

export interface PinboardNode {
  id: string;
  type: 'clue' | 'suspect';
  targetId: string;
  x: number;
  y: number;
}

export interface PinboardConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  note?: string;
}

export interface TimelineEntry {
  id: string;
  time: string;
  title: string;
  eventDescription: string;
  involvedSuspects: SuspectId[];
  linkedClueId?: ClueId;
  isVerified: boolean;
}

export interface EndingResult {
  id: 'master_truth' | 'wrong_accused' | 'conspiracy_silence' | 'botched_case';
  title: string;
  rank: 'S+ Master Inquisitor' | 'A- Sharp Detective' | 'B- Flawed Deduction' | 'F- Tragic Miscarriage';
  narrativeText: string;
  fateOfSuspects: { name: string; outcome: string }[];
  accuracyScore: number;
}
