import React, { useState, useEffect } from 'react';
import { studioAudio } from '../utils/audio';

export default function Navbar({ onCelebrate }) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Subscribe to sound state
    const unsubscribe = studioAudio.subscribe((state) => {
      setIsPlaying(state);
    });
    return unsubscribe;
  }, []);

  const toggleSound = () => {
    studioAudio.toggleAmbient();
    if (!isPlaying) {
      onCelebrate?.();
    }
  };

  return (
    <header className="studio-nav">
      <div className="date-badge">
        <span className="pulse-indicator" />
        <span className="date-text">26 NOVEMBER • HAPPY BIRTHDAY</span>
      </div>

      <div className="nav-actions">
        <button
          onClick={onCelebrate}
          className="sound-chip celebrate-btn"
          title="Shoot confetti"
          aria-label="Celebrate Rakshith"
        >
          <span className="celebrate-emoji">🎉</span>
          <span>Celebrate</span>
        </button>

        <button
          id="btn-sound"
          className={`sound-chip ${isPlaying ? 'active' : ''}`}
          onClick={toggleSound}
          aria-label="Toggle ambient chimes"
        >
          <svg className="sound-wave-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path className="wave wave-1" d="M11 5L6 9H2v6h4l5 4V5z" />
            <path className={`wave wave-2 ${isPlaying ? 'wave-animated' : ''}`} d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path className={`wave wave-3 ${isPlaying ? 'wave-animated' : ''}`} d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <span>{isPlaying ? 'Chimes Active' : 'Sound FX'}</span>
        </button>
      </div>
    </header>
  );
}
