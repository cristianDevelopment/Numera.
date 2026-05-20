// ==========================================
// MOTOR DE SONIDO SINTETIZADO (Web Audio API)
// ==========================================
const NumeraAudio = {
    ctx: null,
    
    // Inicializa el motor solo cuando el usuario hace clic (política de navegadores)
    init: function() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    
    // Función creadora de ondas de sonido
    playTone: function(freq, type, duration, vol=0.1) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },
    
    // --- LIBRERÍA DE EFECTOS ---
    click: function() {
        this.playTone(800, 'sine', 0.05, 0.02); // Blip corto
    },
    correct: function() {
        this.playTone(600, 'sine', 0.1, 0.05);
        setTimeout(() => this.playTone(800, 'sine', 0.2, 0.05), 100); // Campanita doble
    },
    incorrect: function() {
        this.playTone(300, 'sawtooth', 0.2, 0.05);
        setTimeout(() => this.playTone(200, 'sawtooth', 0.3, 0.05), 150); // Zumbido bajo
    },
    hit: function() {
        this.playTone(150, 'square', 0.1, 0.1); // Golpe seco para el cofre
    },
    success: function() {
        // Fanfarria de victoria (Nivel o Cofre)
        this.playTone(400, 'square', 0.1, 0.05);
        setTimeout(() => this.playTone(500, 'square', 0.1, 0.05), 100);
        setTimeout(() => this.playTone(600, 'square', 0.1, 0.05), 200);
        setTimeout(() => this.playTone(800, 'square', 0.4, 0.05), 300);
    },
    gameOver: function() {
        this.playTone(300, 'sawtooth', 0.2, 0.05);
        setTimeout(() => this.playTone(250, 'sawtooth', 0.2, 0.05), 200);
        setTimeout(() => this.playTone(200, 'sawtooth', 0.4, 0.05), 400); // Tono descendente
    }
};