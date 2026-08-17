import React, { useState, useEffect } from 'react';
import { sound } from '../../audio/soundEngine';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  playAudio?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 18,
  onComplete,
  playAudio = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        if (playAudio && index % 3 === 0) {
          sound.playTypewriterKey();
        }
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete, playAudio]);

  const handleSkip = () => {
    setDisplayedText(text);
    setIsComplete(true);
    if (onComplete) onComplete();
  };

  return (
    <div onClick={handleSkip} style={{ cursor: isComplete ? 'default' : 'pointer' }}>
      <span>{displayedText}</span>
      {!isComplete && <span className="typewriter-cursor" />}
    </div>
  );
};
