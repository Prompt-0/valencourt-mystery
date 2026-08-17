import React from 'react';
import { useGame } from '../../context/GameContext';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Lightbulb,
  Sparkles,
  RotateCcw,
  Search,
  Scale,
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const {
    discoveredClueIds,
    openDossier,
    openAccusation,
    openHint,
    toggleMute,
    isMuted,
    resetGame,
    deductionsMade,
  } = useGame();

  const handleReset = () => {
    if (window.confirm('Are you sure you wish to restart the investigation from the beginning?')) {
      resetGame();
    }
  };

  return (
    <header className="top-navbar">
      <div className="brand-section">
        <Search className="brand-logo" />
        <div>
          <div className="brand-title">THE VALENCOURT ENIGMA</div>
          <div className="brand-subtitle">Shadows of the Locked Study • 1928</div>
        </div>
      </div>

      <div className="nav-actions">
        <button
          className="nav-btn"
          onClick={() => openDossier(true, 'suspects')}
          title="Open Detective Dossier"
        >
          <BookOpen size={16} />
          <span>Case Dossier</span>
          <span className="badge-count">{discoveredClueIds.length}</span>
        </button>

        <button
          className="nav-btn"
          onClick={() => openDossier(true, 'mindpalace')}
          title="Mind Palace Pinboard"
        >
          <Sparkles size={16} color="#ffd700" />
          <span>Mind Palace</span>
          {deductionsMade.length > 0 && (
            <span className="badge-count" style={{ background: '#d4af37', color: '#000' }}>
              {deductionsMade.length}
            </span>
          )}
        </button>

        <button
          className="gothic-btn gothic-btn-danger"
          style={{ padding: '6px 14px', fontSize: '12px' }}
          onClick={() => openAccusation(true)}
          title="Confront the suspects in the Drawing Room"
        >
          <Scale size={15} />
          <span>Confront Suspects</span>
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)', margin: '0 4px' }} />

        <button
          className="nav-btn"
          style={{ padding: '7px 10px' }}
          onClick={() => openHint(true)}
          title="Detective's Intuition / Hints"
        >
          <Lightbulb size={16} color="#d4af37" />
        </button>

        <button
          className="nav-btn"
          style={{ padding: '7px 10px' }}
          onClick={toggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX size={16} color="#ff6b6b" /> : <Volume2 size={16} color="#d4af37" />}
        </button>

        <button
          className="nav-btn"
          style={{ padding: '7px 10px' }}
          onClick={handleReset}
          title="Restart Case"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </header>
  );
};
