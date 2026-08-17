import React from 'react';
import { useGame } from '../../context/GameContext';
import { Compass } from 'lucide-react';

export const RoomNavigator: React.FC = () => {
  const { locations, currentLocationId, moveToLocation } = useGame();

  return (
    <nav className="room-navigator">
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9ba1b0', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', paddingRight: '8px' }}>
        <Compass size={16} color="#d4af37" />
        <span>Manor Rooms:</span>
      </div>

      {locations.map((loc) => {
        const isActive = loc.id === currentLocationId;
        return (
          <button
            key={loc.id}
            className={`room-thumb-btn ${isActive ? 'active' : ''}`}
            onClick={() => moveToLocation(loc.id)}
          >
            <img src={loc.image} alt={loc.name} className="room-thumb-img" />
            <div className="room-thumb-info">
              <span className="room-thumb-name">{loc.name}</span>
              <span className="room-thumb-sub">{loc.subtitle.split('&')[0]}</span>
            </div>
          </button>
        );
      })}
    </nav>
  );
};
