import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import type { Clue } from '../../types/game';
import {
  FileText,
  Search,
  Key,
  FlaskConical,
} from 'lucide-react';

export const EvidenceTab: React.FC = () => {
  const { evidence, discoveredClueIds, inspectClue, openDossier } = useGame();
  const [filter, setFilter] = useState<'All' | 'Physical' | 'Document' | 'Forensic' | 'Key'>('All');

  const discoveredList = evidence.filter((c) => discoveredClueIds.includes(c.id));
  const filteredList = discoveredList.filter((c) => {
    if (filter === 'All') return true;
    if (filter === 'Key') return c.isKeyEvidence;
    return c.category === filter;
  });

  const handleInspect = (clue: Clue) => {
    openDossier(false);
    inspectClue(clue);
  };

  const getCategoryIcon = (category: Clue['category']) => {
    switch (category) {
      case 'Document':
        return <FileText size={15} color="#d4af37" />;
      case 'Forensic':
        return <FlaskConical size={15} color="#50c878" />;
      case 'Physical':
        return <Key size={15} color="#4da6ff" />;
      default:
        return <Search size={15} color="#e2c068" />;
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '18px', color: '#f3e5ab' }}>
            Evidence Locker ({discoveredList.length}/{evidence.length} Discovered)
          </h3>
          <p style={{ fontSize: '13px', color: '#8f96a6', fontFamily: 'var(--font-sans)' }}>
            Filter and inspect forensic exhibits, documents, and physical artifacts collected from the crime scene.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['All', 'Key', 'Physical', 'Document', 'Forensic'] as const).map((cat) => (
            <button
              key={cat}
              className={`gothic-btn ${filter === cat ? 'gothic-btn-gold' : ''}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => setFilter(cat)}
            >
              {cat === 'Key' ? '★ Key Evidence' : cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredList.map((clue) => (
          <div
            key={clue.id}
            style={{
              background: '#161923',
              border: '1px solid var(--border-gold)',
              borderRadius: '6px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-card)',
              transition: 'transform 0.2s ease',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '11px',
                    color: '#8d95a8',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {getCategoryIcon(clue.category)}
                  {clue.category}
                </span>
                {clue.isKeyEvidence && (
                  <span
                    style={{
                      background: 'rgba(212, 175, 55, 0.2)',
                      color: '#ffd700',
                      border: '1px solid #d4af37',
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '3px',
                      fontWeight: 700,
                    }}
                  >
                    ★ KEY
                  </span>
                )}
              </div>

              <h4 style={{ fontSize: '16px', color: '#f3e5ab', marginBottom: '6px' }}>
                {clue.name}
              </h4>
              <p
                style={{
                  fontSize: '13px',
                  lineHeight: '1.4',
                  color: '#bec5d6',
                  fontFamily: 'var(--font-body-serif)',
                  marginBottom: '12px',
                }}
              >
                {clue.summary}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                {clue.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    style={{
                      background: '#0d0f15',
                      color: '#9aa0b0',
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '2px',
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <button
              className="gothic-btn"
              style={{ width: '100%', padding: '7px 12px', fontSize: '12px' }}
              onClick={() => handleInspect(clue)}
            >
              <Search size={14} />
              <span>Inspect Exhibit</span>
            </button>
          </div>
        ))}
      </div>

      {discoveredList.length < evidence.length && (
        <div
          style={{
            marginTop: '24px',
            padding: '12px 18px',
            background: '#12141c',
            border: '1px dashed var(--border-gold)',
            borderRadius: '4px',
            textAlign: 'center',
            color: '#8d95a8',
            fontSize: '13px',
          }}
        >
          {evidence.length - discoveredList.length} additional exhibits remain undiscovered across Valencourt Manor's chambers.
        </div>
      )}
    </div>
  );
};
