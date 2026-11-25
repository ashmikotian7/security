import React, { useState } from 'react';
import { studioAudio } from '../utils/audio';

export default function BirthdayCake({ onBlowCandle }) {
  const [blown, setBlown] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);

    // Audio & Confetti
    studioAudio.playChord([392.00, 523.25, 659.25, 783.99]);
    onBlowCandle?.();

    setTimeout(() => {
      setShowBanner(true);
    }, 400);
  };

  const handleRelight = (e) => {
    e.stopPropagation();
    setBlown(false);
    setShowBanner(false);
    studioAudio.playPop();
  };

  return (
    <div className="cake-display">
      <div
        className={`cake-interact-zone ${blown ? 'blown' : ''}`}
        onClick={handleBlow}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBlow();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={blown ? "Candle is blown out" : "Blow out candle on cake"}
      >
        <svg
          className="cake-svg"
          viewBox="0 0 320 280"
          width="320"
          height="280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d445c" />
              <stop offset="100%" stopColor="#1e2233" />
            </linearGradient>
            <linearGradient id="baseTierGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff3366" />
              <stop offset="100%" stopColor="#d61b4d" />
            </linearGradient>
            <linearGradient id="topTierGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5983" />
              <stop offset="100%" stopColor="#ff3366" />
            </linearGradient>
            <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f3fa" />
            </linearGradient>
            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffbe0b" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffbe0b" />
            </linearGradient>
            <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#ffbe0b" />
              <stop offset="80%" stopColor="#fb5607" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Stand / Plate */}
          <ellipse cx="160" cy="245" rx="125" ry="16" fill="url(#plateGrad)" />
          <ellipse cx="160" cy="242" rx="115" ry="12" fill="#2d3345" />

          {/* Bottom Tier */}
          <path d="M60 170 C60 160 260 160 260 170 L260 220 C260 238 60 238 60 220 Z" fill="url(#baseTierGrad)" />
          {/* Bottom Tier Frosting Drips */}
          <path d="M60 170 C75 185 85 185 100 170 C115 190 125 190 140 170 C155 188 165 188 180 170 C195 185 205 185 220 170 C235 188 245 188 260 170 C260 160 60 160 60 170 Z" fill="url(#frostingGrad)" />

          {/* Top Tier */}
          <path d="M95 118 C95 110 225 110 225 118 L225 165 C225 180 95 180 95 165 Z" fill="url(#topTierGrad)" />
          {/* Top Tier Frosting */}
          <path d="M95 118 C110 132 120 132 135 118 C150 135 160 135 175 118 C190 132 200 132 215 118 C225 125 225 110 225 118 C225 110 95 110 95 118 Z" fill="url(#frostingGrad)" />

          {/* Custom Monogram on Cake */}
          <text
            x="160"
            y="152"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontSize="12"
            fill="#ffffff"
            letterSpacing="3"
            opacity="0.95"
          >
            RAKSHITH
          </text>

          {/* Center Candle */}
          <rect x="156" y="66" width="8" height="46" rx="3" fill="url(#candleGrad)" />
          <line x1="160" y1="66" x2="160" y2="58" stroke="#333333" strokeWidth="2" strokeLinecap="round" />

          {/* Organic Candle Flame */}
          <g className={`flame-group ${blown ? 'extinguished' : ''}`}>
            <circle cx="160" cy="45" r="28" fill="#ffbe0b" opacity="0.18" filter="url(#softGlow)" className="flame-halo" />
            <path className="flame-body" d="M160 28 C166 38 171 45 168 53 C165 59 155 59 152 53 C149 45 154 38 160 28 Z" fill="url(#flameGlow)" />
          </g>

          {/* Smoke Trails on Blow */}
          <g className={`smoke-group ${blown ? 'active' : ''}`} opacity="0">
            <path className="smoke-trail s-1" d="M160 52 C154 40 166 30 156 18 C148 8 162 0 155 -15" stroke="rgba(240, 240, 255, 0.65)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path className="smoke-trail s-2" d="M160 52 C165 38 152 28 163 15 C170 4 158 -5 165 -20" stroke="rgba(240, 240, 255, 0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </svg>

        <div className="interactive-hint">
          <span className={`hint-dot ${blown ? 'blown' : ''}`} />
          <span>{blown ? "Candle extinguished ✨" : "Tap the cake to blow out the candle"}</span>
        </div>
      </div>

      {showBanner && (
        <div className="studio-wish">
          <div className="wish-glass-card">
            <div className="wish-icon-wrap">✨</div>
            <div className="wish-copy">
              <h4>Official Birthday Wish Registered</h4>
              <p>May this year bring Rakshith zero back pain, effortless success, massive wealth, and legendary times ahead!</p>
            </div>
            <button className="relight-btn" onClick={handleRelight} title="Relight the candle">
              🔄 Relight
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
