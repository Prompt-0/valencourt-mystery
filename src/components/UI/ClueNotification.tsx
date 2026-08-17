import React from 'react';
import { useGame } from '../../context/GameContext';
import { Sparkles, X, KeyRound, AlertCircle, FileSearch } from 'lucide-react';

export const ClueNotification: React.FC = () => {
  const { notifications, dismissNotification } = useGame();

  if (notifications.length === 0) return null;

  return (
    <div className="notifications-stack">
      {notifications.map((n) => (
        <div key={n.id} className={`notification-toast ${n.type}`}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {n.type === 'clue' && <FileSearch size={18} color="#d4af37" />}
              {n.type === 'deduction' && <Sparkles size={18} color="#ffd700" />}
              {n.type === 'contradiction' && <AlertCircle size={18} color="#ff4d4d" />}
              {n.type === 'unlock' && <KeyRound size={18} color="#50c878" />}
              <span className="notification-toast-title">{n.title}</span>
            </div>
            <button
              onClick={() => dismissNotification(n.id)}
              style={{ background: 'transparent', color: '#888', padding: '2px', display: 'flex' }}
            >
              <X size={14} />
            </button>
          </div>
          <div className="notification-toast-msg">{n.message}</div>
        </div>
      ))}
    </div>
  );
};
