/**
 * Studio-Grade Animation Engine for Rakshith's Birthday (Nov 26)
 * Features:
 * - 3D Gyroscopic & Mouse Tilt Physics
 * - 3D Tumbling Stadium Confetti Engine
 * - Smooth Easing Number Count-up
 * - Elastic Spring Runaway Button Physics
 * - Harmonic Pentatonic Audio Synthesizer
 */

// ============================================================================
// 1. REFINED HARMONIC AUDIO SYNTHESIZER (WEB AUDIO API)
// ============================================================================
class StudioAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C Major Pentatonic
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft Marimba / Bell Chime
  playChime(freq, timeOffset = 0, duration = 0.6) {
    this.init();
    const now = this.ctx.currentTime + timeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  playChord(frequencies) {
    frequencies.forEach((freq, idx) => {
      this.playChime(freq, idx * 0.07, 0.8);
    });
  }

  playPop() {
    this.init();
    this.playChime(480, 0, 0.15);
  }

  toggleAmbient(onStateChange) {
    this.init();
    if (this.isPlaying) {
      this.isPlaying = false;
      if (this.timer) clearTimeout(this.timer);
      onStateChange(false);
    } else {
      this.isPlaying = true;
      onStateChange(true);
      this.ambientLoop();
    }
  }

  ambientLoop() {
    if (!this.isPlaying) return;
    const randomNote = this.scale[Math.floor(Math.random() * this.scale.length)];
    this.playChime(randomNote, 0, 1.2);
    const delay = 600 + Math.random() * 800;
    this.timer = setTimeout(() => this.ambientLoop(), delay);
  }
}

// ============================================================================
// 2. STUDIO 3D PERSPECTIVE CONFETTI ENGINE (CANVAS)
// ============================================================================
class StudioConfetti {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.colors = [
      '#ff3366', '#ffbe0b', '#06d6a0', '#ffffff', 
      '#8338ec', '#3a86ff', '#fb5607'
    ];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Stadium-Style Dual Cannon Blast
  cannonBlast() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.spawnCannon(w * 0.15, h * 0.85, 55, -18, -65);
    this.spawnCannon(w * 0.85, h * 0.85, 55, 18, -65);
  }

  spawnCannon(x, y, count, spreadX, baseVy) {
    for (let i = 0; i < count; i++) {
      const angle = (spreadX + (Math.random() - 0.5) * 45) * (Math.PI / 180);
      const speed = Math.random() * 18 + 14;

      this.particles.push({
        x: x,
        y: y,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed + baseVy * 0.2,
        sizeW: Math.random() * 9 + 6,
        sizeH: Math.random() * 14 + 8,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        spinX: (Math.random() - 0.5) * 12,
        spinY: (Math.random() - 0.5) * 12,
        gravity: 0.38,
        drag: 0.965,
        alpha: 1
      });
    }
  }

  burst(x, y, count = 50) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 6;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        sizeW: Math.random() * 8 + 5,
        sizeH: Math.random() * 12 + 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        spinX: (Math.random() - 0.5) * 10,
        spinY: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        drag: 0.96,
        alpha: 1
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotationX += p.spinX;
      p.rotationY += p.spinY;
      p.alpha -= 0.007;

      if (p.alpha <= 0 || p.y > this.canvas.height + 40) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);

      // 3D perspective simulation
      const scaleX = Math.cos((p.rotationX * Math.PI) / 180);
      const scaleY = Math.sin((p.rotationY * Math.PI) / 180);
      this.ctx.scale(scaleX, scaleY);

      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.sizeW / 2, -p.sizeH / 2, p.sizeW, p.sizeH);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

// ============================================================================
// 3. 3D TILT PHYSICS CONTROLLER
// ============================================================================
function initTiltPhysics() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    const inner = card.querySelector('.card-inner');
    if (!inner) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// ============================================================================
