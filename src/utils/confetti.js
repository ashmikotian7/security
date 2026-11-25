// 3D Perspective Confetti Animation Engine
export class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.particles = [];
    this.animationFrame = null;
    this.colors = [
      '#ff3366', '#ffbe0b', '#06d6a0', '#ffffff', 
      '#8338ec', '#3a86ff', '#fb5607', '#ff6584'
    ];
    if (this.canvas) {
      this.resize = this.resize.bind(this);
      this.resize();
      window.addEventListener('resize', this.resize);
      this.loop = this.loop.bind(this);
      this.loop();
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  cannonBlast() {
    if (!this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.spawnCannon(w * 0.12, h * 0.85, 60, 22, -65);
    this.spawnCannon(w * 0.88, h * 0.85, 60, -22, -65);
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
    if (!this.ctx || !this.canvas) return;
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

      // 3D perspective tumbling
      const scaleX = Math.cos((p.rotationX * Math.PI) / 180);
      const scaleY = Math.sin((p.rotationY * Math.PI) / 180);
      this.ctx.scale(scaleX, scaleY);

      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.sizeW / 2, -p.sizeH / 2, p.sizeW, p.sizeH);
      this.ctx.restore();
    }

    this.animationFrame = requestAnimationFrame(this.loop);
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('resize', this.resize);
  }
}
