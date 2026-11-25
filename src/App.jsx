import React, { useState, useEffect, useRef } from 'react';
import AmbientBackground from './components/AmbientBackground';
import MysteryVerification from './components/MysteryVerification';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BirthdayCake from './components/BirthdayCake';
import TreatProtocol from './components/TreatProtocol';
import ThoughtfulWishes from './components/ThoughtfulWishes';
import { ConfettiEngine } from './utils/confetti';
import { studioAudio } from './utils/audio';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const canvasRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      confettiRef.current = new ConfettiEngine(canvasRef.current);
    }
    return () => {
      confettiRef.current?.destroy();
    };
  }, []);

  const triggerCannonBlast = () => {
    confettiRef.current?.cannonBlast();
    studioAudio.playSuccess();
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    document.title = "Cheers to Rakshith";
    // Big reveal fanfare & confetti
    setTimeout(() => {
      confettiRef.current?.cannonBlast();
      studioAudio.playSuccess();
      studioAudio.startAmbient();
    }, 200);
  };

  return (
    <div className="studio-app">
      <AmbientBackground />
      <canvas id="confetti-canvas" ref={canvasRef} />

      <div className="layout-wrapper">
        {!isUnlocked ? (
          <MysteryVerification onComplete={handleUnlock} />
        ) : (
          <div className="birthday-reveal-stage fade-in">
            <Navbar onCelebrate={triggerCannonBlast} />
            <main>
              <Hero />
              <BirthdayCake onBlowCandle={triggerCannonBlast} />
              <TreatProtocol onConfirmTreat={triggerCannonBlast} />
              <ThoughtfulWishes />
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
