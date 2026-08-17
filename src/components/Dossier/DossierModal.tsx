import React from 'react';
import { useGame } from '../../context/GameContext';
import { SuspectsTab } from './SuspectsTab';
import { EvidenceTab } from './EvidenceTab';
import { MindPalaceTab } from './MindPalaceTab';
import { TimelineTab } from './TimelineTab';
import {
  Users,
  Briefcase,
  Sparkles,
  Clock,
  X,
  BookOpen,
} from 'lucide-react';

export const DossierModal: React.FC = () => {
  const { isDossierOpen, dossierTab, openDossier, discoveredClueIds, deductionsMade } = useGame();

  if (!isDossierOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => openDossier(false)}>
      <div
        className="dossier-window animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dossier-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={22} color="#d4af37" />
            <div>
              <h2 style={{ fontSize: '18px', color: '#f3e5ab', margin: 0 }}>
                Detective’s Case Dossier
              </h2>
              <span style={{ fontSize: '11px', color: '#8891a4', fontFamily: 'var(--font-sans)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Valencourt Manor Investigation File #1928-10
              </span>
            </div>
          </div>

          <div className="dossier-nav-tabs">
            <button
              className={`dossier-tab ${dossierTab === 'suspects' ? 'active' : ''}`}
              onClick={() => openDossier(true, 'suspects')}
            >
              <Users size={15} />
              <span>Suspects</span>
            </button>

            <button
              className={`dossier-tab ${dossierTab === 'evidence' ? 'active' : ''}`}
              onClick={() => openDossier(true, 'evidence')}
            >
              <Briefcase size={15} />
              <span>Evidence Locker ({discoveredClueIds.length})</span>
            </button>

            <button
              className={`dossier-tab ${dossierTab === 'mindpalace' ? 'active' : ''}`}
              onClick={() => openDossier(true, 'mindpalace')}
            >
              <Sparkles size={15} color="#ffd700" />
              <span>Mind Palace</span>
              {deductionsMade.length > 0 && (
                <span className="badge-count" style={{ background: '#d4af37', color: '#000' }}>
                  {deductionsMade.length}
                </span>
              )}
            </button>

            <button
              className={`dossier-tab ${dossierTab === 'timeline' ? 'active' : ''}`}
              onClick={() => openDossier(true, 'timeline')}
            >
              <Clock size={15} />
              <span>Timeline</span>
            </button>
          </div>

          <button
            onClick={() => openDossier(false)}
            style={{ background: 'transparent', color: '#aaa', padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="dossier-content">
          {dossierTab === 'suspects' && <SuspectsTab />}
          {dossierTab === 'evidence' && <EvidenceTab />}
          {dossierTab === 'mindpalace' && <MindPalaceTab />}
          {dossierTab === 'timeline' && <TimelineTab />}
        </div>
      </div>
    </div>
  );
};
