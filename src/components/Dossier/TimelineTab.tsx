import React from 'react';
import { Clock } from 'lucide-react';

interface TimelineEvent {
  time: string;
  title: string;
  claimedStory: string;
  forensicReality: string;
  suspects: string;
  isContradicted: boolean;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    time: '11:15 PM',
    title: 'Library Secret Ingress',
    claimedStory: 'Mlle. Cecile claimed she was strictly studying Codex Noctis in the Library.',
    forensicReality: 'Blue velvet threads prove Cecile opened the revolving bookshelf passage into the Study to photograph Byzantine relic catalogs.',
    suspects: 'Mlle. Cecile Dubois',
    isContradicted: true,
  },
  {
    time: '11:30 PM',
    title: 'Lady Eleanor Retires with Laudanum',
    claimedStory: 'Lady Eleanor claims she slept uninterrupted in the Master Suite until 02:30 AM.',
    forensicReality: 'Eleanor woke at 01:30 AM to burn secret love letters in the Drawing Room hearth (soot found on black robe).',
    suspects: 'Lady Eleanor Valencourt',
    isContradicted: true,
  },
  {
    time: '12:00 AM Midnight',
    title: 'Gates Bolted & Arthur’s Nightcap',
    claimedStory: 'Moritz locked all outer doors. Dr. Albright retired to his guest suite.',
    forensicReality: 'Dr. Albright met with Arthur in the study, was threatened with medical ruin, and spiked Arthur’s evening cognac decanter with Rosewater-cyanide.',
    suspects: 'Dr. Julian Albright, Moritz Graves',
    isContradicted: true,
  },
  {
    time: '12:45 AM',
    title: 'The Lethal Ingestion & Deadbolt',
    claimedStory: 'Lord Arthur presumed working quietly in locked study.',
    forensicReality: 'Arthur drank the poisoned cognac, suffered acute cyanide paralysis, locked the inner door deadbolt in delirium, and scrawled "ALB..." before collapsing.',
    suspects: 'Lord Arthur Valencourt (Victim)',
    isContradicted: false,
  },
  {
    time: '01:45 AM',
    title: 'Subterranean Dumbwaiter Infiltration',
    claimedStory: 'Silas claimed he was walking from the coastal village until 03:00 AM.',
    forensicReality: 'Silas used lockpicks to enter the cellar and rode the freshly greased dumbwaiter straight into the study hatch.',
    suspects: 'Silas Vance',
    isContradicted: true,
  },
  {
    time: '02:14 AM',
    title: 'The Dropped Pocket Watch',
    claimedStory: 'Initial assumption that Arthur was attacked at 02:14 AM.',
    forensicReality: 'Silas found Arthur already dead, grabbed the gold pocket watch, was startled by a lightning strike, and dropped the watch to the fender, smashing the hands at 02:14!',
    suspects: 'Silas Vance',
    isContradicted: true,
  },
];

export const TimelineTab: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '18px', color: '#f3e5ab' }}>
          Chronological Timeline Reconstruction
        </h3>
        <p style={{ fontSize: '13px', color: '#8f96a6', fontFamily: 'var(--font-sans)' }}>
          Cross-reference suspect testimonies against physical timestamps and forensic evidence.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {TIMELINE_EVENTS.map((event, idx) => (
          <div
            key={idx}
            style={{
              padding: '16px 20px',
              background: '#161822',
              border: '1px solid var(--border-gold)',
              borderRadius: '6px',
              display: 'flex',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '80px',
                padding: '6px 10px',
                background: '#0d0e14',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
              }}
            >
              <Clock size={16} color="#d4af37" style={{ marginBottom: '4px' }} />
              <strong style={{ fontSize: '14px', color: '#ffd700', fontFamily: 'var(--font-sans)' }}>
                {event.time}
              </strong>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '16px', color: '#f3e5ab' }}>{event.title}</h4>
                <span style={{ fontSize: '12px', color: '#a0a8b9', fontFamily: 'var(--font-sans)' }}>
                  {event.suspects}
                </span>
              </div>

              <div style={{ fontSize: '13px', color: '#8f96a6', marginBottom: '6px' }}>
                <strong style={{ color: '#aaa' }}>Suspect Account: </strong>
                {event.claimedStory}
              </div>

              <div
                style={{
                  fontSize: '14px',
                  color: '#e2e6f0',
                  padding: '8px 12px',
                  background: '#0e1017',
                  borderLeft: '3px solid #d4af37',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                <strong style={{ color: '#d4af37' }}>Forensic Finding: </strong>
                {event.forensicReality}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
