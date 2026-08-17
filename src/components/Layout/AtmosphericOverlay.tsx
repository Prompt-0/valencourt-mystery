import React, { useState, useEffect } from 'react';
import { sound } from '../../audio/soundEngine';

export const AtmosphericOverlay: React.FC = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // Random lightning flash intervals between 12s and 30s
    const triggerLightning = () => {
      setIsFlashing(true);
      sound.playThunder();
      setTimeout(() => {
        setIsFlashing(false);
        // Double flash effect
        setTimeout(() => {
          setIsFlashing(true);
          setTimeout(() => setIsFlashing(false), 80);
        }, 120);
      }, 100);

      const nextDelay = 12000 + Math.random() * 20000;
      timer = window.setTimeout(triggerLightning, nextDelay);
    };

    let timer = window.setTimeout(triggerLightning, 14000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="atmospheric-overlay" />
      <div className={`lightning-flash ${isFlashing ? 'active' : ''}`} />
    </>
  );
};
