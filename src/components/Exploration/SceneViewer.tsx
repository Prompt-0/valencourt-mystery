import React from 'react';
import { useGame } from '../../context/GameContext';
import type { Hotspot } from '../../types/game';
import {
  Search,
  FileText,
  Lock,
  Skull,
  FlaskConical,
  Key,
  Eye,
} from 'lucide-react';

export const SceneViewer: React.FC = () => {
  const {
    currentLocation,
    discoverClue,
    inspectClue,
    openPuzzle,
    evidence,
  } = useGame();

  const handleHotspotClick = (hotspot: Hotspot) => {
    if (hotspot.puzzleId) {
      openPuzzle(hotspot.puzzleId);
      return;
    }

    if (hotspot.clueId) {
      discoverClue(hotspot.clueId);
      const targetClue = evidence.find((c) => c.id === hotspot.clueId);
      if (targetClue) {
        inspectClue(targetClue);
      }
    }
  };

  const getHotspotIcon = (type: Hotspot['iconType']) => {
    switch (type) {
      case 'skull':
        return <Skull size={20} />;
      case 'flask':
        return <FlaskConical size={20} />;
      case 'lock':
        return <Lock size={20} />;
      case 'key':
        return <Key size={20} />;
      case 'document':
        return <FileText size={20} />;
      case 'eye':
        return <Eye size={20} />;
      default:
        return <Search size={20} />;
    }
  };

  return (
    <div className="scene-container">
      <div className="scene-image-wrapper">
        <img
          src={currentLocation.image}
          alt={currentLocation.name}
          className="scene-image"
        />

        {/* Scene Info Card */}
        <div className="scene-header-card animate-fade-in">
          <div className="scene-header-title">{currentLocation.name}</div>
          <div className="scene-header-subtitle">{currentLocation.subtitle}</div>
          <div className="scene-header-desc">{currentLocation.ambienceDescription}</div>
        </div>

        {/* Interactive Hotspot Pins */}
        {currentLocation.hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="hotspot-pin"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            onClick={() => handleHotspotClick(hotspot)}
            title={hotspot.name}
          >
            <div className="hotspot-pulse" />
            {getHotspotIcon(hotspot.iconType)}
            <div className="hotspot-label">{hotspot.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
