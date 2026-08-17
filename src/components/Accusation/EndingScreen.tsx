import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  AlertOctagon,
  Sparkles,
  Users,
} from 'lucide-react';

export const EndingScreen: React.FC = () => {
  const { endingResult, resetGame } = useGame();

  useEffect(() => {
    if (endingResult && endingResult.id === 'master_truth') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f3e5ab', '#ffffff', '#8b1e1e'],
      });
    }
  }, [endingResult]);

  if (!endingResult) return null;

  const isMasterTruth = endingResult.id === 'master_truth';

  return (
    <div className="modal-backdrop">
      <div
        className="ornate-box animate-fade-in"
        style={{
          width: '880px',
          maxWidth: '94vw',
          maxHeight: '92vh',
          background: '#0d0f15',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '20px 28px',
            background: isMasterTruth
              ? 'linear-gradient(180deg, #2b2310 0%, #121008 100%)'
              : 'linear-gradient(180deg, #261111 0%, #100606 100%)',
            borderBottom: `1px solid ${isMasterTruth ? 'var(--gold-primary)' : '#8b1e1e'}`,
            textAlign: 'center',
          }}
        >
          <div className="verdict-rank-badge">
            {isMasterTruth ? <Sparkles size={16} style={{ display: 'inline', marginRight: '6px' }} /> : <AlertOctagon size={16} style={{ display: 'inline', marginRight: '6px' }} />}
            {endingResult.rank}
          </div>

          <h1 className="decorative-title" style={{ fontSize: '26px', color: '#f3e5ab', margin: '4px 0' }}>
            {endingResult.title}
          </h1>
          <div style={{ fontSize: '13px', color: '#8891a4', fontFamily: 'var(--font-sans)' }}>
            Deductive Accuracy Rating: <strong style={{ color: '#ffd700' }}>{endingResult.accuracyScore}%</strong>
          </div>
        </div>

        <div style={{ padding: '24px 30px', overflowY: 'auto', flex: 1 }}>
          {/* Main Case Resolution Narrative */}
          <div
            style={{
              padding: '20px 24px',
              background: '#141722',
              border: '1px solid var(--border-gold)',
              borderRadius: '6px',
              color: '#dcdfe8',
              fontSize: '16px',
              lineHeight: '1.7',
              whiteSpace: 'pre-line',
              fontFamily: 'var(--font-body-serif)',
              marginBottom: '24px',
              boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.6)',
            }}
          >
            {endingResult.narrativeText}
          </div>

          {/* Suspect Fates Breakdown */}
          {endingResult.fateOfSuspects.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#ffd700' }}>
                <Users size={18} />
                <h3 style={{ fontSize: '16px', fontFamily: 'var(--font-serif)' }}>
                  Ultimate Fate of the Household:
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {endingResult.fateOfSuspects.map((fate, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      background: '#10121a',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  >
                    <strong style={{ color: '#f3e5ab' }}>{fate.name}: </strong>
                    <span style={{ color: '#bec5d6' }}>{fate.outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: '18px 28px',
            background: '#07080b',
            borderTop: '1px solid var(--border-gold)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '13px', color: '#7a8294', fontStyle: 'italic' }}>
            {isMasterTruth
              ? 'Congratulations! You have cracked the impossible locked-room mystery.'
              : 'You may restart the investigation to formulate new deductions and discover all clues.'}
          </div>

          <button className="gothic-btn gothic-btn-gold" onClick={resetGame}>
            <RotateCcw size={16} />
            <span>Replay Investigation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
