import React from 'react';
import { useGame } from '../../context/GameContext';
import {
  X,
  MapPin,
  Tag,
  Sparkles,
  Users,
  Search,
} from 'lucide-react';

export const InspectModal: React.FC = () => {
  const { inspectedClue, inspectClue, openDossier, suspects } = useGame();

  if (!inspectedClue) return null;

  return (
    <div className="modal-backdrop" onClick={() => inspectClue(null)}>
      <div
        className="ornate-box animate-fade-in"
        style={{
          width: '780px',
          maxWidth: '92vw',
          maxHeight: '88vh',
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
            <Search size={20} color="#d4af37" />
            <div>
              <h2 style={{ fontSize: '18px', color: '#f3e5ab', margin: 0 }}>
                {inspectedClue.name}
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  color: 'var(--gold-dark)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Category: {inspectedClue.category} Evidence
              </span>
            </div>
          </div>
          <button
            onClick={() => inspectClue(null)}
            style={{ background: 'transparent', color: '#aaa', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Main Inspection Layout */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
            {inspectedClue.inspectableImage && (
              <div
                style={{
                  width: '260px',
                  height: '200px',
                  flexShrink: 0,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-gold)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <img
                  src={inspectedClue.inspectableImage}
                  alt={inspectedClue.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ba1b0', fontSize: '13px', marginBottom: '10px' }}>
                <MapPin size={15} color="#d4af37" />
                <span>Found at: <strong style={{ color: '#fff' }}>{inspectedClue.locationFound}</strong></span>
              </div>

              <div
                style={{
                  fontSize: '15px',
                  lineHeight: '1.5',
                  color: '#cfd4e2',
                  marginBottom: '16px',
                  fontStyle: 'italic',
                }}
              >
                "{inspectedClue.summary}"
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {inspectedClue.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: '#1d212c',
                      color: '#d4af37',
                      border: '1px solid var(--border-gold)',
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <Tag size={11} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Forensic Notes */}
          <div
            style={{
              padding: '18px 22px',
              background: '#0a0b10',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              color: '#e2e6f0',
              fontSize: '15px',
              lineHeight: '1.6',
              whiteSpace: 'pre-line',
              fontFamily: 'var(--font-body-serif)',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ color: '#d4af37', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              Forensic Log & Transcripts
            </div>
            {inspectedClue.detailedInspection}
          </div>

          {/* Related Suspects */}
          {inspectedClue.relatedSuspects.length > 0 && (
            <div style={{ marginTop: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9ba1b0', marginBottom: '8px' }}>
                <Users size={14} color="#d4af37" />
                <span>Suspects Linked to this Clue:</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {inspectedClue.relatedSuspects.map((sId) => {
                  const s = suspects.find((item) => item.id === sId);
                  if (!s) return null;
                  return (
                    <div
                      key={s.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        background: '#1b1e2a',
                        border: '1px solid var(--border-gold)',
                        borderRadius: '4px',
                        fontSize: '13px',
                        color: '#f3e5ab',
                      }}
                    >
                      <img
                        src={s.portrait}
                        alt={s.name}
                        style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span>{s.name}</span>
                    </div>
                  );
                })}
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
          <button
            className="gothic-btn"
            onClick={() => {
              inspectClue(null);
              openDossier(true, 'mindpalace');
            }}
          >
            <Sparkles size={16} color="#ffd700" />
            <span>Connect in Mind Palace</span>
          </button>

          <button className="gothic-btn gothic-btn-gold" onClick={() => inspectClue(null)}>
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