// 4. ANIMATED NUMBER COUNT-UP
// ============================================================================
function animateCounters() {
  const metrics = document.querySelectorAll('.card-metric');
  metrics.forEach(metric => {
    const target = parseFloat(metric.getAttribute('data-target'));
    const suffix = metric.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;

    let start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * easeOut;

      metric.innerText = isDecimal 
        ? current.toFixed(1) + suffix 
        : Math.round(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  });
}

// ============================================================================
// 5. RUNAWAY TREAT BUTTON (ELASTIC SPRING DODGE)
// ============================================================================
function initTreatDodge(audio, confetti) {
  const btnDodge = document.getElementById('btn-treat-dodge');
  const btnConfirm = document.getElementById('btn-treat-confirm');
  const arena = document.getElementById('dodge-arena');
  const reaction = document.getElementById('treat-reaction');

  const wittyReplies = [
    "Reflexes too sharp! Try again, Rakshith.",
    "System error: Refusal rejected on Nov 26.",
    "The treat is non-negotiable, brother!",
    "Legend says Rakshith is still trying to click this.",
    "Nice attempt, but the bill is waiting!"
  ];

  const dodge = (e) => {
    audio.playPop();
    const arenaRect = arena.getBoundingClientRect();
    const btnRect = btnDodge.getBoundingClientRect();

    const maxMoveX = arenaRect.width - btnRect.width - 16;
    const maxMoveY = arenaRect.height - btnRect.height - 10;

    const randomX = Math.max(8, Math.floor(Math.random() * maxMoveX));
    const randomY = Math.max(5, Math.floor(Math.random() * maxMoveY));

    btnDodge.style.position = 'absolute';
    btnDodge.style.left = `${randomX}px`;
    btnDodge.style.top = `${randomY}px`;

    reaction.innerText = wittyReplies[Math.floor(Math.random() * wittyReplies.length)];
  };

  btnDodge.addEventListener('mouseenter', dodge);
  btnDodge.addEventListener('touchstart', (e) => {
    dodge(e);
    e.preventDefault();
  });
  btnDodge.addEventListener('click', dodge);

  btnConfirm.addEventListener('click', () => {
    audio.playChord([523.25, 659.25, 783.99, 1046.50]); // C Major Fanfare
    confetti.cannonBlast();
    reaction.innerHTML = "<strong style='color: var(--emerald);'>Confirmed! 🎉 Treat secured! Everyone has been notified!</strong>";
  });
}

// ============================================================================
// 6. MAIN ORCHESTRATION ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  const audio = new StudioAudio();
  const confettiCanvas = document.getElementById('confetti-canvas');
  const confetti = new StudioConfetti(confettiCanvas);

  // Initial subtle greeting particles
  setTimeout(() => {
    confetti.burst(window.innerWidth / 2, window.innerHeight * 0.25, 35);
    animateCounters();
  }, 300);

  // Setup 3D Tilt for Stat Cards
  initTiltPhysics();

  // Setup Runaway Treat Physics
  initTreatDodge(audio, confetti);

  // 1. Audio Sound Chip Toggle
  const btnSound = document.getElementById('btn-sound');
  const soundStatus = document.getElementById('sound-status');
  btnSound.addEventListener('click', () => {
    audio.toggleAmbient((active) => {
      if (active) {
        soundStatus.innerText = 'Playing';
        btnSound.classList.add('active');
        confetti.burst(window.innerWidth - 80, 50, 25);
      } else {
        soundStatus.innerText = 'Sound';
        btnSound.classList.remove('active');
      }
    });
  });

  // 2. Interactive SVG Birthday Cake Candle Blow
  const cakeInteractive = document.getElementById('cake-interactive');
  const flameGroup = document.getElementById('cake-flame-group');
  const smokeGroup = document.getElementById('cake-smoke-group');
  const wishBanner = document.getElementById('studio-wish-banner');
  const hintText = document.getElementById('hint-text');
  let candleBlown = false;

  cakeInteractive.addEventListener('click', () => {
    if (candleBlown) return;
    candleBlown = true;

    // Extinguish Flame with SVG transition
    flameGroup.classList.add('extinguished');
    smokeGroup.classList.add('active');
    hintText.innerText = "Candle extinguished ✨";

    // Play Chord & Launch Dual Cannon Blast
    audio.playChord([392.00, 523.25, 659.25, 783.99]);
    confetti.cannonBlast();

    setTimeout(() => {
      wishBanner.classList.remove('hidden');
    }, 450);
  });

  // 3. Wish Copy & WhatsApp Sharing
  const btnCopyQuote = document.getElementById('btn-copy-quote');
  const copyTextDisplay = document.getElementById('copy-text-display');
  const finalWishQuote = document.getElementById('final-wish-quote').innerText.trim();
  const btnWhatsappDirect = document.getElementById('btn-whatsapp-direct');

  btnWhatsappDirect.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(finalWishQuote)}`;

  btnCopyQuote.addEventListener('click', () => {
    navigator.clipboard.writeText(finalWishQuote).then(() => {
      copyTextDisplay.innerText = "Copied to Clipboard! 🎉";
      audio.playPop();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.82, 30);
      setTimeout(() => {
        copyTextDisplay.innerText = "Copy Birthday Wish";
      }, 2400);
    }).catch(() => {
      copyTextDisplay.innerText = "Copied!";
    });
  });
});
