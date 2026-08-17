import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CIPHER_DYING_MESSAGE } from '../../data/puzzles';
import { FileText, Sparkles, X, CheckCircle2 } from 'lucide-react';

export const CipherPuzzle: React.FC = () => {
  const { activePuzzle, openPuzzle, solvePuzzle, solvedPuzzles } = useGame();
  const [isDeciphered, setIsDeciphered] = useState(false);

  if (activePuzzle !== 'cipher') return null;

  const isSolved = solvedPuzzles.cipher || isDeciphered;

  const handleTranslate = () => {
    setIsDeciphered(true);
    solvePuzzle('cipher');
  };

  return (
    <div className="modal-backdrop" onClick={() => openPuzzle(null)}>
      <div
        className="ornate-box animate-fade-in"
        style={{
          width: '760px',
          maxWidth: '92vw',
          maxHeight: '90vh',
          background: '#12141c',
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
            <FileText size={20} color="#d4af37" />
            <div>
              <h2 style={{ fontSize: '18px', color: '#f3e5ab', margin: 0 }}>
                Codex Noctis — Dying Message Vellum
              </h2>
              <span style={{ fontSize: '11px', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>
                14th-Century Latin Occult Manuscript
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
          <div className="cipher-parchment">
            <div className="cipher-latin-heading">CODEX NOCTIS • FOLIO IX</div>

            <div style={{ fontSize: '15px', color: '#4a3828', lineHeight: '1.6', marginBottom: '16px' }}>
              "Occultum secretum sub stellis custoditur. Qui veritatem quaerit, in tenebris lumen inveniet..."
            </div>

            <div style={{ color: '#8b1e1e', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Trembling Scrawl in Red Ink at the Bottom Margin:
            </div>

            <div className="cipher-scrawl">
              "{CIPHER_DYING_MESSAGE}"
            </div>

            {isSolved ? (
              <div
                style={{
                  marginTop: '18px',
                  padding: '14px 18px',
                  background: '#221912',
                  border: '1px solid #8b6b3e',
                  borderRadius: '4px',
                  color: '#f7edd7',
                }}
              >
                <div style={{ color: '#d4af37', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Deciphered English Translation:
                </div>
                <div style={{ fontSize: '16px', fontStyle: 'italic', color: '#ffd700' }}>
                  "A... L... B... [Dr. Albright...] Not the shadow of night kills me, but the cup of a friend..."
                </div>
                <div style={{ fontSize: '13px', color: '#d4af37', marginTop: '6px' }}>
                  Lord Arthur identified his poisoner with his dying breath: the initials "ALB" refer to Dr. Julian Albright, and "calix amicus" confirms the spiked cognac cup!
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: '#6d5436', fontStyle: 'italic', marginTop: '10px' }}>
                Lord Arthur wrote this with his last ounces of strength. Use your linguistic deduction to translate his dying accusation.
              </div>
            )}
          </div>
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
            Close Manuscript
          </button>

          {!isSolved ? (
            <button className="gothic-btn gothic-btn-gold" onClick={handleTranslate}>
              <Sparkles size={16} />
              <span>Translate Latin Accusation</span>
            </button>
          ) : (
            <div style={{ color: '#50c878', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}>
              <CheckCircle2 size={16} /> Dying Message Translated
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
