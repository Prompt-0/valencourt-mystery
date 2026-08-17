import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import {
  ASTRONOMICAL_DIALS,
  ASTRONOMICAL_SOLUTION,
} from '../../data/puzzles';
import type { AstronomicalPuzzleState } from '../../data/puzzles';
import { sound } from '../../audio/soundEngine';
import { Lock, Unlock, X, Sparkles } from 'lucide-react';

export const AstronomicalBoxPuzzle: React.FC = () => {
  const { activePuzzle, openPuzzle, solvePuzzle, solvedPuzzles } = useGame();

  const [state, setState] = useState<AstronomicalPuzzleState>({
    lunarPhase: 'new_moon',
    zodiacSign: 'aries',
    solsticeSeason: 'vernal_equinox',
    planetarySigil: 'mars',
  });

  const [message, setMessage] = useState<string | null>(null);

  if (activePuzzle !== 'astronomical_box') return null;

  const isSolved = solvedPuzzles.astronomical_box;

  const handleDialChange = (
    dial: keyof AstronomicalPuzzleState,
    value: string
  ) => {
    sound.playPinTap();
    setState((prev) => ({ ...prev, [dial]: value }));
    setMessage(null);
  };

  const handleAttemptUnlock = () => {
    if (
      state.lunarPhase === ASTRONOMICAL_SOLUTION.lunarPhase &&
      state.zodiacSign === ASTRONOMICAL_SOLUTION.zodiacSign &&
      state.solsticeSeason === ASTRONOMICAL_SOLUTION.solsticeSeason &&
      state.planetarySigil === ASTRONOMICAL_SOLUTION.planetarySigil
    ) {
      solvePuzzle('astronomical_box');
      setMessage('The internal mechanical pins drop into place! The secret compartment slides open!');
    } else {
      sound.playPinTap();
      setMessage('The brass dials grind with resistance. The celestial alignment is incorrect.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => openPuzzle(null)}>
      <div
        className="ornate-box animate-fade-in"
        style={{
          width: '740px',
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
            <Lock size={20} color="#d4af37" />
            <div>
              <h2 style={{ fontSize: '18px', color: '#f3e5ab', margin: 0 }}>
                Astronomical Brass Safe Mechanism
              </h2>
              <span style={{ fontSize: '11px', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>
                4-Concentric Celestial Dial Lock
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

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Latin Hint Banner */}
          <div
            style={{
              width: '100%',
              padding: '12px 18px',
              background: '#0a0c12',
              border: '1px solid var(--border-gold)',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#d4af37',
              fontStyle: 'italic',
              textAlign: 'center',
              fontFamily: 'var(--font-body-serif)',
            }}
          >
            "When the Blood Moon aligns with the Archer, at Winter Solstice under Saturn's gaze, the truth shall be revealed."
            <div style={{ fontSize: '11px', color: '#7e879a', marginTop: '2px', fontStyle: 'normal', fontFamily: 'var(--font-sans)' }}>
              — Extracted from Lord Arthur's Astrological Journal in the Library
            </div>
          </div>

          {/* Visual Dial Rings Display */}
          <div
            style={{
              width: '280px',
              height: '280px',
              background: 'radial-gradient(circle, #3d2f16 0%, #151109 100%)',
              border: '8px solid #8c6e3b',
              borderRadius: '50%',
              boxShadow: '0 0 25px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 0, 0, 0.8)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            {/* Center Lock Status */}
            <div style={{ textAlign: 'center', zIndex: 10 }}>
              {isSolved ? (
                <Unlock size={42} color="#50c878" style={{ filter: 'drop-shadow(0 0 10px #50c878)' }} />
              ) : (
                <Lock size={42} color="#d4af37" style={{ filter: 'drop-shadow(0 0 10px #d4af37)' }} />
              )}
            </div>
          </div>

          {/* Dial Selection Controls */}
          <div className="dial-control-group">
            {/* Lunar Phase */}
            <div className="dial-selector-card">
              <span className="dial-selector-title">1. Lunar Phase</span>
              <select
                value={state.lunarPhase}
                onChange={(e) => handleDialChange('lunarPhase', e.target.value)}
                style={{ background: '#0e1017', color: '#f3e5ab', border: '1px solid var(--border-gold)', padding: '6px', borderRadius: '3px' }}
                disabled={isSolved}
              >
                {ASTRONOMICAL_DIALS.lunarPhase.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.symbol} {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Zodiac Sign */}
            <div className="dial-selector-card">
              <span className="dial-selector-title">2. Zodiac Sign</span>
              <select
                value={state.zodiacSign}
                onChange={(e) => handleDialChange('zodiacSign', e.target.value)}
                style={{ background: '#0e1017', color: '#f3e5ab', border: '1px solid var(--border-gold)', padding: '6px', borderRadius: '3px' }}
                disabled={isSolved}
              >
                {ASTRONOMICAL_DIALS.zodiacSign.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.symbol} {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Solstice Season */}
            <div className="dial-selector-card">
              <span className="dial-selector-title">3. Solstice Season</span>
              <select
                value={state.solsticeSeason}
                onChange={(e) => handleDialChange('solsticeSeason', e.target.value)}
                style={{ background: '#0e1017', color: '#f3e5ab', border: '1px solid var(--border-gold)', padding: '6px', borderRadius: '3px' }}
                disabled={isSolved}
              >
                {ASTRONOMICAL_DIALS.solsticeSeason.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.symbol} {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Planetary Sigil */}
            <div className="dial-selector-card">
              <span className="dial-selector-title">4. Planetary Sigil</span>
              <select
                value={state.planetarySigil}
                onChange={(e) => handleDialChange('planetarySigil', e.target.value)}
                style={{ background: '#0e1017', color: '#f3e5ab', border: '1px solid var(--border-gold)', padding: '6px', borderRadius: '3px' }}
                disabled={isSolved}
              >
                {ASTRONOMICAL_DIALS.planetarySigil.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.symbol} {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {message && (
            <div
              style={{
                marginTop: '18px',
                padding: '10px 16px',
                borderRadius: '4px',
                background: isSolved ? '#162b1e' : '#2d1818',
                border: `1px solid ${isSolved ? '#50c878' : '#ff4d4d'}`,
                color: '#fff',
                fontSize: '14px',
                textAlign: 'center',
              }}
            >
              {message}
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
            Leave Safe
          </button>

          {!isSolved ? (
            <button className="gothic-btn gothic-btn-gold" onClick={handleAttemptUnlock}>
              <Sparkles size={16} />
              <span>Engage Central Gear</span>
            </button>
          ) : (
            <div style={{ color: '#50c878', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600 }}>
              <Unlock size={16} /> Safe Unlocked — Amended Will Acquired
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
