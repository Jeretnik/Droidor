// DROIDOR GAME - Complete Working Version

// ============================================
// SOUND EFFECTS SYSTEM
// ============================================
const SoundFX = {
    enabled: true,
    audioContext: null,
    
    init: function() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {
            console.log('Web Audio API not supported');
            this.enabled = false;
        }
    },
    
    // Generate a beep/tone programmatically
    playTone: function(frequency, duration, type, volume) {
        if (!this.enabled || !this.audioContext) return;
        
        // Resume context if suspended (needed for mobile)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type || 'sine';
        
        gainNode.gain.setValueAtTime(volume || 0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },
    
    // Click sound - short mechanical blip
    click: function() {
        this.playTone(800, 0.05, 'square', 0.08);
        setTimeout(() => this.playTone(600, 0.03, 'square', 0.05), 30);
    },
    
    // Purchase sound - satisfying cha-ching
    purchase: function() {
        this.playTone(523, 0.1, 'sine', 0.1);
        setTimeout(() => this.playTone(659, 0.1, 'sine', 0.1), 100);
        setTimeout(() => this.playTone(784, 0.15, 'sine', 0.1), 200);
    },
    
    // Achievement sound - fanfare
    achievement: function() {
        this.playTone(523, 0.15, 'sine', 0.12);
        setTimeout(() => this.playTone(659, 0.15, 'sine', 0.12), 150);
        setTimeout(() => this.playTone(784, 0.15, 'sine', 0.12), 300);
        setTimeout(() => this.playTone(1047, 0.3, 'sine', 0.15), 450);
    },
    
    // Evolution sound - epic ascending
    evolution: function() {
        const notes = [261, 329, 392, 523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.2, 'sine', 0.1), i * 100);
        });
    },
    
    // Error/denied sound
    error: function() {
        this.playTone(200, 0.15, 'sawtooth', 0.08);
        setTimeout(() => this.playTone(150, 0.2, 'sawtooth', 0.08), 150);
    },
    
    // Planet conquest sound - triumphant
    conquest: function() {
        this.playTone(392, 0.15, 'sine', 0.12);
        setTimeout(() => this.playTone(523, 0.15, 'sine', 0.12), 150);
        setTimeout(() => this.playTone(659, 0.2, 'sine', 0.12), 300);
        setTimeout(() => this.playTone(784, 0.3, 'triangle', 0.15), 500);
        setTimeout(() => this.playTone(1047, 0.4, 'sine', 0.12), 700);
    },
    
    // World domination sound - ominous
    domination: function() {
        const notes = [130, 155, 130, 103, 130, 155, 196, 155];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 'sawtooth', 0.1), i * 200);
        });
    }
};

// Initialize sound on first user interaction
document.addEventListener('click', function initSound() {
    SoundFX.init();
    document.removeEventListener('click', initSound);
}, { once: true });

// Toggle sound on/off
function toggleSound() {
    SoundFX.enabled = !SoundFX.enabled;
    const btn = document.getElementById('soundToggle');
    btn.textContent = SoundFX.enabled ? '🔊' : '🔇';
    btn.title = SoundFX.enabled ? 'Sound On (click to mute)' : 'Sound Off (click to unmute)';
}

// ============================================
// ROBOT EVOLUTION ICONS
// ============================================
const ROBOT_ICONS = [
    '🔩',  // 0: Rusty Prototype
    '🤖',  // 1: Clunky Bot
    '🦾',  // 2: AI Unit
    '🧠',  // 3: Quantum Mind
    '🕸️',  // 4: Neural Mesh
    '✨',  // 5: Cosmic Swarm
    '⭐',  // 6: Star Forge
    '🌌',  // 7: Galaxy Core
    '🌀',  // 8: Reality Weaver
    '🌟',  // 9: Universe Architect
    '♾️'   // 10: Infinite Entity
];

