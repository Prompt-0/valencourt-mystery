import React from 'react';
import { useGame } from '../../context/GameContext';
import type { Suspect } from '../../types/game';
import { MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const SuspectsTab: React.FC = () => {
  const { suspects, openInterrogation, openDossier } = useGame();

  const handleInterrogate = (suspect: Suspect) => {
    openDossier(false);
    openInterrogation(suspect);
  };

  return (
    <div>
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: '#f3e5ab' }}>Persons of Interest</h3>
          <p style={{ fontSize: '13px', color: '#8f96a6', fontFamily: 'var(--font-sans)' }}>
            Review suspect profiles, psychological composure, and initiate formal interrogations.
          </p>
        </div>
      </div>

      <div className="suspects-grid">
        {suspects.map((suspect) => {
          const isBroken = suspect.composure <= 0;
          return (
            <div key={suspect.id} className="suspect-card">
              <div className="suspect-card-img-wrapper">
                <img
                  src={suspect.portrait}
                  alt={suspect.name}
                  className="suspect-card-img"
                />
                <div className="suspect-composure-bar-wrap" title={`Composure: ${suspect.composure}%`}>
                  <div
                    className="suspect-composure-bar"
                    style={{
                      width: `${suspect.composure}%`,
                      background: isBroken ? '#8b1e1e' : undefined,
                    }}
                  />
                </div>
              </div>

              <div className="suspect-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="suspect-card-name">{suspect.name}</div>
                    <div className="suspect-card-role">{suspect.role} • Age {suspect.age}</div>
                  </div>
                  {isBroken ? (
                    <span
                      style={{
                        background: '#8b1e1e',
                        color: '#fff',
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '3px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <ShieldAlert size={12} /> CONFESSED
                    </span>
                  ) : suspect.brokenContradictions.length > 0 ? (
                    <span
                      style={{
                        background: '#3d2e18',
                        color: '#ffd700',
                        border: '1px solid #d4af37',
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '3px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <CheckCircle2 size={12} /> Lie Broken
                    </span>
                  ) : null}
                </div>

                <div style={{ fontSize: '13px', color: '#abb2c3', marginBottom: '8px', lineHeight: '1.4' }}>
                  <strong style={{ color: '#d4af37' }}>Background: </strong>
                  {suspect.background}
                </div>

                <div className="suspect-card-alibi">
                  <strong style={{ color: '#d4af37' }}>Claimed Alibi: </strong>
                  "{suspect.initialAlibi}"
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                  <button
                    className="gothic-btn"
                    style={{ width: '100%', padding: '8px 14px', fontSize: '13px' }}
                    onClick={() => handleInterrogate(suspect)}
                  >
                    <MessageSquare size={15} />
                    <span>Interrogate {suspect.name.split(' ')[1] || suspect.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
