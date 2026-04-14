// --- Particles ---
    const particlesContainer = document.getElementById('js-particles');
    if (particlesContainer && window.particlesJS) {
        let particleCount = window.innerWidth > 1024 ? 60 : 40;
        window.particlesJS('js-particles', {
            "particles": {
                "number": { "value": particleCount, "density": { "enable": false } },
                "color": { "value": ["#ff223e", "#5d1eb2", "#ff7300", "#2765F5", "#ffffff", "#F20A4F"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 2, "random": false },
                "size": { "value": 4, "random": true },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 2, "random": true, "out_mode": "out" }
            },
            "interactivity": { "detect_on": "canvas", "events": { "resize": true } },
            "retina_detect": true
        });
    }
/* =========================
   4. PARTICLE SYSTEM (Skills Section)
   ========================= */
class ParticleSystem {
    constructor(containerId, canvasId, color, shapeChar) {
        this.container = document.getElementById(containerId);
        this.canvas = document.getElementById(canvasId);

        // Safety check if elements exist (so it doesn't break other pages)
        if (!this.container || !this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.color = color;
        this.char = shapeChar;

        this.particles = [];
        this.targets = [];
        this.mouse = { x: 0, y: 0, active: false };

        this.particleCount = 900; // Performance tuning
        this.fontSize = 250;

        this.initListeners();
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    initListeners() {
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            this.mouse.active = true;
        });

        this.container.addEventListener('mouseleave', () => {
            this.mouse.active = false;
        });
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
        // Responsive font size for the hidden shape
        this.fontSize = Math.min(300, this.canvas.width * 0.6);
        this.calculateShapeTargets();
        this.initParticles();
    }

    calculateShapeTargets() {
        this.targets = [];
        const tmpCanvas = document.createElement('canvas');
        const tmpCtx = tmpCanvas.getContext('2d');
        tmpCanvas.width = this.canvas.width;
        tmpCanvas.height = this.canvas.height;

        // Uses your site's font 'Tektur'
        tmpCtx.font = `bold ${this.fontSize}px "Tektur", sans-serif`;
        tmpCtx.textAlign = 'center';
        tmpCtx.textBaseline = 'middle';
        tmpCtx.fillText(this.char, tmpCanvas.width / 2, tmpCanvas.height / 2);

        const imageData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
        const data = imageData.data;
        const step = 6; // Optimization: scan every 6th pixel

        for (let y = 0; y < tmpCanvas.height; y += step) {
            for (let x = 0; x < tmpCanvas.width; x += step) {
                const index = (y * tmpCanvas.width + x) * 4;
                if (data[index + 3] > 128) {
                    this.targets.push({ x: x, y: y });
                }
            }
        }
        this.shuffleArray(this.targets);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    initParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                size: 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Use global CSS variable color if possible, else fallback
        this.ctx.fillStyle = this.color;

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            if (this.mouse.active && this.targets.length > 0) {
                // Swarm Mode
                let targetIndex = i % this.targets.length;
                let target = this.targets[targetIndex];
                p.x += (target.x - p.x) * 0.05;
                p.y += (target.y - p.y) * 0.05;
            } else {
                // Float Mode
                p.x += p.vx;
                p.y += p.vy;
                // Bounce off walls
                if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Systems only if elements exist
document.addEventListener("DOMContentLoaded", () => {
    // // Left: Blue particles forming '{'
    // new ParticleSystem('skillLeft', 'canvasLeft', '#4a90e2', '{   }');

    // Right: Purple particles forming '}'
    new ParticleSystem('skillRight', 'canvasRight', '#f79055ff', '{   }');
});