import React, { useState } from 'react';
import { studioAudio } from '../utils/audio';

export default function MysteryVerification({ onComplete }) {
  const [step, setStep] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [decrypting, setDecrypting] = useState(false);

  // Step 1: Scan
  const handleStartScan = () => {
    if (scanning || scanComplete) return;
    setScanning(true);
    studioAudio.playPop();

    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      studioAudio.playPop();
    }, 1800);
  };

  const handleStep1Next = () => {
    studioAudio.playPop();
    setStep(2);
  };

  // Step 2: Protocol Selection
  const handleSelectProtocol = (id) => {
    setSelectedProtocol(id);
    studioAudio.playPop();
  };

  const handleStep2Next = () => {
    studioAudio.playPop();
    setStep(3);
  };

  // Step 3: Decryption & Reveal
  const handleFinalDecrypt = () => {
    setDecrypting(true);
    studioAudio.playPop();

    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="mystery-container">
      {/* Step Tracker */}
      <div className="mystery-progress-bar">
        <div className={`step-node ${step >= 1 ? 'active' : ''}`}>
          <span className="node-num">01</span>
          <span className="node-label">Security</span>
        </div>
        <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
        <div className={`step-node ${step >= 2 ? 'active' : ''}`}>
          <span className="node-num">02</span>
          <span className="node-label">Protocol</span>
        </div>
        <div className={`step-line ${step >= 3 ? 'active' : ''}`} />
        <div className={`step-node ${step >= 3 ? 'active' : ''}`}>
          <span className="node-num">03</span>
          <span className="node-label">Decryption</span>
        </div>
      </div>

      {/* PAGE 1: System Access & Identity Handshake */}
      {step === 1 && (
        <div className="mystery-card fade-in">
          <div className="mystery-meta">
            <span className="security-badge">SECURITY CLEARANCE REQUIRED</span>
            <span className="terminal-id">TERMINAL // 804-RK</span>
          </div>

          <h2 className="mystery-title">System Diagnostic Gateway</h2>
          <p className="mystery-desc">
            An encrypted data transfer has arrived on node 26-11. Perform identity verification to proceed.
          </p>

          <div
            className={`scanner-box ${scanning ? 'scanning' : ''} ${scanComplete ? 'verified' : ''}`}
            onClick={handleStartScan}
            role="button"
            tabIndex={0}
          >
            <div className="scanner-line" />
            <div className="scanner-icon">
              {scanComplete ? '✓' : scanning ? '⚡' : '🔒'}
            </div>
            <div className="scanner-text">
              {scanComplete
                ? 'Identity Verified • Node Match: RK'
                : scanning
                ? 'Analyzing System Signature...'
                : 'Click to Run Diagnostic Handshake'}
            </div>
          </div>

          <div className="mystery-actions">
            <button
              className="btn-studio btn-primary-glow btn-mystery"
              disabled={!scanComplete}
              onClick={handleStep1Next}
            >
              <span>Continue to Verification Matrix →</span>
            </button>
          </div>
        </div>
      )}

      {/* PAGE 2: Anomaly Resolution Protocol */}
      {step === 2 && (
        <div className="mystery-card fade-in">
          <div className="mystery-meta">
            <span className="security-badge">STEP 02 // ANOMALY ANALYSIS</span>
            <span className="terminal-id">NODE // STABLE</span>
          </div>

          <h2 className="mystery-title">Integrity Stress Assessment</h2>
          <p className="mystery-desc">
            A minor temporal anomaly was detected at frequency 26.11. Select your preferred resolution protocol:
          </p>

          <div className="protocol-options">
            <div
              className={`protocol-card ${selectedProtocol === 1 ? 'selected' : ''}`}
              onClick={() => handleSelectProtocol(1)}
            >
              <div className="protocol-header">
                <span className="protocol-num">PROTO-01</span>
                <span className="protocol-radio">{selectedProtocol === 1 ? '●' : '○'}</span>
              </div>
              <h4>Overclock System Bandwidth</h4>
              <p>Reroute processing power directly to core tasks and optimize performance.</p>
            </div>

            <div
              className={`protocol-card ${selectedProtocol === 2 ? 'selected' : ''}`}
              onClick={() => handleSelectProtocol(2)}
            >
              <div className="protocol-header">
                <span className="protocol-num">PROTO-02</span>
                <span className="protocol-radio">{selectedProtocol === 2 ? '●' : '○'}</span>
              </div>
              <h4>Temporal Frequency Alignment</h4>
              <p>Calibrate system clocks and synchronize coordinates for data stream reception.</p>
            </div>

            <div
              className={`protocol-card ${selectedProtocol === 3 ? 'selected' : ''}`}
              onClick={() => handleSelectProtocol(3)}
            >
              <div className="protocol-header">
                <span className="protocol-num">PROTO-03</span>
                <span className="protocol-radio">{selectedProtocol === 3 ? '●' : '○'}</span>
              </div>
              <h4>Direct Firewall Override</h4>
              <p>Execute fast-track authorization to unlock restricted confidential storage.</p>
            </div>
          </div>

          <div className="mystery-actions">
            <button
              className="btn-studio btn-primary-glow btn-mystery"
              disabled={!selectedProtocol}
              onClick={handleStep2Next}
            >
              <span>Confirm Protocol Selection →</span>
            </button>
          </div>
        </div>
      )}

      {/* PAGE 3: Decrypting Confidential Payload */}
      {step === 3 && (
        <div className="mystery-card fade-in">
          <div className="mystery-meta">
            <span className="security-badge">FINAL CLEARANCE // READY</span>
            <span className="terminal-id">PAYLOAD ENCRYPTED</span>
          </div>

          <h2 className="mystery-title">Decrypt Confidential Transmission</h2>
          <p className="mystery-desc">
            Identity handshake confirmed. Resolution protocol applied. The confidential file is ready for decompression.
          </p>

          <div className="decryption-console">
            <div className="console-line">
              <span className="console-prompt">&gt;</span>
              <span className="console-key">RECIPIENT_HASH:</span>
              <span className="console-val">RAKSHITH // CONFIRMED</span>
            </div>
            <div className="console-line">
              <span className="console-prompt">&gt;</span>
              <span className="console-key">SECURITY_LEVEL:</span>
              <span className="console-val">MAXIMUM CLEARANCE</span>
            </div>
            <div className="console-line">
              <span className="console-prompt">&gt;</span>
              <span className="console-key">ENCRYPTION:</span>
              <span className="console-val">AES-256 // READY FOR DECRYPT</span>
            </div>
            <div className="console-line">
              <span className="console-prompt">&gt;</span>
              <span className="console-key">ACTION:</span>
              <span className="console-val blink-text">AWAITING USER DECRYPT AUTHORIZATION...</span>
            </div>
          </div>

          <div className="mystery-actions">
            <button
              className={`btn-studio btn-primary-glow btn-mystery ${decrypting ? 'loading' : ''}`}
              disabled={decrypting}
              onClick={handleFinalDecrypt}
            >
              <span>{decrypting ? 'Decrypting Transmission...' : '🔓 Decrypt & Open File'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
