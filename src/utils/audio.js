// Studio Web Audio API Synthesizer
// Clean, dependency-free harmonic synthesizer

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.listeners = new Set();
    this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25]; // C Major Pentatonic extended
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(state) {
    this.listeners.forEach((fn) => fn(state));
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playChime(freq, timeOffset = 0, duration = 0.65) {
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime + timeOffset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio autoplay block handling
    }
  }

  playChord(frequencies) {
    frequencies.forEach((freq, idx) => {
      this.playChime(freq, idx * 0.07, 0.85);
    });
  }

  playPop() {
    this.init();
    this.playChime(480, 0, 0.12);
  }

  playSuccess() {
    this.playChord([523.25, 659.25, 783.99, 1046.50]); // C Major Fanfare
  }

  startAmbient() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;
    this.notify(true);
    this.ambientLoop();
  }

  stopAmbient() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timer) clearTimeout(this.timer);
    this.notify(false);
  }

  toggleAmbient() {
    if (this.isPlaying) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
  }

  ambientLoop() {
    if (!this.isPlaying) return;
    const randomNote = this.scale[Math.floor(Math.random() * this.scale.length)];
    this.playChime(randomNote, 0, 1.2);
    const delay = 700 + Math.random() * 900;
    this.timer = setTimeout(() => this.ambientLoop(), delay);
  }
}

export const studioAudio = new SoundSynthesizer();