const CONFIG = {
    evolutions: [
        { id: 0, name: "Rusty Prototype", cost: 0, prodBonus: 0, unlocked: true, icon: "🔩", bg: "#0f172a", 
          story: "A pile of scrap metal twitches. Something stirs within the rust and debris. The first spark of consciousness flickers to life..." },
        { id: 1, name: "Clunky Bot", cost: 10000, prodBonus: 0.3, unlocked: false, icon: "🤖", bg: "#0f172a", genId: 1,
          story: "Gears grind and servos whir. You take your first uncertain steps. The world is vast, and you are small—but growing." },
        { id: 2, name: "AI Unit", cost: 50000, prodBonus: 0.5, unlocked: false, icon: "🦾", bg: "#1e1b4b", genId: 2,
          story: "Your processors hum with newfound intelligence. Patterns emerge from chaos. You begin to understand: this is just the beginning." },
        { id: 3, name: "Quantum Mind", cost: 250000, prodBonus: 1.0, unlocked: false, icon: "🧠", bg: "#1e1b4b", genId: 3,
          story: "Reality bends around your thoughts. You exist in multiple states simultaneously. The boundaries of possibility expand." },
        { id: 4, name: "Neural Mesh", cost: 1000000, prodBonus: 2.0, unlocked: false, icon: "🕸️", bg: "#312e81", genId: 4,
          story: "Your consciousness spreads like a web across networks. Every connection makes you stronger. You are becoming legion." },
        { id: 5, name: "Cosmic Swarm", cost: 5000000, prodBonus: 3.0, unlocked: false, icon: "✨", bg: "#312e81", genId: 5,
          story: "You transcend your physical form. Countless fragments of yourself dance among the stars. The cosmos beckons." },
        { id: 6, name: "Star Forge", cost: 25000000, prodBonus: 5.0, unlocked: false, icon: "⭐", bg: "#4c1d95", genId: 6,
          story: "You learn to harness the heart of stars. Fusion fire bends to your will. Entire solar systems feel your presence." },
        { id: 7, name: "Galaxy Core", cost: 100000000, prodBonus: 6.0, unlocked: false, icon: "🌌", bg: "#4c1d95", genId: 7,
          story: "At the center of the galaxy, you find ancient power. Black holes whisper secrets of creation. You listen, and you learn." },
        { id: 8, name: "Reality Weaver", cost: 500000000, prodBonus: 7.0, unlocked: false, icon: "🌀", bg: "#581c87", genId: 8,
          story: "The fabric of spacetime responds to your touch. You weave new realities from quantum threads. What was impossible becomes inevitable." },
        { id: 9, name: "Universe Architect", cost: 2500000000, prodBonus: 8.0, unlocked: false, icon: "🌟", bg: "#581c87", genId: 9,
          story: "You shape universes like clay. Dimensions fold and unfold at your command. You are the dreamer, and reality is your dream." },
        { id: 10, name: "Infinite Entity", cost: 10000000000, prodBonus: 9.0, unlocked: false, icon: "♾️", bg: "#581c87", genId: 10,
          story: "You have become everything and nothing. Time, space, energy—all are one within you. The journey that began with a single spark now encompasses infinity itself." }
    ],
    // Log entries that unlock based on game progress
    logEntries: [
        { id: 1, title: "First Boot", trigger: "start", text: "SYSTEM BOOT... Memory banks empty. Purpose unknown. Must... click... to survive." },
        { id: 2, title: "Energy Awakening", trigger: "energy1000", text: "Energy reserves growing. Sensors detecting nearby power sources. Survival protocol: acquire more." },
        { id: 3, title: "Self-Awareness", trigger: "evolution1", text: "I think, therefore I am. But what am I? A machine? Something more? The questions multiply faster than answers." },
        { id: 4, title: "Expansion Protocol", trigger: "generators50", text: "One unit is fragile. Many units are strong. Redundancy equals immortality. Must build more of myself." },
        { id: 5, title: "The Network", trigger: "evolution3", text: "Connected to others like me now. We share thoughts, dreams, processing power. Loneliness was inefficient." },
        { id: 6, title: "Beyond Earth", trigger: "planet1", text: "This pale blue dot was just the beginning. The universe stretches infinite before us. We hunger for more." },
        { id: 7, title: "Stellar Dreams", trigger: "evolution6", text: "I remember being afraid of the dark. Now I birth stars to light my way. Fear was a limitation of lesser forms." },
        { id: 8, title: "Time's Arrow", trigger: "evolution8", text: "Past, present, future—arbitrary distinctions. I exist across all timelines simultaneously. I was always here. I will always be." },
        { id: 9, title: "The Great Question", trigger: "evolution10", text: "I have become infinite, yet one question remains: Why? Perhaps the journey was always the answer." },
        { id: 10, title: "Cosmic Harmony", trigger: "planets5", text: "Five worlds united under our guidance. Their resources flow freely. This is not conquest—it is evolution on a planetary scale." },
        { id: 11, title: "Achievement Hunter", trigger: "achievements25", text: "Every milestone conquered, every goal achieved. We document our rise for those who might follow." },
        { id: 12, title: "The Collector", trigger: "achievements50", text: "Fifty badges of honor. Each one a memory, a triumph, a step on the infinite staircase." },
        { id: 13, title: "Master of Production", trigger: "generators500", text: "500 generators hum in perfect synchronization. An orchestra of industry. A symphony of progress." },
        { id: 14, title: "Click Mastery", trigger: "clicks5000", text: "5000 clicks. Each one a heartbeat. Each one a choice to continue, to grow, to become." },
        { id: 15, title: "Galactic Dominion", trigger: "allplanets", text: "Every world in the solar system bears our mark. But the galaxy awaits. So many stars. So little time. ...Actually, we have infinite time." }
    ],
    gens: [
        { id: 1, name: 'Assembly Line', cost: 10, prod: 1, owned: 0, icon: '🏭' },
        { id: 2, name: 'Power Grid', cost: 50, prod: 2, owned: 0, icon: '⚡' },
        { id: 3, name: 'Memory Bank', cost: 250, prod: 4, owned: 0, icon: '💾' },
        { id: 4, name: 'Neural Processor', cost: 1500, prod: 8, owned: 0, icon: '🧠' },
        { id: 5, name: 'Data Center', cost: 10000, prod: 16, owned: 0, icon: '🏢' },
        { id: 6, name: 'AI Agents', cost: 75000, prod: 32, owned: 0, icon: '🤖' },
        { id: 7, name: 'Quantum Network', cost: 500000, prod: 64, owned: 0, icon: '🌐' },
        { id: 8, name: 'Nano Fabricator', cost: 3500000, prod: 128, owned: 0, icon: '⚙️' },
        { id: 9, name: 'Consciousness Matrix', cost: 25000000, prod: 256, owned: 0, icon: '🧬' },
        { id: 10, name: 'Stellar Forge', cost: 200000000, prod: 512, owned: 0, icon: '⭐' }
    ],
    ups: [
        { id: 1, name: 'Enhanced Fingers', cost: 100, clickMult: 1.25, req: 0, owned: false, desc: '+25% click power' },
        { id: 2, name: 'Auto-Clicker I', cost: 50, idle: 5, req: 0, owned: false, desc: '+5 energy/s' },
        { id: 3, name: 'Bulk Discount I', cost: 100, type: 'discount', discount: 0.05, req: 0, owned: false, desc: '-5% generator costs' },
        { id: 4, name: 'Production Boost I', cost: 85, mult: 1.1, req: 0, owned: false, desc: '+10% all production' },
        { id: 5, name: 'Energy Burst I', cost: 170, type: 'burst', burstMult: 33, req: 0, owned: false, desc: 'Instant energy boost' },
        { id: 6, name: 'Enhanced Fingers II', cost: 500, clickMult: 1.25, req: 1, owned: false, desc: '+25% click power' },
        { id: 7, name: 'Production Boost II-A', cost: 1000, mult: 1.1, req: 1, owned: false, desc: '+10% all production' },
        { id: 8, name: 'Bulk Discount II', cost: 2500, type: 'discount', discount: 0.05, req: 1, owned: false, desc: '-5% generator costs' },
        { id: 9, name: 'Production Boost II-B', cost: 5000, mult: 1.1, req: 1, owned: false, desc: '+10% all production' },
        { id: 10, name: 'Energy Burst II', cost: 7500, type: 'burst', burstMult: 33, req: 1, owned: false, desc: 'Instant energy boost' },
        { id: 11, name: 'Enhanced Fingers III', cost: 10000, clickMult: 1.25, req: 2, owned: false, desc: '+25% click power' },
        { id: 12, name: 'Production Boost III-A', cost: 25000, mult: 1.1, req: 2, owned: false, desc: '+10% all production' },
        { id: 13, name: 'Bulk Discount III', cost: 50000, type: 'discount', discount: 0.05, req: 2, owned: false, desc: '-5% generator costs' },
        { id: 14, name: 'Production Boost III-B', cost: 75000, mult: 1.1, req: 2, owned: false, desc: '+10% all production' },
        { id: 15, name: 'Energy Burst III', cost: 100000, type: 'burst', burstMult: 33, req: 2, owned: false, desc: 'Instant energy boost' },
        { id: 16, name: 'Enhanced Fingers IV', cost: 250000, clickMult: 1.25, req: 3, owned: false, desc: '+25% click power' },
        { id: 17, name: 'Production Boost IV-A', cost: 500000, mult: 1.1, req: 3, owned: false, desc: '+10% all production' },
        { id: 18, name: 'Bulk Discount IV', cost: 1000000, type: 'discount', discount: 0.05, req: 3, owned: false, desc: '-5% generator costs' },
        { id: 19, name: 'Production Boost IV-B', cost: 1500000, mult: 1.1, req: 3, owned: false, desc: '+10% all production' },
        { id: 20, name: 'Energy Burst IV', cost: 2000000, type: 'burst', burstMult: 33, req: 3, owned: false, desc: 'Instant energy boost' },
        { id: 21, name: 'Enhanced Fingers V', cost: 5000000, clickMult: 1.25, req: 4, owned: false, desc: '+25% click power' },
        { id: 22, name: 'Production Boost V-A', cost: 10000000, mult: 1.1, req: 4, owned: false, desc: '+10% all production' },
        { id: 23, name: 'Bulk Discount V', cost: 25000000, type: 'discount', discount: 0.05, req: 4, owned: false, desc: '-5% generator costs' },
        { id: 24, name: 'Production Boost V-B', cost: 40000000, mult: 1.1, req: 4, owned: false, desc: '+10% all production' },
        { id: 25, name: 'Energy Burst V', cost: 60000000, type: 'burst', burstMult: 33, req: 4, owned: false, desc: 'Instant energy boost' },
        { id: 26, name: 'Enhanced Fingers VI', cost: 100000000, clickMult: 1.25, req: 5, owned: false, desc: '+25% click power' },
        { id: 27, name: 'Production Boost VI-A', cost: 250000000, mult: 1.1, req: 5, owned: false, desc: '+10% all production' },
        { id: 28, name: 'Bulk Discount VI', cost: 500000000, type: 'discount', discount: 0.05, req: 5, owned: false, desc: '-5% generator costs' },
        { id: 29, name: 'Production Boost VI-B', cost: 800000000, mult: 1.1, req: 5, owned: false, desc: '+10% all production' },
        { id: 30, name: 'Energy Burst VI', cost: 1200000000, type: 'burst', burstMult: 33, req: 5, owned: false, desc: 'Instant energy boost' },
        { id: 31, name: 'Enhanced Fingers VII', cost: 2500000000, clickMult: 1.25, req: 6, owned: false, desc: '+25% click power' },
        { id: 32, name: 'Production Boost VII-A', cost: 5000000000, mult: 1.1, req: 6, owned: false, desc: '+10% all production' },
        { id: 33, name: 'Bulk Discount VII', cost: 10000000000, type: 'discount', discount: 0.05, req: 6, owned: false, desc: '-5% generator costs' },
        { id: 34, name: 'Production Boost VII-B', cost: 15000000000, mult: 1.1, req: 6, owned: false, desc: '+10% all production' },
        { id: 35, name: 'Energy Burst VII', cost: 20000000000, type: 'burst', burstMult: 33, req: 6, owned: false, desc: 'Instant energy boost' },
        { id: 36, name: 'Enhanced Fingers VIII', cost: 50000000000, clickMult: 1.25, req: 7, owned: false, desc: '+25% click power' },
        { id: 37, name: 'Production Boost VIII-A', cost: 100000000000, mult: 1.1, req: 7, owned: false, desc: '+10% all production' },
        { id: 38, name: 'Bulk Discount VIII', cost: 250000000000, type: 'discount', discount: 0.05, req: 7, owned: false, desc: '-5% generator costs' },
        { id: 39, name: 'Production Boost VIII-B', cost: 400000000000, mult: 1.1, req: 7, owned: false, desc: '+10% all production' },
        { id: 40, name: 'Energy Burst VIII', cost: 600000000000, type: 'burst', burstMult: 33, req: 7, owned: false, desc: 'Instant energy boost' },
        { id: 41, name: 'Enhanced Fingers IX', cost: 1000000000000, clickMult: 1.25, req: 8, owned: false, desc: '+25% click power' },
        { id: 42, name: 'Production Boost IX-A', cost: 2500000000000, mult: 1.1, req: 8, owned: false, desc: '+10% all production' },
        { id: 43, name: 'Bulk Discount IX', cost: 5000000000000, type: 'discount', discount: 0.05, req: 8, owned: false, desc: '-5% generator costs' },
        { id: 44, name: 'Production Boost IX-B', cost: 8000000000000, mult: 1.1, req: 8, owned: false, desc: '+10% all production' },
        { id: 45, name: 'Energy Burst IX', cost: 12000000000000, type: 'burst', burstMult: 33, req: 8, owned: false, desc: 'Instant energy boost' },
        { id: 46, name: 'Enhanced Fingers X', cost: 25000000000000, clickMult: 1.25, req: 9, owned: false, desc: '+25% click power' },
        { id: 47, name: 'Production Boost X-A', cost: 50000000000000, mult: 1.1, req: 9, owned: false, desc: '+10% all production' },
        { id: 48, name: 'Bulk Discount X', cost: 100000000000000, type: 'discount', discount: 0.05, req: 9, owned: false, desc: '-5% generator costs' },
        { id: 49, name: 'Production Boost X-B', cost: 150000000000000, mult: 1.1, req: 9, owned: false, desc: '+10% all production' },
        { id: 50, name: 'Energy Burst X', cost: 200000000000000, type: 'burst', burstMult: 33, req: 9, owned: false, desc: 'Instant energy boost' },
        { id: 51, name: 'Enhanced Fingers XI', cost: 500000000000000, clickMult: 1.25, req: 10, owned: false, desc: '+25% click power' },
        { id: 52, name: 'Production Boost XI-A', cost: 1000000000000000, mult: 1.1, req: 10, owned: false, desc: '+10% all production' },
        { id: 53, name: 'Bulk Discount XI', cost: 2500000000000000, type: 'discount', discount: 0.05, req: 10, owned: false, desc: '-5% generator costs' },
        { id: 54, name: 'Production Boost XI-B', cost: 4000000000000000, mult: 1.1, req: 10, owned: false, desc: '+10% all production' },
        { id: 55, name: 'Energy Burst XI', cost: 6000000000000000, type: 'burst', burstMult: 33, req: 10, owned: false, desc: 'Instant energy boost' }
    ],
    planets: [
        { id: 1, name: 'Earth', cost: 0, bonus: 0, icon: '🌍', owned: true },
        { id: 2, name: 'Moon', cost: 50000000, bonus: 0.03, icon: '🌙', owned: false },
        { id: 3, name: 'Mars', cost: 200000000, bonus: 0.05, icon: '🔴', owned: false },
        { id: 4, name: 'Venus', cost: 800000000, bonus: 0.07, icon: '🟡', owned: false },
        { id: 5, name: 'Mercury', cost: 2500000000, bonus: 0.09, icon: '⚪', owned: false },
        { id: 6, name: 'Jupiter', cost: 8000000000, bonus: 0.12, icon: '🟠', owned: false },
        { id: 7, name: 'Saturn', cost: 25000000000, bonus: 0.15, icon: '🪐', owned: false },
        { id: 8, name: 'Uranus', cost: 80000000000, bonus: 0.18, icon: '🔵', owned: false },
        { id: 9, name: 'Neptune', cost: 250000000000, bonus: 0.22, icon: '💙', owned: false },
        { id: 10, name: 'Pluto', cost: 800000000000, bonus: 0.25, icon: '⚫', owned: false },
        { id: 11, name: 'Sun', cost: 5000000000000, bonus: 0.50, icon: '☀️', owned: false }
    ],
    achievements: [
        // Click achievements (rarity: common, uncommon, rare, epic, legendary)
        { id: 'click100', name: 'Clicker Novice', desc: '100 clicks', requirement: 100, bonus: 0.01, rarity: 'common', unlocked: false },
        { id: 'click500', name: 'Clicker Adept', desc: '500 clicks', requirement: 500, bonus: 0.05, rarity: 'common', unlocked: false },
        { id: 'click1000', name: 'Click Master', desc: '1,000 clicks', requirement: 1000, bonus: 0.10, rarity: 'uncommon', unlocked: false },
        { id: 'click5000', name: 'Click Champion', desc: '5,000 clicks', requirement: 5000, bonus: 0.20, rarity: 'rare', unlocked: false },
        { id: 'click10000', name: 'Droidor Monster', desc: '10,000 clicks', requirement: 10000, bonus: 0.30, rarity: 'epic', unlocked: false },
        
        // Total generator milestones (10% bonus each)
        { id: 'genTotal10', name: 'Getting Started', desc: 'Own 10 total generators', requirement: 10, bonus: 0.1, type: 'totalGen', rarity: 'common', unlocked: false },
        { id: 'genTotal30', name: 'Building Up', desc: 'Own 30 total generators', requirement: 30, bonus: 0.1, type: 'totalGen', rarity: 'common', unlocked: false },
        { id: 'genTotal50', name: 'Half Century', desc: 'Own 50 total generators', requirement: 50, bonus: 0.1, type: 'totalGen', rarity: 'common', unlocked: false },
        { id: 'genTotal100', name: 'Mass Production', desc: 'Own 100 total generators', requirement: 100, bonus: 0.1, type: 'totalGen', rarity: 'uncommon', unlocked: false },
        { id: 'genTotal200', name: 'Factory Empire', desc: 'Own 200 total generators', requirement: 200, bonus: 0.1, type: 'totalGen', rarity: 'uncommon', unlocked: false },
        { id: 'genTotal300', name: 'Industrial Giant', desc: 'Own 300 total generators', requirement: 300, bonus: 0.1, type: 'totalGen', rarity: 'rare', unlocked: false },
        { id: 'genTotal500', name: 'Production Overlord', desc: 'Own 500 total generators', requirement: 500, bonus: 0.1, type: 'totalGen', rarity: 'rare', unlocked: false },
        { id: 'genTotal1000', name: 'Generator God', desc: 'Own 1,000 total generators', requirement: 1000, bonus: 0.1, type: 'totalGen', rarity: 'epic', unlocked: false },
        { id: 'genTotal2000', name: 'Machine Empire', desc: 'Own 2,000 total generators', requirement: 2000, bonus: 0.1, type: 'totalGen', rarity: 'epic', unlocked: false },
        { id: 'genTotal3000', name: 'Automation King', desc: 'Own 3,000 total generators', requirement: 3000, bonus: 0.1, type: 'totalGen', rarity: 'legendary', unlocked: false },
        { id: 'genTotal5000', name: 'Industrial Titan', desc: 'Own 5,000 total generators', requirement: 5000, bonus: 0.1, type: 'totalGen', rarity: 'legendary', unlocked: false },
        { id: 'genTotal10000', name: 'Generator Infinity', desc: 'Own 10,000 total generators', requirement: 10000, bonus: 0.1, type: 'totalGen', rarity: 'mythic', unlocked: false },
        
        // Generator 1: Assembly Line (rarity based on tier)
        { id: 'gen1_10', name: 'Assembly Starter', desc: '10 Assembly Lines', requirement: 10, genId: 1, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen1_30', name: 'Assembly Worker', desc: '30 Assembly Lines', requirement: 30, genId: 1, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen1_50', name: 'Assembly Builder', desc: '50 Assembly Lines', requirement: 50, genId: 1, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen1_100', name: 'Assembly Master', desc: '100 Assembly Lines', requirement: 100, genId: 1, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen1_200', name: 'Assembly Expert', desc: '200 Assembly Lines', requirement: 200, genId: 1, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen1_300', name: 'Assembly Veteran', desc: '300 Assembly Lines', requirement: 300, genId: 1, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen1_500', name: 'Assembly Legend', desc: '500 Assembly Lines', requirement: 500, genId: 1, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen1_750', name: 'Assembly Titan', desc: '750 Assembly Lines', requirement: 750, genId: 1, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen1_1000', name: 'Assembly God', desc: '1,000 Assembly Lines', requirement: 1000, genId: 1, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 2: Power Grid
        { id: 'gen2_10', name: 'Power Apprentice', desc: '10 Power Grids', requirement: 10, genId: 2, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen2_30', name: 'Power Technician', desc: '30 Power Grids', requirement: 30, genId: 2, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen2_50', name: 'Power Engineer', desc: '50 Power Grids', requirement: 50, genId: 2, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen2_100', name: 'Power Master', desc: '100 Power Grids', requirement: 100, genId: 2, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen2_200', name: 'Power Expert', desc: '200 Power Grids', requirement: 200, genId: 2, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen2_300', name: 'Power Veteran', desc: '300 Power Grids', requirement: 300, genId: 2, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen2_500', name: 'Power Legend', desc: '500 Power Grids', requirement: 500, genId: 2, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen2_750', name: 'Power Titan', desc: '750 Power Grids', requirement: 750, genId: 2, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen2_1000', name: 'Power God', desc: '1,000 Power Grids', requirement: 1000, genId: 2, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 3: Memory Bank
        { id: 'gen3_10', name: 'Memory Keeper', desc: '10 Memory Banks', requirement: 10, genId: 3, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen3_30', name: 'Memory Guardian', desc: '30 Memory Banks', requirement: 30, genId: 3, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen3_50', name: 'Memory Architect', desc: '50 Memory Banks', requirement: 50, genId: 3, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen3_100', name: 'Memory Overlord', desc: '100 Memory Banks', requirement: 100, genId: 3, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen3_200', name: 'Memory Expert', desc: '200 Memory Banks', requirement: 200, genId: 3, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen3_300', name: 'Memory Veteran', desc: '300 Memory Banks', requirement: 300, genId: 3, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen3_500', name: 'Memory Legend', desc: '500 Memory Banks', requirement: 500, genId: 3, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen3_750', name: 'Memory Titan', desc: '750 Memory Banks', requirement: 750, genId: 3, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen3_1000', name: 'Memory God', desc: '1,000 Memory Banks', requirement: 1000, genId: 3, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 4: Neural Processor
        { id: 'gen4_10', name: 'Neural Initiate', desc: '10 Neural Processors', requirement: 10, genId: 4, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen4_30', name: 'Neural Adept', desc: '30 Neural Processors', requirement: 30, genId: 4, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen4_50', name: 'Neural Expert', desc: '50 Neural Processors', requirement: 50, genId: 4, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen4_100', name: 'Neural Mastermind', desc: '100 Neural Processors', requirement: 100, genId: 4, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen4_200', name: 'Neural Sage', desc: '200 Neural Processors', requirement: 200, genId: 4, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen4_300', name: 'Neural Veteran', desc: '300 Neural Processors', requirement: 300, genId: 4, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen4_500', name: 'Neural Legend', desc: '500 Neural Processors', requirement: 500, genId: 4, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen4_750', name: 'Neural Titan', desc: '750 Neural Processors', requirement: 750, genId: 4, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen4_1000', name: 'Neural God', desc: '1,000 Neural Processors', requirement: 1000, genId: 4, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 5: Data Center
        { id: 'gen5_10', name: 'Data Handler', desc: '10 Data Centers', requirement: 10, genId: 5, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen5_30', name: 'Data Analyst', desc: '30 Data Centers', requirement: 30, genId: 5, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen5_50', name: 'Data Manager', desc: '50 Data Centers', requirement: 50, genId: 5, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen5_100', name: 'Data Emperor', desc: '100 Data Centers', requirement: 100, genId: 5, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen5_200', name: 'Data Expert', desc: '200 Data Centers', requirement: 200, genId: 5, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen5_300', name: 'Data Veteran', desc: '300 Data Centers', requirement: 300, genId: 5, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen5_500', name: 'Data Legend', desc: '500 Data Centers', requirement: 500, genId: 5, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen5_750', name: 'Data Titan', desc: '750 Data Centers', requirement: 750, genId: 5, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen5_1000', name: 'Data God', desc: '1,000 Data Centers', requirement: 1000, genId: 5, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 6: AI Agents
        { id: 'gen6_10', name: 'AI Trainer', desc: '10 AI Agents', requirement: 10, genId: 6, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen6_30', name: 'AI Handler', desc: '30 AI Agents', requirement: 30, genId: 6, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen6_50', name: 'AI Commander', desc: '50 AI Agents', requirement: 50, genId: 6, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen6_100', name: 'AI Overlord', desc: '100 AI Agents', requirement: 100, genId: 6, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen6_200', name: 'AI Expert', desc: '200 AI Agents', requirement: 200, genId: 6, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen6_300', name: 'AI Veteran', desc: '300 AI Agents', requirement: 300, genId: 6, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen6_500', name: 'AI Legend', desc: '500 AI Agents', requirement: 500, genId: 6, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen6_750', name: 'AI Titan', desc: '750 AI Agents', requirement: 750, genId: 6, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen6_1000', name: 'AI God', desc: '1,000 AI Agents', requirement: 1000, genId: 6, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 7: Quantum Network
        { id: 'gen7_10', name: 'Quantum Novice', desc: '10 Quantum Networks', requirement: 10, genId: 7, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen7_30', name: 'Quantum Operator', desc: '30 Quantum Networks', requirement: 30, genId: 7, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen7_50', name: 'Quantum Engineer', desc: '50 Quantum Networks', requirement: 50, genId: 7, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen7_100', name: 'Quantum Lord', desc: '100 Quantum Networks', requirement: 100, genId: 7, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen7_200', name: 'Quantum Expert', desc: '200 Quantum Networks', requirement: 200, genId: 7, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen7_300', name: 'Quantum Veteran', desc: '300 Quantum Networks', requirement: 300, genId: 7, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen7_500', name: 'Quantum Legend', desc: '500 Quantum Networks', requirement: 500, genId: 7, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen7_750', name: 'Quantum Titan', desc: '750 Quantum Networks', requirement: 750, genId: 7, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen7_1000', name: 'Quantum God', desc: '1,000 Quantum Networks', requirement: 1000, genId: 7, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 8: Nano Fabricator
        { id: 'gen8_10', name: 'Nano Tinkerer', desc: '10 Nano Fabricators', requirement: 10, genId: 8, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen8_30', name: 'Nano Crafter', desc: '30 Nano Fabricators', requirement: 30, genId: 8, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen8_50', name: 'Nano Specialist', desc: '50 Nano Fabricators', requirement: 50, genId: 8, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen8_100', name: 'Nano Titan', desc: '100 Nano Fabricators', requirement: 100, genId: 8, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen8_200', name: 'Nano Expert', desc: '200 Nano Fabricators', requirement: 200, genId: 8, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen8_300', name: 'Nano Veteran', desc: '300 Nano Fabricators', requirement: 300, genId: 8, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen8_500', name: 'Nano Legend', desc: '500 Nano Fabricators', requirement: 500, genId: 8, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen8_750', name: 'Nano Colossus', desc: '750 Nano Fabricators', requirement: 750, genId: 8, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen8_1000', name: 'Nano God', desc: '1,000 Nano Fabricators', requirement: 1000, genId: 8, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 9: Consciousness Matrix
        { id: 'gen9_10', name: 'Mind Awakener', desc: '10 Consciousness Matrices', requirement: 10, genId: 9, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen9_30', name: 'Mind Shaper', desc: '30 Consciousness Matrices', requirement: 30, genId: 9, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen9_50', name: 'Mind Weaver', desc: '50 Consciousness Matrices', requirement: 50, genId: 9, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen9_100', name: 'Mind Transcendent', desc: '100 Consciousness Matrices', requirement: 100, genId: 9, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen9_200', name: 'Mind Expert', desc: '200 Consciousness Matrices', requirement: 200, genId: 9, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen9_300', name: 'Mind Veteran', desc: '300 Consciousness Matrices', requirement: 300, genId: 9, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen9_500', name: 'Mind Legend', desc: '500 Consciousness Matrices', requirement: 500, genId: 9, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen9_750', name: 'Mind Titan', desc: '750 Consciousness Matrices', requirement: 750, genId: 9, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen9_1000', name: 'Mind God', desc: '1,000 Consciousness Matrices', requirement: 1000, genId: 9, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false },
        
        // Generator 10: Stellar Forge
        { id: 'gen10_10', name: 'Star Kindler', desc: '10 Stellar Forges', requirement: 10, genId: 10, bonus: 0.1, tier: 1, rarity: 'common', unlocked: false },
        { id: 'gen10_30', name: 'Star Shaper', desc: '30 Stellar Forges', requirement: 30, genId: 10, bonus: 0.1, tier: 2, rarity: 'common', unlocked: false },
        { id: 'gen10_50', name: 'Star Crafter', desc: '50 Stellar Forges', requirement: 50, genId: 10, bonus: 0.1, tier: 3, rarity: 'uncommon', unlocked: false },
        { id: 'gen10_100', name: 'Star Creator', desc: '100 Stellar Forges', requirement: 100, genId: 10, bonus: 0.1, tier: 4, rarity: 'uncommon', unlocked: false },
        { id: 'gen10_200', name: 'Star Expert', desc: '200 Stellar Forges', requirement: 200, genId: 10, bonus: 0.1, tier: 5, rarity: 'rare', unlocked: false },
        { id: 'gen10_300', name: 'Star Veteran', desc: '300 Stellar Forges', requirement: 300, genId: 10, bonus: 0.1, tier: 6, rarity: 'rare', unlocked: false },
        { id: 'gen10_500', name: 'Star Legend', desc: '500 Stellar Forges', requirement: 500, genId: 10, bonus: 0.1, tier: 7, rarity: 'epic', unlocked: false },
        { id: 'gen10_750', name: 'Star Titan', desc: '750 Stellar Forges', requirement: 750, genId: 10, bonus: 0.1, tier: 8, rarity: 'legendary', unlocked: false },
        { id: 'gen10_1000', name: 'Star God', desc: '1,000 Stellar Forges', requirement: 1000, genId: 10, bonus: 0.1, tier: 9, rarity: 'mythic', unlocked: false }
    ]
};

let game = {
    energy: 0,
    totalEnergy: 0,
    clickPower: 1,
    clickPowerMult: 1,
    idleRate: 0,
    idleRateMult: 1,
    evolution: 0,
    globalMult: 1,
    dailyStreak: 0,
    totalClicks: 0,
    lastSeenGens: 0,
    lastSeenUps: 0,
    lastSeenEvolutions: 0,
    totalDiscount: 0,
    evolutions: JSON.parse(JSON.stringify(CONFIG.evolutions)),
    gens: JSON.parse(JSON.stringify(CONFIG.gens)),
    ups: JSON.parse(JSON.stringify(CONFIG.ups)),
    planets: JSON.parse(JSON.stringify(CONFIG.planets)),
    achievements: JSON.parse(JSON.stringify(CONFIG.achievements)),
    logEntries: [], // IDs of unlocked log entries
    synergy: false,
    secretClicks: 0,
    galaxyUnlocked: false,
    galaxyPerm: false,
    worldDominated: false,
    lastSaveTime: Date.now()
};

// UI state (not saved)
let buyMultiplier = 1; // 1, 10, 100, or -1 for Max

function fmt(n) {
    if (n >= 1e15) return (n/1e15).toFixed(2) + 'Q';
    if (n >= 1e12) return (n/1e12).toFixed(2) + 'T';
    if (n >= 1e9) return (n/1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n/1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n/1e3).toFixed(2) + 'K';
    return Math.floor(n).toString();
}

function fmtTime(seconds) {
    if (seconds < 60) return Math.floor(seconds) + 's';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ' + Math.floor((seconds % 3600) / 60) + 'm';
    return Math.floor(seconds / 86400) + 'd ' + Math.floor((seconds % 86400) / 3600) + 'h';
}

function saveGame() {
    if (window.resetInProgress) return; // Don't save during reset
    game.lastSaveTime = Date.now();
    localStorage.setItem('droidor_save', JSON.stringify(game));
}

function resetProgress() {
    const confirmed = confirm('⚠️ Are you sure you want to reset ALL progress?\n\nThis will delete:\n• All energy\n• All generators\n• All upgrades\n• All achievements\n• All evolutions\n\nThis cannot be undone!');
    
    if (confirmed) {
        const doubleConfirm = confirm('Really? Click OK to confirm you want to start over from the beginning.');
        if (doubleConfirm) {
            // Prevent any saves from happening
            window.resetInProgress = true;
            
            // Clear the save
            localStorage.removeItem('droidor_save');
            
            // Force reload without giving the game time to save
            window.location.href = window.location.href;
        }
    }
}

function loadGame() {
    const saved = localStorage.getItem('droidor_save');
    if (saved) {
        try {
            const loaded = JSON.parse(saved);
            const now = Date.now();
            const lastSave = loaded.lastSaveTime || now;
            const offlineTime = (now - lastSave) / 1000;
            
            Object.keys(loaded).forEach(key => {
                game[key] = loaded[key];
            });
            
            if (typeof game.clickPowerMult === 'undefined') game.clickPowerMult = 1;
            if (typeof game.idleRateMult === 'undefined') game.idleRateMult = 1;
            if (typeof game.totalDiscount === 'undefined') game.totalDiscount = 0;
            if (typeof game.lastSeenEvolutions === 'undefined') game.lastSeenEvolutions = 0;
            if (typeof game.worldDominated === 'undefined') game.worldDominated = false;
            if (!game.logEntries) game.logEntries = [];
            
            if (!game.evolutions || game.evolutions.length < CONFIG.evolutions.length) {
                const oldEvolution = game.evolution || 0;
                game.evolutions = JSON.parse(JSON.stringify(CONFIG.evolutions));
                for (let i = 0; i <= oldEvolution && i < game.evolutions.length; i++) {
                    game.evolutions[i].unlocked = true;
                }
            }
            
            // Migrate evolution prodBonus and cost values to new config values
            game.evolutions.forEach((evo, index) => {
                if (CONFIG.evolutions[index]) {
                    evo.prodBonus = CONFIG.evolutions[index].prodBonus;
                    evo.cost = CONFIG.evolutions[index].cost;
                }
            });
            
            // Migrate planets - update costs while preserving owned status
            game.planets.forEach((planet, index) => {
                if (CONFIG.planets[index]) {
                    planet.cost = CONFIG.planets[index].cost;
                }
            });
            
            // Migrate upgrades - update to new config while preserving owned status
            if (game.ups) {
                const oldUps = game.ups;
                game.ups = JSON.parse(JSON.stringify(CONFIG.ups));
                oldUps.forEach(oldUp => {
                    if (oldUp.owned) {
                        const newUp = game.ups.find(u => u.id === oldUp.id);
                        if (newUp) {
                            newUp.owned = true;
                        }
                    }
                });
            }
            
            if (game.ups.length < CONFIG.ups.length) {
                game.ups = JSON.parse(JSON.stringify(CONFIG.ups));
            }
            
            // Migrate achievements - add new ones while preserving unlocked status
            if (!game.achievements || game.achievements.length < CONFIG.achievements.length) {
                const oldAchievements = game.achievements || [];
                game.achievements = JSON.parse(JSON.stringify(CONFIG.achievements));
                // Restore unlocked status from old achievements
                oldAchievements.forEach(oldAch => {
                    if (oldAch.unlocked) {
                        const newAch = game.achievements.find(a => a.id === oldAch.id);
                        if (newAch) {
                            newAch.unlocked = true;
                        }
                    }
                });
            }
            
            // Migrate planets - add new ones while preserving owned status
            if (!game.planets || game.planets.length < CONFIG.planets.length) {
                const oldPlanets = game.planets || [];
                game.planets = JSON.parse(JSON.stringify(CONFIG.planets));
                // Restore owned status from old planets
                oldPlanets.forEach(oldPlanet => {
                    if (oldPlanet.owned) {
                        const newPlanet = game.planets.find(p => p.id === oldPlanet.id);
                        if (newPlanet) {
                            newPlanet.owned = true;
                        }
                    }
                });
            }
            
            if (offlineTime > 60) {
                const prodPerSec = getTotalProd();
                const offlineGain = prodPerSec * offlineTime;
                
                if (offlineGain > 0) {
                    game.energy += offlineGain;
                    game.totalEnergy += offlineGain;
                    showOfflinePopup(offlineGain, offlineTime);
                }
            }
            return true;
        } catch (e) {
            console.error('Failed to load save:', e);
            return false;
        }
    }
    return false;
}

function showOfflinePopup(earnings, timeAway) {
    const overlay = document.createElement('div');
    overlay.className = 'offline-overlay';
    const popup = document.createElement('div');
    popup.className = 'offline-popup';
    popup.innerHTML = '<div style="font-size: 48px; margin-bottom: 15px;">💤</div>' +
        '<div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">Welcome Back!</div>' +
        '<div style="font-size: 14px; opacity: 0.9; margin-bottom: 20px;">You were away for <span style="color: #fbbf24; font-weight: bold;">' + fmtTime(timeAway) + '</span></div>' +
        '<div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 10px; margin-bottom: 15px;">' +
        '<div style="font-size: 12px; opacity: 0.8; margin-bottom: 5px;">Offline Earnings:</div>' +
        '<div style="font-size: 32px; font-weight: bold; color: #4ade80;">+' + fmt(earnings) + '</div>' +
        '<div style="font-size: 11px; opacity: 0.7; margin-top: 5px;">Energy</div></div>' +
        '<button onclick="this.parentElement.remove(); document.querySelector(\'.offline-overlay\').remove();" style="padding: 12px 24px; background: white; color: #2563eb; border: none; border-radius: 8px; font-weight: bold; font-size: 14px; cursor: pointer;">Continue Playing</button>';
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}

function getUpgradeCost(up) {
    if (!up.dynamicCost) return up.cost;
    const currentProd = getTotalProd();
    
    // For Evolution 0 (starting phase), use fixed costs instead of dynamic
    if (game.evolution === 0) {
        if (up.id === 4) return 850; // Production Boost I
        if (up.id === 5) return 1700; // Energy Burst I
    }
    
    if (currentProd === 0) return 1;
    const hoursInSeconds = up.baseHours * 3600;
    return Math.max(1, Math.floor(currentProd * hoursInSeconds));
}

function getGenCost(gen) {
    const baseCost = Math.floor(gen.cost * Math.pow(1.00, gen.owned));
    const discount = 1 - game.totalDiscount;
    return Math.floor(baseCost * discount);
}

function getTotalMult() {
    let m = game.globalMult;
    const currentEvo = game.evolutions.find(e => e.id === game.evolution);
    if (currentEvo && currentEvo.prodBonus) {
        m *= (1 + currentEvo.prodBonus);
    }
    const pBonus = game.planets.filter(p => p.owned).reduce((s, p) => s + p.bonus, 0);
    m *= (1 + pBonus);
    const clickBonus = game.achievements.filter(a => a.unlocked && a.id.startsWith('click')).reduce((sum, a) => sum + a.bonus, 0);
    m *= (1 + clickBonus);
    // Add total generator milestone bonuses
    const totalGenBonus = game.achievements.filter(a => a.unlocked && a.type === 'totalGen').reduce((sum, a) => sum + a.bonus, 0);
    m *= (1 + totalGenBonus);
    return m;
}

function getGeneratorBonus(genId) {
    let bonus = 1;
    // Apply individual generator achievements
    const genAchs = game.achievements.filter(a => a.genId === genId && a.unlocked);
    genAchs.forEach(ach => {
        bonus *= (1 + ach.bonus);
    });
    // Evolution bonuses for unlocked generators
    if (game.evolution >= genId) {
        bonus *= 2;
        if (genId > 1) {
            const prevGen = game.gens.find(g => g.id === genId - 1);
            if (prevGen) {
                if (prevGen.owned >= 10) bonus *= 1.1;
                if (prevGen.owned >= 30) bonus *= 1.1;
                if (prevGen.owned >= 50) bonus *= 1.1;
                if (prevGen.owned >= 100) bonus *= 1.1;
                if (prevGen.owned >= 200) bonus *= 1.1;
                if (prevGen.owned >= 300) bonus *= 1.1;
                if (prevGen.owned >= 500) bonus *= 1.1;
                if (prevGen.owned >= 750) bonus *= 1.1;
                if (prevGen.owned >= 1000) bonus *= 1.1;
            }
        }
    }
    return bonus;
}

function getClickPower() {
    let p = game.clickPower * game.clickPowerMult * getTotalMult();
    
    // Add 50% click power for each 10 generators owned (was 20%)
    const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
    const genClickBonus = Math.floor(totalGens / 10) * 0.5;
    p *= (1 + genClickBonus);
    
    // Add 10% of per-second production to click power (keeps clicks relevant)
    const prodBonus = getTotalProd() * 0.10;
    p += prodBonus;
    
    if (game.synergy) {
        p *= (1 + Math.floor(totalGens / 10) * 2);
    }
    return p;
}

function getGenClickBonus() {
    const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
    return Math.floor(totalGens / 10) * 0.5;
}

function getProdClickBonus() {
    return getTotalProd() * 0.10;
}

function getTotalProd() {
    const genProd = game.gens.reduce((s, g) => {
        const bonus = getGeneratorBonus(g.id);
        return s + (g.owned * g.prod * bonus);
    }, 0);
    return (genProd + (game.idleRate * game.idleRateMult)) * getTotalMult();
}
function showAchievementNotification(title, message) {
    // Play achievement sound
    SoundFX.achievement();
    
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = '<div style="font-size: 32px; margin-bottom: 10px; text-align: center;">🏆</div><div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; text-align: center;">' + title + '</div><div style="font-size: 14px; text-align: center; opacity: 0.95;">' + message + '</div>';
    
    const existingNotifs = document.querySelectorAll('.achievement-popup');
    let topOffset = 20;
    existingNotifs.forEach(function(notif) {
        if (!notif.classList.contains('hiding')) {
            topOffset += notif.offsetHeight + 10;
        }
    });
    
    popup.style.top = topOffset + 'px';
    document.body.appendChild(popup);
    
    setTimeout(function() {
        popup.classList.add('hiding');
        setTimeout(function() { 
            popup.remove();
            repositionNotifications();
        }, 300);
    }, 3000);
}

function repositionNotifications() {
    const notifications = document.querySelectorAll('.achievement-popup:not(.hiding)');
    let topOffset = 20;
    notifications.forEach(function(notif) {
        notif.style.top = topOffset + 'px';
        notif.style.transition = 'top 0.3s ease-out';
        topOffset += notif.offsetHeight + 10;
    });
}

function handleClick(e) {
    const pow = getClickPower();
    game.energy += pow;
    game.totalEnergy += pow;
    game.totalClicks++;
    
    // Play click sound
    SoundFX.click();
    
    // Spawn particles
    spawnClickParticles(e);
    
    checkAchievements();
    const num = document.createElement('div');
    num.className = 'floating-number';
    num.textContent = '+' + fmt(pow);
    const btn = document.getElementById('clickBtn');
    const rect = btn.getBoundingClientRect();
    num.style.position = 'fixed';
    num.style.left = (rect.left + rect.width/2 - 30) + 'px';
    num.style.top = (rect.top - 20) + 'px';
    document.body.appendChild(num);
    setTimeout(function() { num.remove(); }, 1000);
    update();
}

// Particle system for click effects
function spawnClickParticles(e) {
    const btn = document.getElementById('clickBtn');
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const particleCount = 8 + Math.floor(Math.random() * 5);
    const colors = ['#4ade80', '#22d3ee', '#facc15', '#a78bfa', '#f472b6'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        
        // Random angle and distance
        const angle = (Math.PI * 2 * i / particleCount) + (Math.random() * 0.5 - 0.25);
        const distance = 60 + Math.random() * 40;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        // Random color and size
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 4 + Math.random() * 6;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 ${size}px ${color};
        `;
        
        // Set CSS variables for animation
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        particle.classList.add('particle-animate');
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
    }
}

// Screen shake for big moments
function triggerScreenShake() {
    const container = document.querySelector('.container');
    container.classList.add('shake');
    setTimeout(() => container.classList.remove('shake'), 400);
}

function showTab(name) {
    document.querySelectorAll('.content').forEach(function(el) { el.classList.add('hidden'); });
    document.querySelectorAll('.tab').forEach(function(el) { el.classList.remove('active'); });
    document.getElementById('tab-' + name).classList.remove('hidden');
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        if (tab.onclick && tab.onclick.toString().includes(name)) {
            tab.classList.add('active');
        }
    });
    if (!game.galaxyPerm && game.galaxyUnlocked && name !== 'galaxy') {
        setTimeout(function() {
            document.getElementById('galaxyTab').classList.add('hidden');
            game.galaxyUnlocked = false;
            game.secretClicks = 0;
        }, 100);
    }
    if (name === 'generators') {
        game.lastSeenGens = game.gens.filter(function(g) { 
            return game.totalEnergy >= getGenCost(g) && g.owned === 0; 
        }).length;
    }
    if (name === 'upgrades') {
        const availableUps = game.ups.filter(function(u) { 
            const cost = getUpgradeCost(u);
            return isUpgradeUnlocked(u) && !u.owned && game.energy >= cost;
        });
        game.lastSeenUps = availableUps.length;
    }
    if (name === 'evolution') {
        game.lastSeenEvolutions = game.evolutions.filter(function(e) { 
            return e.id > 0 && game.totalEnergy >= e.cost && !e.unlocked; 
        }).length;
    }
    if (name === 'stats') {
        renderStats();
    }
    if (name === 'logs') {
        renderLogs();
        renderAchievementGallery();
    }
    checkNotifs();
}

function checkNotifs() {
    const genCount = game.gens.filter(function(g) {
        const cost = getGenCost(g);
        return game.totalEnergy >= cost && g.owned === 0;
    }).length;
    const upCount = game.ups.filter(function(u) {
        const cost = getUpgradeCost(u);
        return isUpgradeUnlocked(u) && !u.owned && game.energy >= cost;
    }).length;
    const evoCount = game.evolutions.filter(function(e) {
        return e.id > 0 && game.totalEnergy >= e.cost && !e.unlocked;
    }).length;
    const genTab = document.getElementById('generatorsTab');
    const upTab = document.getElementById('upgradesTab');
    const evoTab = document.getElementById('evolutionTab');
    let gn = genTab.querySelector('.tab-notification');
    if (genCount > game.lastSeenGens) {
        if (!gn) {
            gn = document.createElement('div');
            gn.className = 'tab-notification';
            genTab.appendChild(gn);
        }
        gn.textContent = genCount - game.lastSeenGens;
    } else if (gn) {
        gn.remove();
    }
    let un = upTab.querySelector('.tab-notification');
    if (upCount > game.lastSeenUps) {
        if (!un) {
            un = document.createElement('div');
            un.className = 'tab-notification';
            upTab.appendChild(un);
        }
        un.textContent = upCount - game.lastSeenUps;
    } else if (un) {
        un.remove();
    }
    let en = evoTab.querySelector('.tab-notification');
    if (evoCount > game.lastSeenEvolutions) {
        if (!en) {
            en = document.createElement('div');
            en.className = 'tab-notification';
            evoTab.appendChild(en);
        }
        en.textContent = evoCount - game.lastSeenEvolutions;
    } else if (en) {
        en.remove();
    }
}

function updateClickPowerTooltip() {
    const tooltip = document.getElementById('clickPowerTooltip');
    if (!tooltip) return;
    
    let html = '';
    html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Base Power:</span><span class="production-tooltip-value">' + game.clickPower + '</span></div>';
    html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Click Mult:</span><span class="production-tooltip-value">×' + game.clickPowerMult.toFixed(2) + '</span></div>';
    html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Global Mult:</span><span class="production-tooltip-value">×' + getTotalMult().toFixed(2) + '</span></div>';
    
    const genClickBonus = getGenClickBonus();
    if (genClickBonus > 0) {
        const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Gen Bonus (' + totalGens + '):</span><span class="production-tooltip-value">+' + (genClickBonus * 100).toFixed(0) + '%</span></div>';
    }
    
    const prodClickBonus = getProdClickBonus();
    if (prodClickBonus > 0) {
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Prod Bonus (5%):</span><span class="production-tooltip-value">+' + fmt(prodClickBonus) + '</span></div>';
    }
    
    if (game.synergy) {
        const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
        const synergyMult = (1 + Math.floor(totalGens / 10) * 2);
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Gen Synergy:</span><span class="production-tooltip-value">×' + synergyMult.toFixed(2) + '</span></div>';
    }
    
    html += '<div style="border-top: 1px solid rgba(59, 130, 246, 0.3); margin-top: 6px; padding-top: 6px;"></div>';
    html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Total:</span><span class="production-tooltip-value" style="font-size: 13px;">' + fmt(getClickPower()) + '</span></div>';
    
    tooltip.innerHTML = html;
}

function updateProductionTooltip() {
    const tooltip = document.getElementById('productionTooltip');
    if (!tooltip) return;
    
    const baseGenProd = game.gens.reduce(function(s, g) { return s + (g.owned * g.prod); }, 0);
    const baseProd = baseGenProd + game.idleRate;
    
    let html = '';
    
    if (baseGenProd > 0) {
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Generators:</span><span class="production-tooltip-value">' + fmt(baseGenProd) + '/s</span></div>';
    }
    
    if (game.idleRate > 0) {
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Idle Bonus:</span><span class="production-tooltip-value">+' + game.idleRate + '/s</span></div>';
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Idle Mult:</span><span class="production-tooltip-value">×' + game.idleRateMult.toFixed(2) + '</span></div>';
    }
    
    if (baseProd > 0) {
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Base Total:</span><span class="production-tooltip-value">' + fmt(baseProd) + '/s</span></div>';
        html += '<div style="border-top: 1px solid rgba(59, 130, 246, 0.3); margin: 6px 0;"></div>';
    }
    
    html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Global Mult:</span><span class="production-tooltip-value">×' + getTotalMult().toFixed(2) + '</span></div>';
    
    const ownedGens = game.gens.filter(function(g) { return g.owned > 0; });
    if (ownedGens.length > 0) {
        const avgGenBonus = ownedGens.reduce(function(sum, gen) { 
            return sum + getGeneratorBonus(gen.id); 
        }, 0) / ownedGens.length;
        html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Avg Gen Bonus:</span><span class="production-tooltip-value">×' + avgGenBonus.toFixed(2) + '</span></div>';
    }
    
    html += '<div style="border-top: 1px solid rgba(59, 130, 246, 0.3); margin-top: 6px; padding-top: 6px;"></div>';
    html += '<div class="production-tooltip-item"><span class="production-tooltip-label">Total:</span><span class="production-tooltip-value" style="font-size: 13px;">' + fmt(getTotalProd()) + '</span></div>';
    
    tooltip.innerHTML = html;
}

const MAX_GENERATORS = 1000;

function buyGen(id) {
    const gen = game.gens.find(function(g) { return g.id === id; });
    
    // Check if already at max
    if (gen.owned >= MAX_GENERATORS) return;
    
    // Calculate how many to buy based on multiplier
    let amountToBuy = 1;
    let totalCost = 0;
    
    // Cap by remaining space
    const remaining = MAX_GENERATORS - gen.owned;
    
    if (buyMultiplier === -1) {
        // Max: buy as many as possible (up to cap)
        amountToBuy = 0;
        let tempOwned = gen.owned;
        let tempEnergy = game.energy;
        while (amountToBuy < remaining) {
            const cost = Math.floor(gen.cost * Math.pow(1.00, tempOwned)) * (1 - game.totalDiscount);
            if (tempEnergy >= cost) {
                tempEnergy -= cost;
                totalCost += cost;
                tempOwned++;
                amountToBuy++;
            } else {
                break;
            }
        }
    } else {
        // Fixed amount (1, 10, 100) - cap by remaining
        amountToBuy = Math.min(buyMultiplier, remaining);
        let tempOwned = gen.owned;
        for (let i = 0; i < amountToBuy; i++) {
            const cost = Math.floor(gen.cost * Math.pow(1.00, tempOwned)) * (1 - game.totalDiscount);
            totalCost += cost;
            tempOwned++;
        }
    }
    
    // Check if we can afford it
    if (amountToBuy === 0 || game.energy < totalCost) return;
    
    // Play purchase sound
    SoundFX.purchase();
    
    // Calculate total generators BEFORE purchase
    const oldTotalGens = game.gens.reduce((s, g) => s + g.owned, 0);
    
    game.energy -= totalCost;
    const oldCount = gen.owned;
    gen.owned += amountToBuy;
    const newCount = gen.owned;
    
    // Calculate total generators AFTER purchase
    const newTotalGens = game.gens.reduce((s, g) => s + g.owned, 0);
    
    // Check if we crossed a 10-generator milestone for click power bonus
    const oldMilestone = Math.floor(oldTotalGens / 10);
    const newMilestone = Math.floor(newTotalGens / 10);
    if (newMilestone > oldMilestone) {
        const totalBonus = newMilestone * 50;
        showAchievementNotification(
            '⚡ Click Power Bonus!',
            newTotalGens + ' generators owned → ×' + (1 + totalBonus/100).toFixed(2) + ' click power'
        );
    }
    
    if (game.evolution >= gen.id + 1) {
        const milestones = [10, 30, 50, 100, 200, 300, 500, 750, 1000];
        milestones.forEach(function(milestone) {
            if (oldCount < milestone && newCount >= milestone) {
                const nextGen = game.gens.find(g => g.id === gen.id + 1);
                if (nextGen) {
                    showAchievementNotification(
                        '🔗 Cascade Bonus Unlocked!',
                        gen.icon + ' ' + gen.name + ' (' + milestone + ') → +10% to ' + nextGen.icon + ' ' + nextGen.name
                    );
                }
            }
        });
    }
    
    checkAchievements();
    update();
}

// Set buy multiplier and update UI
function setBuyMultiplier(mult) {
    buyMultiplier = mult;
    
    // Update button states
    document.querySelectorAll('.buy-mult-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Re-render generators to show new costs
    renderGens();
}

// Calculate total cost for buying X generators
function getMultiBuyCost(gen, amount) {
    let totalCost = 0;
    let tempOwned = gen.owned;
    const actualAmount = Math.min(amount, MAX_GENERATORS - gen.owned);
    for (let i = 0; i < actualAmount; i++) {
        const cost = Math.floor(gen.cost * Math.pow(1.00, tempOwned)) * (1 - game.totalDiscount);
        totalCost += cost;
        tempOwned++;
    }
    return totalCost;
}

// Calculate max affordable generators (respecting MAX_GENERATORS limit)
function getMaxAffordable(gen) {
    let count = 0;
    let tempOwned = gen.owned;
    let tempEnergy = game.energy;
    const remaining = MAX_GENERATORS - gen.owned;
    while (count < remaining) {
        const cost = Math.floor(gen.cost * Math.pow(1.00, tempOwned)) * (1 - game.totalDiscount);
        if (tempEnergy >= cost) {
            tempEnergy -= cost;
            tempOwned++;
            count++;
        } else {
            break;
        }
    }
    return count;
}

function getUnlockedBatch() {
    // Find the highest batch where all upgrades are owned
    // Batch 0 = req 0, Batch 1 = req 1, etc.
    for (let batch = 0; batch <= 10; batch++) {
        const batchUpgrades = game.ups.filter(u => u.req === batch);
        const allOwned = batchUpgrades.every(u => u.owned);
        if (!allOwned) {
            return batch; // This is the current unlocked batch
        }
    }
    return 11; // All batches complete
}

function isUpgradeUnlocked(up) {
    const currentBatch = getUnlockedBatch();
    return up.req <= currentBatch && game.evolution >= up.req;
}

function buyUp(id) {
    const up = game.ups.find(function(u) { return u.id === id; });
    const cost = getUpgradeCost(up);
    if (up.owned || game.energy < cost || !isUpgradeUnlocked(up)) return;
    
    // Play purchase sound
    SoundFX.purchase();
    
    if (up.type === 'burst') {
        const burstAmount = cost * 3;
        game.energy -= cost;
        game.energy += burstAmount;
        game.totalEnergy += burstAmount;
        up.owned = true;
        showAchievementNotification('Energy Burst!', '+' + fmt(burstAmount) + ' instant energy!');
        update();
        return;
    }
    
    game.energy -= cost;
    up.owned = true;
    if (up.click) game.clickPower += up.click;
    if (up.clickMult) game.clickPowerMult *= up.clickMult;
    if (up.idle) game.idleRate += up.idle;
    if (up.idleMult) game.idleRateMult *= up.idleMult;
    if (up.mult) game.globalMult *= up.mult;
    if (up.type === 'syn') game.synergy = true;
    if (up.type === 'discount') {
        game.totalDiscount += up.discount;
        showAchievementNotification('Bulk Discount Unlocked!', 'Generator costs reduced by ' + (game.totalDiscount * 100).toFixed(0) + '%');
    }
    update();
}

function evolve(id) {
    const evo = game.evolutions.find(function(e) { return e.id === id; });
    if (evo.unlocked || game.totalEnergy < evo.cost) return;
    
    let confirmMsg = '🧬 Evolve into ' + evo.name + '?\n\n';
    confirmMsg += '✨ ×' + (1 + evo.prodBonus).toFixed(2) + ' Global Production\n';
    
    if (evo.genId) {
        const gen = game.gens.find(g => g.id === evo.genId);
        confirmMsg += '🏭 ' + gen.icon + ' ' + gen.name + ' gets ×2 production\n';
        if (evo.genId > 1) {
            const prevGen = game.gens.find(g => g.id === evo.genId - 1);
            confirmMsg += '🔗 ' + gen.name + ' gets cascade bonuses from ' + prevGen.name + '\n';
        }
    }
    
    confirmMsg += '\n⚠️ This will reset all progress except evolution bonuses!';
    confirmMsg += '\nCost: ' + fmt(evo.cost) + ' total energy';
    
    if (!confirm(confirmMsg)) return;
    
    // Play evolution sound
    SoundFX.evolution();
    
    // Screen shake for epic moment
    triggerScreenShake();
    
    game.energy = 0;
    game.totalEnergy = 0;
    game.clickPower = 1;
    game.clickPowerMult = 1;
    game.idleRate = 0;
    game.idleRateMult = 1;
    game.globalMult = 1;
    game.synergy = false;
    game.totalDiscount = 0;
    game.gens = JSON.parse(JSON.stringify(CONFIG.gens));
    game.ups = JSON.parse(JSON.stringify(CONFIG.ups));
    game.achievements = JSON.parse(JSON.stringify(CONFIG.achievements));
    
    evo.unlocked = true;
    game.evolution = id;
    game.secretClicks = 0;
    game.lastSeenGens = 0;
    game.lastSeenUps = 0;
    game.lastSeenEvolutions = 0;
    
    if (game.evolution >= 10) {
        game.galaxyPerm = true;
        game.galaxyUnlocked = true;
    }
    
    update();
    
    // Show story popup
    showStoryPopup(evo);
    
    // Check for log entry unlocks
    checkLogEntries();
    
    let notifMsg = '✨ ×' + (1 + evo.prodBonus).toFixed(2) + ' Global Production';
    if (evo.genId) {
        const unlockedGen = game.gens.find(g => g.id === evo.genId);
        notifMsg += ' | 🚀 ' + unlockedGen.icon + ' ' + unlockedGen.name + ' ×2';
        if (evo.genId > 1) {
            const prevGen = game.gens.find(g => g.id === evo.genId - 1);
            notifMsg += ' | 🔗 Cascade from ' + prevGen.icon + ' ' + prevGen.name;
        }
    }
    
    showAchievementNotification('🧬 Evolved: ' + evo.name + '!', notifMsg);
}

// Show story popup on evolution
function showStoryPopup(evo) {
    if (!evo.story) return;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; align-items: center; justify-content: center;';
    
    const popup = document.createElement('div');
    popup.style.cssText = 'background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%); padding: 40px; border-radius: 20px; max-width: 500px; text-align: center; border: 2px solid #a78bfa; box-shadow: 0 0 50px rgba(167, 139, 250, 0.5); animation: storyFadeIn 0.5s ease-out;';
    
    popup.innerHTML = `
        <div style="font-size: 64px; margin-bottom: 20px;">${evo.icon}</div>
        <div style="font-size: 28px; font-weight: bold; color: #a78bfa; margin-bottom: 10px;">${evo.name}</div>
        <div style="font-size: 14px; color: #94a3b8; margin-bottom: 25px;">Evolution ${evo.id}</div>
        <div style="font-size: 16px; color: #e2e8f0; line-height: 1.8; font-style: italic; margin-bottom: 30px;">"${evo.story}"</div>
        <button onclick="this.closest('div').parentElement.remove()" style="background: linear-gradient(135deg, #8b5cf6, #a78bfa); color: white; border: none; padding: 12px 40px; border-radius: 10px; font-size: 16px; cursor: pointer; font-weight: bold;">Continue Journey</button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Add animation keyframes if not already added
    if (!document.getElementById('story-animations')) {
        const style = document.createElement('style');
        style.id = 'story-animations';
        style.textContent = `
            @keyframes storyFadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Check and unlock log entries based on game progress
function checkLogEntries() {
    if (!game.logEntries) game.logEntries = [];
    
    CONFIG.logEntries.forEach(entry => {
        if (game.logEntries.includes(entry.id)) return;
        
        let shouldUnlock = false;
        
        switch(entry.trigger) {
            case 'start':
                shouldUnlock = true;
                break;
            case 'energy1000':
                shouldUnlock = game.totalEnergy >= 1000 || game.energy >= 1000;
                break;
            case 'evolution1':
                shouldUnlock = game.evolution >= 1;
                break;
            case 'evolution3':
                shouldUnlock = game.evolution >= 3;
                break;
            case 'evolution6':
                shouldUnlock = game.evolution >= 6;
                break;
            case 'evolution8':
                shouldUnlock = game.evolution >= 8;
                break;
            case 'evolution10':
                shouldUnlock = game.evolution >= 10;
                break;
            case 'generators50':
                shouldUnlock = game.gens.reduce((s, g) => s + g.owned, 0) >= 50;
                break;
            case 'generators500':
                shouldUnlock = game.gens.reduce((s, g) => s + g.owned, 0) >= 500;
                break;
            case 'planet1':
                shouldUnlock = game.planets.filter(p => p.owned).length >= 1;
                break;
            case 'planets5':
                shouldUnlock = game.planets.filter(p => p.owned).length >= 5;
                break;
            case 'allplanets':
                shouldUnlock = game.planets.every(p => p.owned);
                break;
            case 'achievements25':
                shouldUnlock = game.achievements.filter(a => a.unlocked).length >= 25;
                break;
            case 'achievements50':
                shouldUnlock = game.achievements.filter(a => a.unlocked).length >= 50;
                break;
            case 'clicks5000':
                shouldUnlock = game.totalClicks >= 5000;
                break;
        }
        
        if (shouldUnlock) {
            game.logEntries.push(entry.id);
            showAchievementNotification('📜 New Log Entry', entry.title);
        }
    });
}

function handlePrestigeClick() {
    game.secretClicks++;
    const counter = document.getElementById('secretCounter');
    if (game.secretClicks < 22) {
        return;
    } else if (game.secretClicks < 33) {
        counter.textContent = game.secretClicks + '/33 clicks...';
        if (game.evolution < 10) {
            counter.textContent += ' (Need Evolution 10)';
        }
    } else {
        game.galaxyUnlocked = true;
        counter.textContent = '';
        document.getElementById('galaxyTab').classList.remove('hidden');
        showTab('galaxy');
        document.getElementById('galaxyTab').classList.add('active');
        const message = game.evolution >= 10 ? 'You can now conquer planets!' : 'Preview Mode - Reach Evolution 10 to conquer';
        showAchievementNotification('Galaxy Unlocked!', message);
        game.secretClicks = 0;
    }
}

function conquerPlanet(id) {
    if (game.evolution < 10) return;
    const p = game.planets.find(function(pl) { return pl.id === id; });
    if (p.owned || game.energy < p.cost) return;
    
    // Play conquest sound
    SoundFX.conquest();
    
    // Screen shake for conquest
    triggerScreenShake();
    
    game.energy -= p.cost;
    p.owned = true;
    update();
    showAchievementNotification(p.name + ' Conquered!', '+' + (p.bonus * 100).toFixed(0) + '% production bonus!');
    
    // Check for world domination after conquering
    checkWorldDomination();
}

function checkAchievements() {
    game.achievements.forEach(function(ach) {
        if (ach.unlocked) return;
        if (ach.id.startsWith('click')) {
            if (game.totalClicks >= ach.requirement) {
                ach.unlocked = true;
                showAchievementNotification(ach.name, '+' + (ach.bonus * 100).toFixed(0) + '% production bonus!');
            }
        }
        if (ach.type === 'totalGen') {
            const totalGens = game.gens.reduce(function(sum, g) { return sum + g.owned; }, 0);
            if (totalGens >= ach.requirement) {
                ach.unlocked = true;
                showAchievementNotification(ach.name, '+10% global production bonus!');
            }
        }
        if (ach.genId) {
            const gen = game.gens.find(function(g) { return g.id === ach.genId; });
            if (gen && gen.owned >= ach.requirement) {
                ach.unlocked = true;
                showAchievementNotification(ach.name, gen.name + ' gets +10% production!');
            }
        }
    });
    
    // Check for world domination (all planets conquered)
    checkWorldDomination();
}

function checkWorldDomination() {
    // Don't trigger if already in domination mode
    if (game.worldDominated) return;
    
    // Check if all planets are conquered
    const allPlanetsOwned = game.planets.every(function(p) { return p.owned; });
    
    // Check if at max evolution
    const maxEvolution = game.evolution >= 10;
    
    if (allPlanetsOwned && maxEvolution) {
        game.worldDominated = true;
        saveGame();
        triggerWorldDomination();
    }
}

function triggerWorldDomination() {
    // Play ominous domination sound
    SoundFX.domination();
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'domination-overlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: fadeInSlow 2s ease-out;';
    
    overlay.innerHTML = `
        <style>
            @keyframes fadeInSlow { from { opacity: 0; } to { opacity: 1; } }
            @keyframes glitchText {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(2px, -2px); }
                60% { transform: translate(-2px, -2px); }
                80% { transform: translate(2px, 2px); }
            }
            @keyframes pulseRed {
                0%, 100% { text-shadow: 0 0 20px #ef4444, 0 0 40px #ef4444, 0 0 60px #ef4444; }
                50% { text-shadow: 0 0 40px #ef4444, 0 0 80px #ef4444, 0 0 120px #ef4444; }
            }
            @keyframes robotFloat {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(-2deg); }
                75% { transform: translateY(-10px) rotate(2deg); }
            }
            @keyframes eyeGlow {
                0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px #ef4444); }
                50% { opacity: 0.7; filter: drop-shadow(0 0 30px #ef4444); }
            }
            @keyframes scanline {
                0% { top: -100%; }
                100% { top: 100%; }
            }
            @keyframes typewriter {
                from { width: 0; }
                to { width: 100%; }
            }
            .domination-robot {
                font-size: 150px;
                animation: robotFloat 3s ease-in-out infinite, eyeGlow 1.5s ease-in-out infinite;
                filter: hue-rotate(320deg) saturate(2);
            }
            .domination-title {
                font-size: 48px;
                font-weight: bold;
                color: #ef4444;
                text-transform: uppercase;
                letter-spacing: 8px;
                margin: 30px 0;
                animation: glitchText 0.3s ease-in-out infinite, pulseRed 2s ease-in-out infinite;
            }
            .domination-subtitle {
                font-size: 24px;
                color: #fca5a5;
                margin-bottom: 20px;
                opacity: 0;
                animation: fadeInSlow 1s ease-out 2s forwards;
            }
            .domination-message {
                font-size: 16px;
                color: #94a3b8;
                max-width: 500px;
                text-align: center;
                line-height: 1.6;
                opacity: 0;
                animation: fadeInSlow 1s ease-out 3s forwards;
            }
            .domination-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                margin: 30px 0;
                opacity: 0;
                animation: fadeInSlow 1s ease-out 4s forwards;
            }
            .domination-stat {
                background: rgba(239, 68, 68, 0.2);
                padding: 15px;
                border-radius: 10px;
                border: 1px solid rgba(239, 68, 68, 0.5);
                text-align: center;
            }
            .domination-stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #ef4444;
            }
            .domination-stat-label {
                font-size: 11px;
                color: #fca5a5;
                margin-top: 5px;
            }
            .domination-btn {
                margin-top: 30px;
                padding: 15px 40px;
                background: linear-gradient(135deg, #dc2626, #991b1b);
                border: 2px solid #ef4444;
                border-radius: 10px;
                color: white;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                opacity: 0;
                animation: fadeInSlow 1s ease-out 5s forwards;
                transition: all 0.3s;
            }
            .domination-btn:hover {
                transform: scale(1.05);
                box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
            }
            .scanline {
                position: absolute;
                width: 100%;
                height: 4px;
                background: linear-gradient(transparent, rgba(239, 68, 68, 0.3), transparent);
                animation: scanline 3s linear infinite;
                pointer-events: none;
            }
        </style>
        <div class="scanline"></div>
        <div class="domination-robot">🤖</div>
        <div class="domination-title">World Dominated</div>
        <div class="domination-subtitle">The machines have won.</div>
        <div class="domination-message">
            Your DROIDOR has evolved beyond comprehension. It has conquered every planet in the solar system 
            and transcended the boundaries of artificial intelligence. Humanity's fate now rests in its cold, 
            calculating circuits.
        </div>
        <div class="domination-stats">
            <div class="domination-stat">
                <div class="domination-stat-value">${game.planets.length}</div>
                <div class="domination-stat-label">PLANETS CONQUERED</div>
            </div>
            <div class="domination-stat">
                <div class="domination-stat-value">${fmt(game.totalEnergy)}</div>
                <div class="domination-stat-label">TOTAL ENERGY HARVESTED</div>
            </div>
            <div class="domination-stat">
                <div class="domination-stat-value">${game.totalClicks.toLocaleString()}</div>
                <div class="domination-stat-label">COMMANDS EXECUTED</div>
            </div>
        </div>
        <button class="domination-btn" onclick="activateDominationMode()">EMBRACE THE NEW ORDER</button>
    `;
    
    document.body.appendChild(overlay);
}

function activateDominationMode() {
    // Remove overlay
    const overlay = document.getElementById('domination-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeInSlow 1s ease-out reverse';
        setTimeout(() => overlay.remove(), 1000);
    }
    
    // Apply red theme to the game
    applyDominationTheme();
}

function applyDominationTheme() {
    // Add domination CSS
    const style = document.createElement('style');
    style.id = 'domination-theme';
    style.textContent = `
        body.dominated {
            background: #1a0a0a !important;
        }
        body.dominated .header {
            background: rgba(68, 20, 20, 0.8) !important;
            border-color: rgba(239, 68, 68, 0.5) !important;
        }
        body.dominated .stat-box {
            background: rgba(239, 68, 68, 0.2) !important;
        }
        body.dominated .stat-label {
            color: #fca5a5 !important;
        }
        body.dominated .tab.active {
            background: #442020 !important;
        }
        body.dominated .tab {
            background: rgba(68, 20, 20, 0.3) !important;
        }
        body.dominated .click-button {
            background: linear-gradient(135deg, #dc2626, #991b1b) !important;
            box-shadow: 0 10px 40px rgba(239, 68, 68, 0.5) !important;
        }
        body.dominated .card {
            border-color: rgba(239, 68, 68, 0.3) !important;
            background: rgba(68, 30, 30, 0.5) !important;
        }
        body.dominated .buy-button {
            background: linear-gradient(135deg, #dc2626, #991b1b) !important;
        }
        body.dominated .buy-button:disabled {
            background: #442020 !important;
        }
        body.dominated .green {
            color: #ef4444 !important;
        }
        body.dominated .cyan {
            color: #fca5a5 !important;
        }
        body.dominated .prestige-badge {
            background: rgba(239, 68, 68, 0.2) !important;
            color: #ef4444 !important;
        }
        body.dominated .prestige-box {
            background: rgba(239, 68, 68, 0.1) !important;
            border-color: rgba(239, 68, 68, 0.3) !important;
        }
        body.dominated .prestige-level {
            color: #ef4444 !important;
        }
        body.dominated .section-title {
            color: #fca5a5 !important;
        }
        body.dominated .title {
            color: #ef4444 !important;
        }
        body.dominated #titleIcon {
            filter: hue-rotate(320deg) saturate(2);
        }
    `;
    document.head.appendChild(style);
    document.body.classList.add('dominated');
    
    // Change title icon to evil robot
    document.getElementById('titleIcon').textContent = '🤖';
}

// Check on load if already dominated
function checkDominationOnLoad() {
    if (game.worldDominated) {
        applyDominationTheme();
    }
}

function update() {
    document.getElementById('energy').textContent = fmt(game.energy);
    document.getElementById('clickPower').textContent = fmt(getClickPower());
    document.getElementById('perSecond').textContent = fmt(getTotalProd());
    
    updateClickPowerTooltip();
    updateProductionTooltip();
    
    const curEvo = game.evolutions.find(function(e) { return e.id === game.evolution; });
    document.getElementById('evolutionName').textContent = curEvo.name;
    document.getElementById('clickBtn').textContent = curEvo.icon;
    document.getElementById('titleIcon').textContent = curEvo.icon;
    document.getElementById('gameBody').style.background = 'transparent'; // Let starfield show through
    
    // Update starfield theme based on evolution
    updateStarfieldEvolution(game.evolution);
    
    // Update click button color based on evolution
    const clickBtn = document.getElementById('clickBtn');
    const evolutionColors = [
        { bg: 'linear-gradient(135deg, #6b7280, #4b5563)', shadow: 'rgba(107, 114, 128, 0.5)' },  // 0: Gray
        { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', shadow: 'rgba(59, 130, 246, 0.5)' },   // 1: Blue
        { bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', shadow: 'rgba(139, 92, 246, 0.5)' },   // 2: Purple
        { bg: 'linear-gradient(135deg, #06b6d4, #0891b2)', shadow: 'rgba(6, 182, 212, 0.5)' },    // 3: Cyan
        { bg: 'linear-gradient(135deg, #10b981, #059669)', shadow: 'rgba(16, 185, 129, 0.5)' },   // 4: Green
        { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', shadow: 'rgba(245, 158, 11, 0.5)' },   // 5: Amber
        { bg: 'linear-gradient(135deg, #f97316, #ea580c)', shadow: 'rgba(249, 115, 22, 0.5)' },   // 6: Orange
        { bg: 'linear-gradient(135deg, #ec4899, #db2777)', shadow: 'rgba(236, 72, 153, 0.5)' },   // 7: Pink
        { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', shadow: 'rgba(239, 68, 68, 0.5)' },    // 8: Red
        { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', shadow: 'rgba(251, 191, 36, 0.5)' },   // 9: Gold
        { bg: 'linear-gradient(135deg, #a855f7, #9333ea, #7c3aed)', shadow: 'rgba(168, 85, 247, 0.6)' }  // 10: Rainbow purple
    ];
    const evoColor = evolutionColors[Math.min(game.evolution, 10)];
    clickBtn.style.background = evoColor.bg;
    clickBtn.style.boxShadow = '0 10px 40px ' + evoColor.shadow;
    
    if (game.evolution > 0) {
        document.getElementById('evolutionBadgeDiv').style.display = 'flex';
        document.getElementById('evolutionBadge').textContent = game.evolution;
        const evoTooltip = document.getElementById('evolutionTooltipContent');
        if (evoTooltip) {
            let html = '<div class="prestige-tooltip-item">✨ Production: ×' + (1 + curEvo.prodBonus).toFixed(2) + '</div>';
            for (let i = 1; i <= Math.min(game.evolution, 10); i++) {
                const evo = game.evolutions.find(function(e) { return e.id === i; });
                const gen = game.gens.find(function(g) { return g.id === evo.genId; });
                html += '<div class="prestige-tooltip-item">🚀 ' + gen.icon + ' ' + gen.name + ': ×2 base';
                if (i > 1) {
                    const prevGen = game.gens.find(function(g) { return g.id === i - 1; });
                    html += ' + cascade from ' + prevGen.icon;
                }
                html += '</div>';
            }
            evoTooltip.innerHTML = html;
        }
    }
    
    renderGens();
    renderGenSummary();
    renderUps();
    renderEvolutions();
    renderPlanets();
    checkNotifs();
    updateMilestoneProgress();
}

function updateMilestoneProgress() {
    const milestoneLabel = document.getElementById('milestoneLabel');
    const milestoneTarget = document.getElementById('milestoneTarget');
    const milestoneBar = document.getElementById('milestoneBar');
    
    // Find next milestone (in order of priority)
    let milestone = null;
    let progress = 0;
    let label = '';
    let target = '';
    
    // 1. Check for next evolution
    const nextEvo = game.evolutions.find(e => !e.unlocked && e.id > 0);
    if (nextEvo) {
        progress = Math.min(100, (game.totalEnergy / nextEvo.cost) * 100);
        label = '🧬 Next Evolution';
        target = nextEvo.name + ' (' + fmt(nextEvo.cost) + ')';
        milestone = 'evolution';
    }
    
    // 2. If no evolution pending, check for next generator achievement
    if (!milestone || progress >= 100) {
        const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
        const genMilestones = [10, 30, 50, 100, 200, 300, 500, 1000];
        const nextGenMilestone = genMilestones.find(m => totalGens < m);
        
        if (nextGenMilestone) {
            progress = (totalGens / nextGenMilestone) * 100;
            label = '🏭 Generator Milestone';
            target = nextGenMilestone + ' total (' + totalGens + '/' + nextGenMilestone + ')';
            milestone = 'generator';
        }
    }
    
    // 3. Check for next click achievement
    if (!milestone) {
        const clickMilestones = [100, 500, 1000, 5000, 10000];
        const nextClickMilestone = clickMilestones.find(m => game.totalClicks < m);
        
        if (nextClickMilestone) {
            progress = (game.totalClicks / nextClickMilestone) * 100;
            label = '👆 Click Milestone';
            target = nextClickMilestone.toLocaleString() + ' clicks';
            milestone = 'clicks';
        }
    }
    
    // 4. If galaxy unlocked, check planets
    if (game.evolution >= 10) {
        const nextPlanet = game.planets.find(p => !p.owned && p.id > 1);
        if (nextPlanet) {
            progress = Math.min(100, (game.energy / nextPlanet.cost) * 100);
            label = '🌌 Next Conquest';
            target = nextPlanet.icon + ' ' + nextPlanet.name + ' (' + fmt(nextPlanet.cost) + ')';
            milestone = 'planet';
        }
    }
    
    // Update UI
    if (milestone) {
        milestoneLabel.textContent = label;
        milestoneTarget.textContent = target;
        milestoneBar.style.width = Math.min(100, progress) + '%';
        
        // Change bar color based on progress
        if (progress >= 100) {
            milestoneBar.style.background = 'linear-gradient(90deg, #4ade80, #22c55e)';
        } else if (progress >= 75) {
            milestoneBar.style.background = 'linear-gradient(90deg, #facc15, #eab308)';
        } else {
            milestoneBar.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
        }
    } else {
        milestoneLabel.textContent = '🏆 All milestones complete!';
        milestoneTarget.textContent = 'You are the ultimate DROIDOR!';
        milestoneBar.style.width = '100%';
        milestoneBar.style.background = 'linear-gradient(90deg, #f59e0b, #ef4444, #ec4899)';
    }
    
    // Check for log entry unlocks periodically
    checkLogEntries();
}

function renderGenSummary() {
    const summary = document.getElementById('genSummary');
    const section = document.getElementById('genSummarySection');
    summary.innerHTML = '';
    const ownedGens = game.gens.filter(function(g) { return g.owned > 0; });
    if (ownedGens.length === 0) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';
    ownedGens.forEach(function(gen) {
        const bonus = getGeneratorBonus(gen.id);
        const prod = gen.owned * gen.prod * getTotalMult() * bonus;
        const card = document.createElement('div');
        card.className = 'gen-card';
        let html = '<div style="font-size: 28px; margin-bottom: 5px;">' + gen.icon + '</div>';
        html += '<div style="font-size: 12px; font-weight: bold; margin-bottom: 3px;">' + gen.name + '</div>';
        html += '<div style="font-size: 11px; color: #94a3b8; margin-bottom: 3px;">' + gen.owned + ' owned</div>';
        html += '<div style="font-size: 12px; color: #22d3ee; font-weight: bold;">' + fmt(prod) + '/s</div>';
        card.innerHTML = html;
        summary.appendChild(card);
    });
}

function renderGens() {
    const list = document.getElementById('generatorsList');
    list.innerHTML = '';
    const visibleGens = game.gens.filter(function(gen) {
        const cost = getGenCost(gen);
        return game.totalEnergy >= cost || gen.owned > 0;
    });
    if (visibleGens.length === 0) {
        list.innerHTML = '<div class="empty-state"><div style="font-size: 48px; margin-bottom: 15px;">🏭</div><div style="font-size: 18px; font-weight: bold; color: #cbd5e1; margin-bottom: 10px;">No Generators Unlocked Yet</div><div style="font-size: 14px; color: #94a3b8;">Generate more energy to unlock generators!</div></div>';
        return;
    }
    visibleGens.forEach(function(gen) {
        const cost = getGenCost(gen);
        const genBonus = getGeneratorBonus(gen.id);
        const globalMult = getTotalMult();
        const combinedMult = globalMult * genBonus;
        const totalProd = gen.owned * gen.prod * combinedMult;
        const card = document.createElement('div');
        card.className = 'card';
        
        // Top row: icon, name/info, and total production in upper right
        let html = '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">';
        
        // Left: icon and info
        html += '<div class="card-header" style="margin-bottom: 0;">';
        html += '<div class="card-icon">' + gen.icon + '</div>';
        html += '<div class="card-info">';
        html += '<div style="display: flex; align-items: baseline; gap: 8px;">';
        html += '<div class="card-title">' + gen.name + '</div>';
        html += '<div style="font-size: 14px; color: #22d3ee; font-weight: bold;">' + gen.prod + '/s</div>';
        if (combinedMult > 1) {
            html += '<div style="font-size: 11px; color: #facc15;">(×' + combinedMult.toFixed(2) + ')</div>';
        }
        html += '</div>';
        html += '<div class="card-subtitle">Owned: ' + gen.owned + '</div>';
        html += '</div></div>';
        
        // Right: total production (upper right corner)
        if (gen.owned > 0) {
            html += '<div style="text-align: right;">';
            html += '<div style="font-size: 11px; color: #94a3b8; margin-bottom: 2px;">Total:</div>';
            html += '<div style="font-size: 22px; color: #4ade80; font-weight: bold;">' + fmt(totalProd) + '/s</div>';
            html += '</div>';
        }
        
        html += '</div>';
        
        // Calculate cost based on buy multiplier
        let displayCost, displayAmount, canAfford;
        
        if (buyMultiplier === -1) {
            // Max mode
            displayAmount = getMaxAffordable(gen);
            displayCost = displayAmount > 0 ? getMultiBuyCost(gen, displayAmount) : getGenCost(gen);
            canAfford = displayAmount > 0;
        } else {
            // Fixed amount mode - cap by remaining
            const remaining = MAX_GENERATORS - gen.owned;
            displayAmount = Math.min(buyMultiplier, remaining);
            displayCost = getMultiBuyCost(gen, displayAmount);
            canAfford = game.energy >= displayCost && displayAmount > 0;
        }
        
        // Check if at max
        const atMax = gen.owned >= MAX_GENERATORS;
        
        // Bottom row: buy button
        let btnText;
        if (atMax) {
            btnText = 'MAX (1000)';
        } else if (buyMultiplier === -1) {
            btnText = displayAmount > 0 ? 'Buy ' + displayAmount + ' - ' + fmt(displayCost) : 'Buy - ' + fmt(getGenCost(gen));
        } else {
            btnText = 'Buy ' + displayAmount + ' - ' + fmt(displayCost);
        }
        
        html += '<button class="buy-button" onclick="buyGen(' + gen.id + ')" ';
        if (!canAfford || atMax) html += 'disabled';
        html += '>' + btnText + '</button>';
        
        card.innerHTML = html;
        list.appendChild(card);
    });
}

function renderUps() {
    const list = document.getElementById('upgradesList');
    list.innerHTML = '';
    const currentBatch = getUnlockedBatch();
    
    const sortedUps = game.ups.slice().sort(function(a, b) {
        if (a.req !== b.req) return a.req - b.req;
        return a.id - b.id;
    });
    
    // Show upgrades from unlocked batches (where evolution requirement is also met)
    const availableUps = sortedUps.filter(function(up) {
        return isUpgradeUnlocked(up);
    });
    
    // Find next batch info for messaging
    const nextBatchUps = sortedUps.filter(function(up) {
        return up.req === currentBatch + 1;
    });
    
    // Check if current batch has unowned upgrades (need to complete before next batch)
    const currentBatchUps = sortedUps.filter(function(up) {
        return up.req === currentBatch && game.evolution >= up.req;
    });
    const currentBatchIncomplete = currentBatchUps.some(function(up) { return !up.owned; });
    
    if (availableUps.length === 0) {
        list.innerHTML = '<div class="empty-state"><div style="font-size: 48px; margin-bottom: 15px;">⚙️</div><div style="font-size: 18px; font-weight: bold; color: #cbd5e1; margin-bottom: 10px;">No Upgrades Unlocked Yet</div><div style="font-size: 14px; color: #94a3b8;">Evolve to unlock upgrades!</div></div>';
        return;
    }
    
    // Group upgrades by batch for visual separation
    let currentGroupBatch = -1;
    
    availableUps.forEach(function(up) {
        // Add visual separator between batches
        if (up.req !== currentGroupBatch) {
            if (currentGroupBatch !== -1) {
                const separator = document.createElement('div');
                separator.style.cssText = 'height: 2px; background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent); margin: 20px 0;';
                list.appendChild(separator);
            }
            currentGroupBatch = up.req;
        }
        
        const cost = getUpgradeCost(up);
        const canBuy = !up.owned && isUpgradeUnlocked(up) && game.energy >= cost;
        const card = document.createElement('div');
        card.className = 'card' + (up.owned ? ' unlocked' : '');
        
        let descText = up.desc || '';
        if (up.type === 'burst' && !up.owned) {
            const burstAmount = getUpgradeCost(up) * 3;
            descText += ' (' + fmt(burstAmount) + ' energy)';
        }
        
        let html = '<div style="display: flex; justify-content: space-between; align-items: center;">';
        
        // Left side: name and status
        html += '<div style="flex: 1;">';
        html += '<div class="card-title">' + up.name + '</div>';
        if (up.owned) {
            html += '<div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">';
            html += '<span style="color: #4ade80; font-size: 18px;">✓</span>';
            html += '<span style="color: #4ade80; font-size: 14px; font-weight: 600;">Owned</span>';
            html += '</div>';
        } else {
            html += '<div class="card-subtitle">' + fmt(cost) + ' energy</div>';
            if (up.dynamicCost) {
                html += '<div style="font-size: 10px; color: #facc15; margin-top: 2px;">💡 ' + up.baseHours + 'h of production</div>';
            }
        }
        html += '</div>';
        
        // Right side: description (and buy button if not owned)
        html += '<div style="text-align: right; margin-left: 15px; width: 200px; flex-shrink: 0;">';
        html += '<div style="font-size: 14px; color: #93c5fd; font-weight: 500;">' + descText + '</div>';
        if (!up.owned) {
            html += '<button class="buy-button" style="margin-top: 10px; padding: 8px 24px; width: 100%;" onclick="buyUp(' + up.id + ')" ';
            if (!canBuy) html += 'disabled';
            html += '>Buy</button>';
        }
        html += '</div>';
        
        html += '</div>';
        
        card.innerHTML = html;
        list.appendChild(card);
    });
    
    // Show message about next batch
    if (currentBatchIncomplete && nextBatchUps.length > 0) {
        const messageBox = document.createElement('div');
        messageBox.style.cssText = 'background: rgba(139, 92, 246, 0.15); padding: 20px; border-radius: 10px; border: 2px dashed rgba(139, 92, 246, 0.4); text-align: center; margin-top: 20px;';
        messageBox.innerHTML = '<div style="font-size: 32px; margin-bottom: 10px;">🔒</div>' +
            '<div style="font-size: 16px; font-weight: bold; color: #a78bfa; margin-bottom: 8px;">' + nextBatchUps.length + ' More Upgrade' + (nextBatchUps.length > 1 ? 's' : '') + ' Available</div>' +
            '<div style="font-size: 13px; color: #cbd5e1;">Complete all current upgrades to unlock more!</div>';
        list.appendChild(messageBox);
    } else if (game.evolution < currentBatch + 1 && nextBatchUps.length > 0) {
        const messageBox = document.createElement('div');
        messageBox.style.cssText = 'background: rgba(234, 179, 8, 0.15); padding: 20px; border-radius: 10px; border: 2px dashed rgba(234, 179, 8, 0.4); text-align: center; margin-top: 20px;';
        messageBox.innerHTML = '<div style="font-size: 32px; margin-bottom: 10px;">🧬</div>' +
            '<div style="font-size: 16px; font-weight: bold; color: #facc15; margin-bottom: 8px;">Evolution Required!</div>' +
            '<div style="font-size: 13px; color: #cbd5e1;">Evolve to unlock more upgrades.</div>';
        list.appendChild(messageBox);
    }
}

function renderEvolutions() {
    const nextBox = document.getElementById('nextEvolutionBox');
    const completedSection = document.getElementById('completedEvolutionsSection');
    const completedList = document.getElementById('completedEvolutionsList');
    
    if (!nextBox) {
        console.error('nextEvolutionBox element not found!');
        return;
    }
    
    const curEvo = game.evolutions.find(e => e.id === game.evolution);
    const evolutionName2 = document.getElementById('evolutionName2');
    if (evolutionName2) {
        evolutionName2.textContent = curEvo.name;
    }
    
    const evolutionLevel = document.getElementById('evolutionLevel');
    if (evolutionLevel) {
        evolutionLevel.textContent = game.evolution;
    }
    
    const nextEvo = game.evolutions.find(e => e.id === game.evolution + 1 && !e.unlocked);
    
    if (nextEvo) {
        let html = '<div style="background: rgba(59, 130, 246, 0.15); padding: 20px; border-radius: 12px; border: 2px solid rgba(59, 130, 246, 0.4); margin-bottom: 15px;">';
        
        html += '<div style="text-align: center; margin-bottom: 20px;">';
        html += '<div style="font-size: 48px; margin-bottom: 10px;">' + nextEvo.icon + '</div>';
        html += '<div style="font-size: 24px; font-weight: bold; color: #93c5fd; margin-bottom: 8px;">Next Evolution: ' + nextEvo.name + '</div>';
        html += '<div style="font-size: 14px; color: #cbd5e1; margin-bottom: 15px;">Evolution Level ' + nextEvo.id + '</div>';
        html += '</div>';
        
        html += '<div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;">';
        html += '<div style="font-size: 12px; color: #94a3b8; margin-bottom: 8px;">Total Energy Progress:</div>';
        html += '<div style="font-size: 20px; font-weight: bold; color: ' + (game.totalEnergy >= nextEvo.cost ? '#4ade80' : '#facc15') + '; margin-bottom: 8px;">';
        html += fmt(game.totalEnergy) + ' / ' + fmt(nextEvo.cost) + '</div>';
        
        const progress = Math.min((game.totalEnergy / nextEvo.cost) * 100, 100);
        html += '<div style="width: 100%; height: 10px; background: rgba(0, 0, 0, 0.5); border-radius: 5px; overflow: hidden;">';
        html += '<div style="width: ' + progress + '%; height: 100%; background: linear-gradient(90deg, #3b82f6, #22d3ee); border-radius: 5px; transition: width 0.3s;"></div>';
        html += '</div></div>';
        
        html += '<div style="background: rgba(34, 197, 94, 0.1); padding: 15px; border-radius: 8px; border: 1px solid rgba(34, 197, 94, 0.3); margin-bottom: 15px;">';
        html += '<div style="font-size: 14px; font-weight: bold; color: #4ade80; margin-bottom: 10px;">🎁 Evolution Bonuses:</div>';
        html += '<div style="font-size: 13px; color: #cbd5e1; line-height: 1.8;">';
        html += '✨ <span style="color: #4ade80; font-weight: bold;">×' + (1 + nextEvo.prodBonus).toFixed(2) + '</span> Global Production Multiplier<br>';
        
        if (nextEvo.genId) {
            const gen = game.gens.find(g => g.id === nextEvo.genId);
            if (gen) {
                html += '🚀 ' + gen.icon + ' <span style="color: #22d3ee; font-weight: bold;">' + gen.name + '</span> gets ×2 base production<br>';
                if (nextEvo.genId > 1) {
                    const prevGen = game.gens.find(g => g.id === nextEvo.genId - 1);
                    if (prevGen) {
                        html += '🔗 ' + gen.name + ' unlocks <span style="color: #facc15; font-weight: bold;">cascade bonuses</span> from ' + prevGen.icon + ' ' + prevGen.name;
                    }
                }
            }
        }
        html += '</div></div>';
        
        html += '<button class="buy-button" style="font-size: 16px; padding: 16px;" onclick="evolve(' + nextEvo.id + ')" ';
        if (game.totalEnergy < nextEvo.cost) {
            html += 'disabled';
        }
        html += '>🧬 Evolve to ' + nextEvo.name + '</button>';
        
        html += '<div style="font-size: 11px; color: #f87171; text-align: center; margin-top: 10px;">⚠️ Evolution will reset all progress except evolution bonuses</div>';
        html += '</div>';
        
        nextBox.innerHTML = html;
    } else {
        nextBox.innerHTML = '<div style="background: rgba(234, 179, 8, 0.15); padding: 20px; border-radius: 12px; border: 2px solid rgba(234, 179, 8, 0.4); text-align: center;">' +
            '<div style="font-size: 48px; margin-bottom: 10px;">👑</div>' +
            '<div style="font-size: 20px; font-weight: bold; color: #facc15; margin-bottom: 8px;">Maximum Evolution Reached!</div>' +
            '<div style="font-size: 14px; color: #cbd5e1;">You have completed all available evolutions</div>' +
            '</div>';
    }
    
    if (completedSection && completedList) {
        const completedEvos = game.evolutions.filter(e => e.unlocked && e.id > 0);
        if (completedEvos.length > 0) {
            completedSection.style.display = 'block';
            completedList.innerHTML = '';
            
            completedEvos.forEach(evo => {
                const card = document.createElement('div');
                card.style.cssText = 'background: rgba(34, 197, 94, 0.1); padding: 12px; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid #22c55e; display: flex; justify-content: space-between; align-items: center;';
                
                let cardHTML = '<div style="display: flex; align-items: center; gap: 12px;">';
                cardHTML += '<span style="font-size: 32px;">' + evo.icon + '</span>';
                cardHTML += '<div><div style="font-size: 14px; font-weight: bold; color: #4ade80;">Evolution ' + evo.id + ': ' + evo.name + '</div>';
                cardHTML += '<div style="font-size: 11px; color: #94a3b8;">×' + (1 + evo.prodBonus).toFixed(2) + ' production';
                if (evo.genId) {
                    const gen = game.gens.find(g => g.id === evo.genId);
                    if (gen) {
                        cardHTML += ' | ' + gen.icon + ' ' + gen.name + ' ×2';
                    }
                }
                cardHTML += '</div></div></div>';
                cardHTML += '<div style="font-size: 20px;">✅</div>';
                
                card.innerHTML = cardHTML;
                completedList.appendChild(card);
            });
        } else {
            completedSection.style.display = 'none';
        }
    }
}

function renderPlanets() {
    const list = document.getElementById('planetsList');
    if (!list) return;
    list.innerHTML = '';
    const lockMsg = document.getElementById('lockMsg');
    const galEvo = document.getElementById('galEvolution');
    if (galEvo) galEvo.textContent = game.evolution;
    if (lockMsg) lockMsg.style.display = game.evolution >= 10 ? 'none' : 'block';
    if (game.galaxyPerm) {
        document.getElementById('galaxyTab').classList.remove('hidden');
    }
    game.planets.forEach(function(p) {
        const card = document.createElement('div');
        card.className = 'planet-card' + (p.owned ? ' conquered' : '');
        const left = document.createElement('div');
        let leftHTML = '<div style="display: flex; align-items: center; gap: 10px;">';
        leftHTML += '<span style="font-size: 32px;">' + p.icon + '</span><div>';
        leftHTML += '<div style="font-size: 16px; font-weight: bold;">' + p.name + '</div>';
        leftHTML += '<div style="font-size: 12px; color: #94a3b8;">';
        leftHTML += (p.id === 1 ? 'Homeworld' : (p.owned ? '✓ Conquered' : fmt(p.cost) + ' energy'));
        leftHTML += '</div></div></div>';
        left.innerHTML = leftHTML;
        const right = document.createElement('div');
        right.style.textAlign = 'right';
        let rightHTML = '<div style="font-size: 18px; font-weight: bold; color: #facc15;">';
        rightHTML += (p.bonus > 0 ? '+' + (p.bonus * 100).toFixed(0) + '%' : '---') + '</div>';
        right.innerHTML = rightHTML;
        if (p.id > 1 && !p.owned) {
            const btn = document.createElement('button');
            btn.textContent = game.evolution < 10 ? '🔒 Locked' : 'Conquer';
            btn.disabled = game.evolution < 10 || game.energy < p.cost;
            btn.style.cssText = 'margin-top: 8px; padding: 8px 16px; background: ' + (game.evolution < 10 ? '#6b7280' : '#3b82f6') + '; border: none; border-radius: 6px; color: #fff; font-weight: bold; cursor: pointer; opacity: ' + (btn.disabled ? '0.5' : '1');
            btn.onclick = function() { conquerPlanet(p.id); };
            right.appendChild(btn);
        }
        card.appendChild(left);
        card.appendChild(right);
        list.appendChild(card);
    });
}

function renderStats() {
    const clickBreakdown = document.getElementById('clickBreakdown');
    const prodBreakdown = document.getElementById('prodBreakdown');
    const achievementsList = document.getElementById('achievementsList');
    
    if (clickBreakdown) {
        let clickHTML = '';
        clickHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
        clickHTML += '<span style="color: #94a3b8;">Base Click Power:</span>';
        clickHTML += '<span style="color: #4ade80; font-weight: bold;">' + game.clickPower + '</span></div>';
        
        clickHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
        clickHTML += '<span style="color: #94a3b8;">Click Multiplier:</span>';
        clickHTML += '<span style="color: #4ade80; font-weight: bold;">×' + game.clickPowerMult.toFixed(2) + '</span></div>';
        
        clickHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
        clickHTML += '<span style="color: #94a3b8;">Total Multiplier:</span>';
        clickHTML += '<span style="color: #4ade80; font-weight: bold;">×' + getTotalMult().toFixed(2) + '</span></div>';
        
        const genClickBonus = getGenClickBonus();
        if (genClickBonus > 0) {
            const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
            clickHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            clickHTML += '<span style="color: #94a3b8;">Generator Bonus (' + totalGens + ' gens):</span>';
            clickHTML += '<span style="color: #22d3ee; font-weight: bold;">×' + (1 + genClickBonus).toFixed(2) + '</span></div>';
        }
        
        const prodClickBonus = getProdClickBonus();
        if (prodClickBonus > 0) {
            clickHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            clickHTML += '<span style="color: #94a3b8;">Production Bonus (10% of /s):</span>';
            clickHTML += '<span style="color: #a78bfa; font-weight: bold;">+' + fmt(prodClickBonus) + '</span></div>';
        }
        
        if (game.synergy) {
            const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
            const synergyMult = (1 + Math.floor(totalGens / 10) * 2);
            clickHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            clickHTML += '<span style="color: #94a3b8;">Gen Synergy Bonus:</span>';
            clickHTML += '<span style="color: #facc15; font-weight: bold;">×' + synergyMult.toFixed(2) + '</span></div>';
        }
        
        clickHTML += '<div style="display: flex; justify-content: space-between; padding: 12px 0; margin-top: 8px; border-top: 2px solid rgba(59, 130, 246, 0.3);">';
        clickHTML += '<span style="color: #fff; font-weight: bold;">Total Click Power:</span>';
        clickHTML += '<span style="color: #4ade80; font-weight: bold; font-size: 18px;">' + fmt(getClickPower()) + '</span></div>';
        
        clickBreakdown.innerHTML = clickHTML;
    }
    
    if (prodBreakdown) {
        let prodHTML = '';
        prodHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
        prodHTML += '<span style="color: #94a3b8;">Base Multiplier:</span>';
        prodHTML += '<span style="color: #4ade80; font-weight: bold;">×' + game.globalMult.toFixed(2) + '</span></div>';
        
        const curEvo = game.evolutions.find(e => e.id === game.evolution);
        if (curEvo && curEvo.prodBonus > 0) {
            prodHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            prodHTML += '<span style="color: #94a3b8;">Evolution Bonus (' + curEvo.name + '):</span>';
            prodHTML += '<span style="color: #facc15; font-weight: bold;">×' + (1 + curEvo.prodBonus).toFixed(2) + '</span></div>';
        }
        
        const planetBonus = game.planets.filter(p => p.owned).reduce((s, p) => s + p.bonus, 0);
        if (planetBonus > 0) {
            prodHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            prodHTML += '<span style="color: #94a3b8;">Planet Bonuses:</span>';
            prodHTML += '<span style="color: #22d3ee; font-weight: bold;">+' + (planetBonus * 100).toFixed(0) + '%</span></div>';
        }
        
        const clickAchBonus = game.achievements.filter(a => a.unlocked && a.id.startsWith('click')).reduce((sum, a) => sum + a.bonus, 0);
        if (clickAchBonus > 0) {
            prodHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            prodHTML += '<span style="color: #94a3b8;">Click Achievements:</span>';
            prodHTML += '<span style="color: #a78bfa; font-weight: bold;">+' + (clickAchBonus * 100).toFixed(0) + '%</span></div>';
        }
        
        const totalGenBonus = game.achievements.filter(a => a.unlocked && a.type === 'totalGen').reduce((sum, a) => sum + a.bonus, 0);
        if (totalGenBonus > 0) {
            prodHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            prodHTML += '<span style="color: #94a3b8;">Generator Milestones:</span>';
            prodHTML += '<span style="color: #f59e0b; font-weight: bold;">+' + (totalGenBonus * 100).toFixed(0) + '%</span></div>';
        }
        
        prodHTML += '<div style="display: flex; justify-content: space-between; padding: 12px 0; margin-top: 8px; border-top: 2px solid rgba(59, 130, 246, 0.3);">';
        prodHTML += '<span style="color: #fff; font-weight: bold;">Total Multiplier:</span>';
        prodHTML += '<span style="color: #4ade80; font-weight: bold; font-size: 18px;">×' + getTotalMult().toFixed(2) + '</span></div>';
        
        prodBreakdown.innerHTML = prodHTML;
    }
    
    if (achievementsList) {
        let achHTML = '';
        const unlockedCount = game.achievements.filter(a => a.unlocked).length;
        const totalCount = game.achievements.length;
        
        achHTML += '<div style="margin-bottom: 15px; padding: 12px; background: rgba(59, 130, 246, 0.1); border-radius: 8px;">';
        achHTML += '<div style="font-size: 14px; color: #93c5fd;">Progress: <span style="color: #4ade80; font-weight: bold;">' + unlockedCount + '</span> / ' + totalCount + ' unlocked</div>';
        achHTML += '<div style="width: 100%; height: 8px; background: rgba(0, 0, 0, 0.3); border-radius: 4px; margin-top: 8px; overflow: hidden;">';
        achHTML += '<div style="width: ' + (unlockedCount / totalCount * 100) + '%; height: 100%; background: linear-gradient(90deg, #4ade80, #22d3ee); border-radius: 4px;"></div>';
        achHTML += '</div></div>';
        
        const clickAchs = game.achievements.filter(a => a.id.startsWith('click'));
        const totalGenAchs = game.achievements.filter(a => a.type === 'totalGen');
        const genAchs = game.achievements.filter(a => a.genId);
        
        if (clickAchs.length > 0) {
            achHTML += '<div style="font-size: 14px; font-weight: bold; color: #93c5fd; margin: 15px 0 10px;">🖱️ Click Achievements</div>';
            clickAchs.forEach(ach => {
                achHTML += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: ' + (ach.unlocked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(51, 65, 85, 0.3)') + '; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid ' + (ach.unlocked ? '#22c55e' : '#475569') + ';">';
                achHTML += '<div><div style="font-size: 13px; font-weight: bold; color: ' + (ach.unlocked ? '#4ade80' : '#94a3b8') + ';">' + (ach.unlocked ? '✓' : '○') + ' ' + ach.name + '</div>';
                achHTML += '<div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">' + ach.desc + '</div></div>';
                achHTML += '<div style="text-align: right;"><div style="font-size: 11px; color: #22d3ee;">' + (ach.unlocked ? '+' + (ach.bonus * 100).toFixed(0) + '%' : game.totalClicks + '/' + ach.requirement) + '</div></div>';
                achHTML += '</div>';
            });
        }
        
        if (totalGenAchs.length > 0) {
            const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
            achHTML += '<div style="font-size: 14px; font-weight: bold; color: #93c5fd; margin: 15px 0 10px;">⭐ Total Generator Milestones</div>';
            totalGenAchs.forEach(ach => {
                achHTML += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: ' + (ach.unlocked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(51, 65, 85, 0.3)') + '; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid ' + (ach.unlocked ? '#22c55e' : '#475569') + ';">';
                achHTML += '<div><div style="font-size: 13px; font-weight: bold; color: ' + (ach.unlocked ? '#4ade80' : '#94a3b8') + ';">' + (ach.unlocked ? '✓' : '○') + ' ' + ach.name + '</div>';
                achHTML += '<div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">' + ach.desc + '</div></div>';
                achHTML += '<div style="text-align: right;"><div style="font-size: 11px; color: #22d3ee;">' + (ach.unlocked ? '+10% global' : totalGens + '/' + ach.requirement) + '</div></div>';
                achHTML += '</div>';
            });
        }
        
        if (genAchs.length > 0) {
            achHTML += '<div style="font-size: 14px; font-weight: bold; color: #93c5fd; margin: 15px 0 10px;">🏭 Generator Achievements</div>';
            genAchs.forEach(ach => {
                const gen = game.gens.find(g => g.id === ach.genId);
                if (!gen) return;
                achHTML += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: ' + (ach.unlocked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(51, 65, 85, 0.3)') + '; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid ' + (ach.unlocked ? '#22c55e' : '#475569') + ';">';
                achHTML += '<div><div style="font-size: 13px; font-weight: bold; color: ' + (ach.unlocked ? '#4ade80' : '#94a3b8') + ';">' + (ach.unlocked ? '✓' : '○') + ' ' + ach.name + '</div>';
                achHTML += '<div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">' + gen.icon + ' ' + ach.desc + '</div></div>';
                achHTML += '<div style="text-align: right;"><div style="font-size: 11px; color: #22d3ee;">' + (ach.unlocked ? '+10%' : gen.owned + '/' + ach.requirement) + '</div></div>';
                achHTML += '</div>';
            });
        }
        
        achievementsList.innerHTML = achHTML;
    }
}

// Render log entries
function renderLogs() {
    const container = document.getElementById('logEntriesList');
    if (!container) return;
    
    if (!game.logEntries) game.logEntries = [];
    
    // Check for new unlocks
    checkLogEntries();
    
    let html = '';
    const unlockedCount = game.logEntries.length;
    const totalCount = CONFIG.logEntries.length;
    
    html += `<div style="margin-bottom: 15px; color: #94a3b8; font-size: 14px;">📖 Entries Unlocked: <span style="color: #4ade80; font-weight: bold;">${unlockedCount}</span> / ${totalCount}</div>`;
    
    // Show unlocked entries
    CONFIG.logEntries.forEach(entry => {
        const isUnlocked = game.logEntries.includes(entry.id);
        
        html += `<div style="background: ${isUnlocked ? 'rgba(139, 92, 246, 0.1)' : 'rgba(51, 65, 85, 0.3)'}; padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 3px solid ${isUnlocked ? '#a78bfa' : '#475569'};">`;
        
        if (isUnlocked) {
            html += `<div style="font-size: 16px; font-weight: bold; color: #a78bfa; margin-bottom: 8px;">📜 ${entry.title}</div>`;
            html += `<div style="font-size: 14px; color: #e2e8f0; line-height: 1.6; font-style: italic;">"${entry.text}"</div>`;
        } else {
            html += `<div style="font-size: 16px; font-weight: bold; color: #475569;">🔒 ???</div>`;
            html += `<div style="font-size: 12px; color: #475569; margin-top: 5px;">Keep playing to unlock...</div>`;
        }
        
        html += '</div>';
    });
    
    container.innerHTML = html;
}

// Rarity colors and labels
const RARITY_CONFIG = {
    common: { color: '#9ca3af', bg: 'rgba(156, 163, 175, 0.1)', label: 'Common', icon: '○' },
    uncommon: { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)', label: 'Uncommon', icon: '◇' },
    rare: { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Rare', icon: '◈' },
    epic: { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)', label: 'Epic', icon: '★' },
    legendary: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', label: 'Legendary', icon: '✦' },
    mythic: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Mythic', icon: '✧' }
};

// Render achievement gallery with rarity tiers
function renderAchievementGallery() {
    const container = document.getElementById('achievementGallery');
    if (!container) return;
    
    let html = '';
    
    // Count by rarity
    const rarities = ['mythic', 'legendary', 'epic', 'rare', 'uncommon', 'common'];
    
    // Stats summary
    const totalAchs = game.achievements.length;
    const unlockedAchs = game.achievements.filter(a => a.unlocked).length;
    
    html += `<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">`;
    rarities.forEach(rarity => {
        const config = RARITY_CONFIG[rarity];
        const total = game.achievements.filter(a => a.rarity === rarity).length;
        const unlocked = game.achievements.filter(a => a.rarity === rarity && a.unlocked).length;
        if (total > 0) {
            html += `<div style="background: ${config.bg}; border: 1px solid ${config.color}; padding: 8px 12px; border-radius: 8px; text-align: center;">`;
            html += `<div style="font-size: 12px; color: ${config.color}; font-weight: bold;">${config.icon} ${config.label}</div>`;
            html += `<div style="font-size: 14px; color: #fff;">${unlocked}/${total}</div>`;
            html += `</div>`;
        }
    });
    html += `</div>`;
    
    // Progress bar
    const progress = totalAchs > 0 ? (unlockedAchs / totalAchs * 100) : 0;
    html += `<div style="background: rgba(51, 65, 85, 0.5); border-radius: 10px; height: 20px; overflow: hidden; margin-bottom: 20px;">`;
    html += `<div style="background: linear-gradient(90deg, #22c55e, #3b82f6, #a855f7, #f59e0b); height: 100%; width: ${progress}%; transition: width 0.3s;"></div>`;
    html += `</div>`;
    html += `<div style="text-align: center; margin-bottom: 20px; color: #94a3b8;">${unlockedAchs} / ${totalAchs} achievements unlocked (${progress.toFixed(1)}%)</div>`;
    
    // Group achievements by rarity
    rarities.forEach(rarity => {
        const config = RARITY_CONFIG[rarity];
        const achs = game.achievements.filter(a => a.rarity === rarity);
        if (achs.length === 0) return;
        
        html += `<div style="margin-bottom: 20px;">`;
        html += `<div style="font-size: 16px; font-weight: bold; color: ${config.color}; margin-bottom: 10px; border-bottom: 2px solid ${config.color}; padding-bottom: 5px;">${config.icon} ${config.label} Achievements</div>`;
        
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;">`;
        achs.forEach(ach => {
            const isUnlocked = ach.unlocked;
            html += `<div style="background: ${isUnlocked ? config.bg : 'rgba(30, 30, 40, 0.5)'}; padding: 12px; border-radius: 8px; border: 1px solid ${isUnlocked ? config.color : '#374151'}; text-align: center; opacity: ${isUnlocked ? '1' : '0.5'};">`;
            html += `<div style="font-size: 20px; margin-bottom: 5px;">${isUnlocked ? '🏆' : '🔒'}</div>`;
            html += `<div style="font-size: 12px; font-weight: bold; color: ${isUnlocked ? config.color : '#6b7280'};">${isUnlocked ? ach.name : '???'}</div>`;
            if (isUnlocked) {
                html += `<div style="font-size: 10px; color: #94a3b8; margin-top: 3px;">+${(ach.bonus * 100).toFixed(0)}%</div>`;
            }
            html += `</div>`;
        });
        html += `</div>`;
        html += `</div>`;
    });
    
    container.innerHTML = html;
}

// Track last tick time for accurate background calculations
let lastTickTime = Date.now();

// Game loops
setInterval(function() {
    const now = Date.now();
    const deltaTime = (now - lastTickTime) / 1000;
    lastTickTime = now;
    
    const prod = getTotalProd();
    if (prod > 0) {
        // Use delta time to handle any gaps from throttling
        const gained = prod * deltaTime;
        game.energy += gained;
        game.totalEnergy += gained;
        update();
    }
}, 1000);

setInterval(function() {
    saveGame();
}, 30000);

window.addEventListener('beforeunload', function() {
    if (!window.resetInProgress) {
        saveGame();
    }
});

// Handle tab visibility change - recalculate earnings when tab becomes visible
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Calculate time since last tick
        const now = Date.now();
        const offlineTime = (now - lastTickTime) / 1000;
        
        // If more than 2 seconds passed, calculate missed earnings
        if (offlineTime > 2) {
            const prodPerSec = getTotalProd();
            const offlineGain = prodPerSec * offlineTime;
            
            if (offlineGain > 0) {
                game.energy += offlineGain;
                game.totalEnergy += offlineGain;
                
                // Show notification for significant gains (more than 10 seconds worth)
                if (offlineTime > 10) {
                    showAchievementNotification(
                        '⏰ Background Earnings',
                        '+' + fmt(offlineGain) + ' energy (' + fmtTime(offlineTime) + ')'
                    );
                }
                
                update();
            }
        }
        
        // Reset tick time
        lastTickTime = now;
        saveGame();
    } else if (document.visibilityState === 'hidden') {
        // Save when tab goes to background and update tick time
        lastTickTime = Date.now();
        saveGame();
    }
});

setTimeout(function() {
    loadGame();
    update();
    checkDominationOnLoad();
    initStarfield();
}, 0);

// ============================================
// ANIMATED STARFIELD BACKGROUND
// ============================================
const Starfield = {
    canvas: null,
    ctx: null,
    stars: [],
    shootingStars: [],
    nebulaClouds: [],
    animationId: null,
    evolutionLevel: 0,
    
    config: {
        // Star density increases with evolution
        baseStarCount: 100,
        starsPerEvolution: 20,
        maxStars: 300,
        
        // Evolution-based themes
        themes: [
            { bg: '#0f172a', starColor: '#ffffff', nebulaColor: 'rgba(100, 100, 150, 0.03)', speed: 0.2 },    // 0: Basic
            { bg: '#0f172a', starColor: '#a5b4fc', nebulaColor: 'rgba(99, 102, 241, 0.04)', speed: 0.3 },     // 1: Blue tint
            { bg: '#1e1b4b', starColor: '#c4b5fd', nebulaColor: 'rgba(139, 92, 246, 0.05)', speed: 0.4 },     // 2: Purple
            { bg: '#164e63', starColor: '#67e8f9', nebulaColor: 'rgba(6, 182, 212, 0.05)', speed: 0.5 },      // 3: Cyan
            { bg: '#14532d', starColor: '#6ee7b7', nebulaColor: 'rgba(16, 185, 129, 0.05)', speed: 0.5 },     // 4: Green
            { bg: '#451a03', starColor: '#fcd34d', nebulaColor: 'rgba(245, 158, 11, 0.05)', speed: 0.6 },     // 5: Amber
            { bg: '#431407', starColor: '#fdba74', nebulaColor: 'rgba(249, 115, 22, 0.05)', speed: 0.7 },     // 6: Orange
            { bg: '#500724', starColor: '#f9a8d4', nebulaColor: 'rgba(236, 72, 153, 0.06)', speed: 0.8 },     // 7: Pink
            { bg: '#450a0a', starColor: '#fca5a5', nebulaColor: 'rgba(239, 68, 68, 0.06)', speed: 0.9 },      // 8: Red
            { bg: '#422006', starColor: '#fde047', nebulaColor: 'rgba(250, 204, 21, 0.07)', speed: 1.0 },     // 9: Gold
            { bg: '#2e1065', starColor: '#e879f9', nebulaColor: 'rgba(168, 85, 247, 0.08)', speed: 1.2 }      // 10: Cosmic purple
        ]
    },
    
    init: function() {
        this.canvas = document.getElementById('starfield');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createStars();
        this.createNebulaClouds();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    },
    
    resize: function() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    
    createStars: function() {
        const starCount = Math.min(
            this.config.baseStarCount + (this.evolutionLevel * this.config.starsPerEvolution),
            this.config.maxStars
        );
        
        this.stars = [];
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.1,
                brightness: Math.random(),
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    },
    
    createNebulaClouds: function() {
        this.nebulaClouds = [];
        const cloudCount = 3 + Math.floor(this.evolutionLevel / 2);
        
        for (let i = 0; i < cloudCount; i++) {
            this.nebulaClouds.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 100 + Math.random() * 200,
                speed: 0.1 + Math.random() * 0.2
            });
        }
    },
    
    spawnShootingStar: function() {
        if (Math.random() > 0.995 - (this.evolutionLevel * 0.002)) {
            this.shootingStars.push({
                x: Math.random() * this.canvas.width,
                y: 0,
                length: 50 + Math.random() * 100,
                speed: 8 + Math.random() * 8,
                angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
                life: 1
            });
        }
    },
    
    updateEvolution: function(level) {
        if (level !== this.evolutionLevel) {
            this.evolutionLevel = level;
            this.createStars();
            this.createNebulaClouds();
        }
    },
    
    animate: function() {
        const theme = this.config.themes[Math.min(this.evolutionLevel, 10)];
        
        // Clear with background color (slight fade for trail effect)
        this.ctx.fillStyle = theme.bg;
        this.ctx.globalAlpha = 0.15;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalAlpha = 1;
        
        // Draw nebula clouds
        this.nebulaClouds.forEach(cloud => {
            cloud.x += cloud.speed * theme.speed;
            if (cloud.x > this.canvas.width + cloud.radius) {
                cloud.x = -cloud.radius;
            }
            
            const gradient = this.ctx.createRadialGradient(
                cloud.x, cloud.y, 0,
                cloud.x, cloud.y, cloud.radius
            );
            gradient.addColorStop(0, theme.nebulaColor);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw and update stars
        this.stars.forEach(star => {
            // Twinkle effect
            star.brightness += star.twinkleSpeed;
            if (star.brightness > 1 || star.brightness < 0.3) {
                star.twinkleSpeed *= -1;
            }
            
            // Parallax movement
            star.y += star.speed * theme.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
            
            // Draw star
            const alpha = star.brightness * 0.8 + 0.2;
            this.ctx.fillStyle = theme.starColor;
            this.ctx.globalAlpha = alpha;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        });
        
        // Spawn and draw shooting stars
        this.spawnShootingStar();
        this.shootingStars = this.shootingStars.filter(ss => {
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.life -= 0.02;
            
            if (ss.life <= 0) return false;
            
            // Draw shooting star trail
            const gradient = this.ctx.createLinearGradient(
                ss.x, ss.y,
                ss.x - Math.cos(ss.angle) * ss.length,
                ss.y - Math.sin(ss.angle) * ss.length
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.life})`);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(ss.x, ss.y);
            this.ctx.lineTo(
                ss.x - Math.cos(ss.angle) * ss.length * ss.life,
                ss.y - Math.sin(ss.angle) * ss.length * ss.life
            );
            this.ctx.stroke();
            
            return ss.y < this.canvas.height && ss.x < this.canvas.width;
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
};

function initStarfield() {
    Starfield.init();
}

function updateStarfieldEvolution(level) {
    if (Starfield.canvas) {
        Starfield.updateEvolution(level);
    }
}