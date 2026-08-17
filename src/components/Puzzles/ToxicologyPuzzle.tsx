import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CHEMICAL_REAGENTS } from '../../data/puzzles';
import type { ChemicalReagent } from '../../data/puzzles';
import { sound } from '../../audio/soundEngine';
import { FlaskConical, Droplets, X, CheckCircle2, AlertCircle } from 'lucide-react';

export const ToxicologyPuzzle: React.FC = () => {
  const { activePuzzle, openPuzzle, solvePuzzle, solvedPuzzles } = useGame();

  const [activeReagent, setActiveReagent] = useState<ChemicalReagent | null>(null);
  const [tubeReaction, setTubeReaction] = useState<{
    color: string;
    precipitate: string;
    compoundFound: string;
    notes: string;
  } | null>(null);

  if (activePuzzle !== 'toxicology') return null;

  const isSolved = solvedPuzzles.toxicology;

  const handleApplyReagent = (reagent: ChemicalReagent) => {
    setActiveReagent(reagent);
    sound.playPinTap();

    if (reagent.id === 'ferric_chloride') {
      // Positive Prussian Blue Reaction!
      setTubeReaction({
        color: '#003153', // Prussian Blue
        precipitate: 'Heavy Prussian Blue precipitate formation',
        compoundFound: 'Lethal Potassium Cyanide (Kalium Cyanatum)',
        notes: 'Intense reaction! Detects high concentrations of pure potassium cyanide dissolved into the cognac.',
      });
      solvePuzzle('toxicology');
    } else if (reagent.id === 'silver_nitrate') {
      setTubeReaction({
        color: '#d0d8e8',
        precipitate: 'Faint milky white turbidity',
        compoundFound: 'Minor inorganic mineral chlorides',
        notes: 'Inconclusive. Standard trace minerals from glassware water.',
      });
    } else if (reagent.id === 'iodine_indicator') {
      setTubeReaction({
        color: '#8b4513',
        precipitate: 'No crystalline alkaloid precipitate',
        compoundFound: 'Negative for Belladonna / Atropine',
        notes: 'Negative. Proves Arthur was NOT poisoned with the belladonna found in the conservatory!',
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => openPuzzle(null)}>
      <div
        className="ornate-box animate-fade-in"
        style={{
          width: '840px',
          maxWidth: '94vw',
          maxHeight: '90vh',
          background: '#10131b',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '16px 24px',
            background: 'linear-gradient(180deg, #1d212c 0%, #12151e 100%)',
            borderBottom: '1px solid var(--border-gold)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FlaskConical size={20} color="#d4af37" />
            <div>
              <h2 style={{ fontSize: '18px', color: '#f3e5ab', margin: 0 }}>
                Forensic Chemistry & Toxicology Laboratory
              </h2>
              <span style={{ fontSize: '11px', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>
                Analysis of Victim's Cognac Snifter Residue
              </span>
            </div>
          </div>
          <button
            onClick={() => openPuzzle(null)}
            style={{ background: 'transparent', color: '#aaa', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          <div className="toxicology-lab">
            {/* Left Chemical Bench & Test Tube */}
            <div className="lab-bench">
              <div style={{ fontSize: '14px', color: '#ffd700', fontFamily: 'var(--font-serif)' }}>
                Cognac Sample from Lord Arthur’s Desk
              </div>

              {/* Test Tube Visualization */}
              <div className="test-tube">
                <div
                  className="tube-liquid"
                  style={{
                    background: tubeReaction ? tubeReaction.color : 'linear-gradient(180deg, #a0522d 0%, #5c2c16 100%)',
                    boxShadow: tubeReaction?.color === '#003153' ? '0 0 20px rgba(0, 49, 83, 0.9)' : undefined,
                  }}
                />
              </div>

              {/* Olfactory / Scent Analyzer */}
              <div
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: '#0a0c10',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#cfd4e2',
                }}
              >
                <div style={{ color: '#d4af37', fontWeight: 600, marginBottom: '2px' }}>
                  Olfactory & Distillation Notes:
                </div>
                The sample carries a distinct scent of <strong style={{ color: '#ffb347' }}>Bitter Almonds</strong> masked by concentrated <strong style={{ color: '#ff69b4' }}>Rosewater Syrup</strong>.
              </div>
            </div>

            {/* Right Reagents Selection Panel */}
            <div className="reagents-panel">
              <div style={{ fontSize: '14px', color: '#f3e5ab', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
                Select Reagent Dropper:
              </div>

              {CHEMICAL_REAGENTS.map((reagent) => (
                <div
                  key={reagent.id}
                  className="reagent-bottle"
                  onClick={() => handleApplyReagent(reagent)}
                  style={{
                    borderLeft: `4px solid ${reagent.color}`,
                    background: activeReagent?.id === reagent.id ? '#252b3b' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', color: '#f3e5ab' }}>{reagent.name}</strong>
                    <Droplets size={14} color={reagent.color} />
                  </div>
                  <div style={{ fontSize: '11px', color: '#8891a4', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>
                    Formula: {reagent.formula}
                  </div>
                  <div style={{ fontSize: '12px', color: '#bac1d2', marginTop: '6px', fontStyle: 'italic' }}>
                    {reagent.notes}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reaction Results Box */}
          {tubeReaction && (
            <div
              style={{
                marginTop: '20px',
                padding: '16px 20px',
                background: tubeReaction.color === '#003153' ? '#112218' : '#1b1d28',
                border: `1px solid ${tubeReaction.color === '#003153' ? '#50c878' : 'var(--border-gold)'}`,
                borderRadius: '4px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                {tubeReaction.color === '#003153' ? (
                  <CheckCircle2 size={20} color="#50c878" />
                ) : (
                  <AlertCircle size={20} color="#ffd700" />
                )}
                <h4 style={{ fontSize: '16px', color: tubeReaction.color === '#003153' ? '#74f2aa' : '#f3e5ab' }}>
                  {tubeReaction.compoundFound}
                </h4>
              </div>

              <div style={{ fontSize: '14px', color: '#e0e5f2', lineHeight: '1.4' }}>
                {tubeReaction.notes}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: '16px 24px',
            background: '#0e1017',
            borderTop: '1px solid var(--border-gold)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button className="gothic-btn" onClick={() => openPuzzle(null)}>
            Return to Study
          </button>

          {isSolved && (
            <div style={{ color: '#50c878', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}>
              <CheckCircle2 size={16} /> Toxicology Analysis Recorded in Dossier
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
