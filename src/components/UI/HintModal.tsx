import React from 'react';
import { useGame } from '../../context/GameContext';
import { Lightbulb, X, Compass, CheckCircle2 } from 'lucide-react';

export const HintModal: React.FC = () => {
  const { isHintOpen, openHint, discoveredClueIds, solvedPuzzles, deductionsMade } = useGame();

  if (!isHintOpen) return null;

  const getNextGoal = () => {
    if (!discoveredClueIds.includes('brandy_snifter') || !discoveredClueIds.includes('shattered_watch')) {
      return 'Thoroughly examine all hotspots in the Locked Study, especially the overturned brandy snifter and the grandfather clock.';
    }
    if (!solvedPuzzles.toxicology) {
      return 'Perform the chemical toxicology test on the spilled brandy in the Study to discover the exact lethal substance and masking scent.';
    }
    if (!discoveredClueIds.includes('arthurs_latin_journal')) {
      return 'Search the Antiquities Library to find Lord Arthur’s Latin Astrological Diary containing the safe combination.';
    }
    if (!solvedPuzzles.astronomical_box) {
      return 'Align the 4 brass astronomical dials on the Library safe (Blood Moon, Sagittarius, Winter Solstice, Saturn) to reveal the secret amended will.';
    }
    if (!discoveredClueIds.includes('half_burned_letter')) {
      return 'Inspect the roaring hearth in the Drawing Room and Dr. Albright’s medical satchel.';
    }
    if (!discoveredClueIds.includes('whale_oil_winch')) {
      return 'Descend into the Wine Cellar & Catacombs to inspect the mechanical dumbwaiter hoist and muddy boots.';
    }
    if (deductionsMade.length < 3) {
      return 'Open your Dossier > Mind Palace (Pinboard) and connect clues together to formulate key deductions!';
    }
    return 'Interrogate the suspects and present contradictory evidence to break their alibis, then call the Final Accusation in the Drawing Room!';
  };

  return (
    <div className="modal-backdrop" onClick={() => openHint(false)}>
      <div
        className="ornate-box"
        style={{
          width: '560px',
          maxWidth: '92vw',
          background: '#151822',
          padding: '28px',
          borderRadius: '8px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lightbulb size={24} color="#d4af37" />
            <h2 style={{ fontSize: '20px', color: '#f3e5ab' }}>Detective’s Intuition</h2>
          </div>
          <button
            onClick={() => openHint(false)}
            style={{ background: 'transparent', color: '#aaa', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#ffd700' }}>
            <Compass size={18} />
            <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '15px' }}>Current Recommended Investigation:</strong>
          </div>
          <div
            style={{
              padding: '14px 18px',
              background: '#1c202d',
              border: '1px solid var(--border-gold)',
              borderRadius: '4px',
              color: '#f0f3fa',
              fontSize: '16px',
              lineHeight: '1.5',
            }}
          >
            {getNextGoal()}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '10px', color: '#9ba1b0' }}>Investigation Milestones:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: solvedPuzzles.toxicology ? '#50c878' : '#777' }}>
              <CheckCircle2 size={16} /> Chemical Toxicology Analysis of Victim's Glass
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: solvedPuzzles.astronomical_box ? '#50c878' : '#777' }}>
              <CheckCircle2 size={16} /> Unlocked the 4-Dial Astronomical Safe in Library
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: discoveredClueIds.includes('whale_oil_winch') ? '#50c878' : '#777' }}>
              <CheckCircle2 size={16} /> Discovered Subterranean Dumbwaiter Mechanism
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: deductionsMade.length >= 3 ? '#50c878' : '#777' }}>
              <CheckCircle2 size={16} /> Mind Palace Deductions Formulated ({deductionsMade.length}/6)
            </div>
          </div>
        </div>

        <div style={{ marginTop: '22px', textAlign: 'right' }}>
          <button className="gothic-btn" onClick={() => openHint(false)}>
            Return to Case
          </button>
        </div>
      </div>
    </div>
  );
};
