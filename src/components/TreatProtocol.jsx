import React, { useState, useRef } from 'react';
import { studioAudio } from '../utils/audio';

const wittyReplies = [
  "Reflexes too sharp! Try again, Rakshith.",
  "System error: Refusal rejected on Nov 26.",
  "The treat is strictly non-negotiable, Rakshith!",
  "Legend says Rakshith is still trying to click this.",
  "Nice attempt, but the bill is already printing!",
  "Dodging like Neo in the Matrix won't save your wallet!",
  "Protocol 26-11: Escape option permanently disabled."
];

export default function TreatProtocol({ onConfirmTreat }) {
  const [confirmed, setConfirmed] = useState(false);
  const [reactionText, setReactionText] = useState('Hover or tap "Refuse" to test your reflexes.');
  const [dodgePos, setDodgePos] = useState(null);
  const arenaRef = useRef(null);
  const dodgeBtnRef = useRef(null);

  const handleDodge = (e) => {
    if (confirmed) return;
    if (e && e.type === 'touchstart') {
      e.preventDefault();
    }

    studioAudio.playPop();

    if (arenaRef.current && dodgeBtnRef.current) {
      const arenaRect = arenaRef.current.getBoundingClientRect();
      const btnRect = dodgeBtnRef.current.getBoundingClientRect();

      const maxMoveX = Math.max(10, arenaRect.width - btnRect.width - 24);
      const maxMoveY = Math.max(10, arenaRect.height - btnRect.height - 18);

      const randomX = Math.max(10, Math.floor(Math.random() * maxMoveX));
      const randomY = Math.max(8, Math.floor(Math.random() * maxMoveY));

      setDodgePos({ left: randomX, top: randomY });
    }

    const randomMsg = wittyReplies[Math.floor(Math.random() * wittyReplies.length)];
    setReactionText(randomMsg);
  };

  const handleConfirm = () => {
    setConfirmed(true);
    studioAudio.playSuccess();
    onConfirmTreat?.();
    setReactionText("Confirmed! 🎉 Treat secured! Notification broadcasted to the whole squad!");
  };

  const handleReset = () => {
    setConfirmed(false);
    setDodgePos(null);
    setReactionText('Hover or tap "Refuse" to test your reflexes.');
    studioAudio.playPop();
  };

  return (
    <section className="treat-section">
      <div className="treat-glass-box">
        <div className="treat-content">
          <span className="treat-badge">MANDATORY PROTOCOL</span>
          <h2 className="treat-heading">Will Rakshith sponsor the birthday treat?</h2>
          <p className="treat-sub">
            As established by friendship conventions and Supreme Court precedent, November 26 requires a celebratory feast.
          </p>
        </div>

        <div className="treat-action-arena" ref={arenaRef} id="dodge-arena">
          {!confirmed ? (
            <>
              <button
                id="btn-treat-confirm"
                className="btn-studio btn-primary-glow"
                onClick={handleConfirm}
              >
                <span>🎉 Absolutely, Treat is on me!</span>
              </button>

              <button
                ref={dodgeBtnRef}
                id="btn-treat-dodge"
                className="btn-studio btn-ghost-dodge"
                style={
                  dodgePos
                    ? {
                        position: 'absolute',
                        left: `${dodgePos.left}px`,
                        top: `${dodgePos.top}px`,
                        transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                      }
                    : {}
                }
                onMouseEnter={handleDodge}
                onTouchStart={handleDodge}
                onClick={handleDodge}
              >
                <span>🏃 Refuse / Escape</span>
              </button>
            </>
          ) : (
            <div className="treat-confirmed-pill">
              <span className="check-icon">✓</span>
              <span>Payment Protocol Confirmed by Rakshith</span>
              <button className="treat-reset-btn" onClick={handleReset} title="Test reflexes again">
                Replay Challenge
              </button>
            </div>
          )}
        </div>

        <p className={`treat-status-text ${confirmed ? 'confirmed-text' : ''}`}>
          {reactionText}
        </p>
      </div>
    </section>
  );
}
