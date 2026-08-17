import React from 'react';
import { useGame } from '../../context/GameContext';
import { TypewriterText } from '../UI/TypewriterText';
import { Compass, Sparkles } from 'lucide-react';

export const IntroModal: React.FC = () => {
  const { isIntroOpen, closeIntro } = useGame();

  if (!isIntroOpen) return null;

  const prologueStory = `OCTOBER 17, 1928 — 02:45 AM.
A tempest of Biblical fury lashes the jagged cliffs of Blackwood Isle. The only causeway to the mainland has been swallowed by the rising ocean tide.

Inside Valencourt Manor, a scream echoes through the dark corridors.

Lord Arthur Valencourt—notorious collector of stolen antiquities and occult philologist—has been found dead inside his private study. 

The door was locked from within with a solid iron deadbolt. The heavy brass key rests upon his desk blotter. The arched stone windows are barred with intact iron grates.

Five souls are trapped in the manor with the corpse. One of them is a cold-blooded killer.

As Detective Julian Vance, you must search the manor, examine forensic clues, interrogate suspects, crack mechanical ciphers, and construct the deduction chain to uncover the impossible truth before dawn.`;

  return (
    <div className="modal-backdrop">
      <div
        className="ornate-box animate-fade-in"
        style={{
          width: '760px',
          maxWidth: '92vw',
          background: '#0d0f15',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '260px' }}>
          <img
            src="/images/valencourt_manor.jpg"
            alt="Valencourt Manor"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 20%, rgba(13, 15, 21, 0.95) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <Compass size={28} color="#d4af37" />
            <div>
              <h1 className="decorative-title" style={{ fontSize: '26px', color: '#f3e5ab' }}>
                THE VALENCOURT ENIGMA
              </h1>
              <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#a0a8b9', fontFamily: 'var(--font-sans)' }}>
                PROLOGUE: THE LOCKED STUDY MURDER
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '24px 30px' }}>
          <div
            style={{
              color: '#dcdfe8',
              fontSize: '17px',
              lineHeight: '1.65',
              fontFamily: 'var(--font-body-serif)',
              minHeight: '170px',
              whiteSpace: 'pre-line',
            }}
          >
            <TypewriterText text={prologueStory} speed={12} playAudio={true} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '24px',
              borderTop: '1px solid var(--border-gold)',
              paddingTop: '18px',
            }}
          >
            <div style={{ fontSize: '13px', color: '#8d95a8', fontStyle: 'italic' }}>
              Tip: Click on glowing scene markers to inspect clues & trigger forensic puzzles.
            </div>
            <button className="gothic-btn gothic-btn-gold" onClick={closeIntro}>
              <Sparkles size={16} />
              <span>Enter Valencourt Manor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
