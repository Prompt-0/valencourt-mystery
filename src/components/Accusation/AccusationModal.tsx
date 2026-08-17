import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import type { SuspectId, ClueId } from '../../types/game';
import {
  Scale,
  X,
  AlertTriangle,
  Users,
  FlaskConical,
  Key,
  Flame,
} from 'lucide-react';

export const AccusationModal: React.FC = () => {
  const {
    isAccusationOpen,
    openAccusation,
    suspects,
    evidence,
    discoveredClueIds,
    submitAccusation,
  } = useGame();

  const [selectedCulprit, setSelectedCulprit] = useState<SuspectId | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<ClueId | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<ClueId | null>(null);
  const [selectedMotive, setSelectedMotive] = useState<ClueId | null>(null);

  if (!isAccusationOpen) return null;

  const discoveredClues = evidence.filter((c) => discoveredClueIds.includes(c.id));

  const isFormComplete =
    selectedCulprit !== null &&
    selectedWeapon !== null &&
    selectedEntry !== null &&
    selectedMotive !== null;

  const handleSubmit = () => {
    if (!isFormComplete) return;
    submitAccusation(
      selectedCulprit,
      selectedWeapon,
      selectedEntry,
      selectedMotive
    );
  };

  return (
    <div className="modal-backdrop" onClick={() => openAccusation(false)}>
      <div
        className="ornate-box animate-fade-in"
        style={{
          width: '940px',
          maxWidth: '96vw',
          maxHeight: '92vh',
          background: '#0e1017',
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
            background: 'linear-gradient(180deg, #2b1111 0%, #120909 100%)',
            borderBottom: '1px solid #8b1e1e',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Scale size={22} color="#ffd700" />
            <div>
              <h2 style={{ fontSize: '18px', color: '#ffb3b3', margin: 0 }}>
                The Grand Drawing Room Confrontation
              </h2>
              <span style={{ fontSize: '11px', color: '#ff8080', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-sans)' }}>
                Present Your Formal Accusation Before the Household
              </span>
            </div>
          </div>
          <button
            onClick={() => openAccusation(false)}
            style={{ background: 'transparent', color: '#aaa', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          <div
            style={{
              padding: '12px 18px',
              background: '#1a1010',
              border: '1px solid #8b1e1e',
              borderRadius: '4px',
              color: '#f5d5d5',
              fontSize: '14px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <AlertTriangle size={20} color="#ff6b6b" />
            <span>
              All five suspects are assembled by the fireplace in the Drawing Room. To secure a conviction, you must present the Culprit, the Lethal Method, the Locked-Room Mechanism, and the True Motive.
            </span>
          </div>

          {/* Accusation Matrix */}
          <div className="accusation-grid">
            {/* 1. The Primary Culprit */}
            <div style={{ background: '#141722', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#ffd700' }}>
                <Users size={16} />
                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-serif)' }}>1. The Murderer</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {suspects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedCulprit(s.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      background: selectedCulprit === s.id ? '#3d1c1c' : '#0d0f15',
                      border: `1px solid ${selectedCulprit === s.id ? '#ff4d4d' : '#222'}`,
                      borderRadius: '4px',
                      color: selectedCulprit === s.id ? '#fff' : '#cfd4e2',
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={s.portrait}
                      alt={s.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: '11px', color: '#888' }}>{s.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. The Murder Weapon / Poison */}
            <div style={{ background: '#141722', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#ffd700' }}>
                <FlaskConical size={16} />
                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-serif)' }}>2. Method of Murder</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
                {discoveredClues.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedWeapon(c.id)}
                    style={{
                      padding: '8px 12px',
                      background: selectedWeapon === c.id ? '#3d2f15' : '#0d0f15',
                      border: `1px solid ${selectedWeapon === c.id ? '#ffd700' : '#222'}`,
                      borderRadius: '4px',
                      color: selectedWeapon === c.id ? '#ffd700' : '#cfd4e2',
                      textAlign: 'left',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Locked-Room Mechanism */}
            <div style={{ background: '#141722', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#ffd700' }}>
                <Key size={16} />
                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-serif)' }}>3. Locked-Room Solution / Ingress</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
                {discoveredClues.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedEntry(c.id)}
                    style={{
                      padding: '8px 12px',
                      background: selectedEntry === c.id ? '#1e382b' : '#0d0f15',
                      border: `1px solid ${selectedEntry === c.id ? '#50c878' : '#222'}`,
                      borderRadius: '4px',
                      color: selectedEntry === c.id ? '#8cf5b8' : '#cfd4e2',
                      textAlign: 'left',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Underlying Motive */}
            <div style={{ background: '#141722', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#ffd700' }}>
                <Flame size={16} />
                <strong style={{ fontSize: '14px', fontFamily: 'var(--font-serif)' }}>4. The True Motive Clue</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '220px', overflowY: 'auto' }}>
                {discoveredClues.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedMotive(c.id)}
                    style={{
                      padding: '8px 12px',
                      background: selectedMotive === c.id ? '#3b1f3b' : '#0d0f15',
                      border: `1px solid ${selectedMotive === c.id ? '#d478d4' : '#222'}`,
                      borderRadius: '4px',
                      color: selectedMotive === c.id ? '#f5c6f5' : '#cfd4e2',
                      textAlign: 'left',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px 24px',
            background: '#08090d',
            borderTop: '1px solid var(--border-gold)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button className="gothic-btn" onClick={() => openAccusation(false)}>
            Continue Investigating
          </button>

          <button
            className="gothic-btn gothic-btn-danger"
            disabled={!isFormComplete}
            onClick={handleSubmit}
            style={{ opacity: isFormComplete ? 1 : 0.5, padding: '10px 24px' }}
          >
            <Scale size={18} />
            <span>Deliver Final Verdict</span>
          </button>
        </div>
      </div>
    </div>
  );
};
