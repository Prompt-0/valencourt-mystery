import React from 'react';
import { GameProvider } from './context/GameContext';
import { TopNavbar } from './components/Layout/TopNavbar';
import { AtmosphericOverlay } from './components/Layout/AtmosphericOverlay';
import { SceneViewer } from './components/Exploration/SceneViewer';
import { RoomNavigator } from './components/Exploration/RoomNavigator';
import { InspectModal } from './components/Exploration/InspectModal';
import { DossierModal } from './components/Dossier/DossierModal';
import { InterrogationModal } from './components/Interrogation/InterrogationModal';
import { AstronomicalBoxPuzzle } from './components/Puzzles/AstronomicalBoxPuzzle';
import { ToxicologyPuzzle } from './components/Puzzles/ToxicologyPuzzle';
import { CipherPuzzle } from './components/Puzzles/CipherPuzzle';
import { AccusationModal } from './components/Accusation/AccusationModal';
import { EndingScreen } from './components/Accusation/EndingScreen';
import { IntroModal } from './components/Prologue/IntroModal';
import { HintModal } from './components/UI/HintModal';
import { ClueNotification } from './components/UI/ClueNotification';

import './styles/main.css';
import './styles/components.css';
import './styles/puzzles.css';
import './styles/animations.css';

export const App: React.FC = () => {
  return (
    <GameProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#0b0c10',
          position: 'relative',
        }}
      >
        <AtmosphericOverlay />
        <TopNavbar />

        <main style={{ flex: 1, position: 'relative' }}>
          <SceneViewer />
        </main>

        <RoomNavigator />

        {/* Modals and Overlays */}
        <IntroModal />
        <InspectModal />
        <DossierModal />
        <InterrogationModal />
        <AstronomicalBoxPuzzle />
        <ToxicologyPuzzle />
        <CipherPuzzle />
        <AccusationModal />
        <EndingScreen />
        <HintModal />
        <ClueNotification />
      </div>
    </GameProvider>
  );
};

export default App;
