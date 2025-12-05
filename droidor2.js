// DROIDOR GAME - Complete Working Version

const CONFIG = {
    evolutions: [
        { id: 0, name: "Rusty Prototype", cost: 0, prodBonus: 0, unlocked: true, icon: "🔩", bg: "#0f172a" },
        { id: 1, name: "Clunky Bot", cost: 1000000, prodBonus: 0.3, unlocked: false, icon: "🤖", bg: "#0f172a", genId: 1 },
        { id: 2, name: "AI Unit", cost: 10000000, prodBonus: 0.4, unlocked: false, icon: "🦾", bg: "#1e1b4b", genId: 2 },
        { id: 3, name: "Quantum Mind", cost: 100000000, prodBonus: 0.5, unlocked: false, icon: "🧠", bg: "#1e1b4b", genId: 3 },
        { id: 4, name: "Neural Mesh", cost: 1000000000, prodBonus: 0.6, unlocked: false, icon: "🕸️", bg: "#312e81", genId: 4 },
        { id: 5, name: "Cosmic Swarm", cost: 10000000000, prodBonus: 0.7, unlocked: false, icon: "✨", bg: "#312e81", genId: 5 },
        { id: 6, name: "Star Forge", cost: 100000000000, prodBonus: 0.8, unlocked: false, icon: "⭐", bg: "#4c1d95", genId: 6 },
        { id: 7, name: "Galaxy Core", cost: 1000000000000, prodBonus: 1.0, unlocked: false, icon: "🌌", bg: "#4c1d95", genId: 7 },
        { id: 8, name: "Reality Weaver", cost: 10000000000000, prodBonus: 1.2, unlocked: false, icon: "🌀", bg: "#581c87", genId: 8 },
        { id: 9, name: "Universe Architect", cost: 100000000000000, prodBonus: 1.5, unlocked: false, icon: "🌟", bg: "#581c87", genId: 9 },
        { id: 10, name: "Infinite Entity", cost: 1000000000000000, prodBonus: 2.0, unlocked: false, icon: "♾️", bg: "#581c87", genId: 10 }
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
        { id: 2, name: 'Auto-Clicker I', cost: 500, idle: 5, req: 0, owned: false, desc: '+5 energy/s' },
        { id: 3, name: 'Bulk Discount I', cost: 1000, type: 'discount', discount: 0.05, req: 0, owned: false, desc: '-5% generator costs' },
        { id: 4, name: 'Production Boost I', cost: 0, mult: 1.1, req: 0, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 5, name: 'Energy Burst I', cost: 0, type: 'burst', burstMult: 33, req: 0, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 6, name: 'Enhanced Fingers II', cost: 5000, clickMult: 1.25, req: 1, owned: false, desc: '+25% click power' },
        { id: 7, name: 'Auto-Clicker II', cost: 10000, idleMult: 1.1, req: 1, owned: false, desc: '+10% idle production' },
        { id: 8, name: 'Bulk Discount II', cost: 25000, type: 'discount', discount: 0.05, req: 1, owned: false, desc: '-5% generator costs' },
        { id: 9, name: 'Production Boost II', cost: 0, mult: 1.1, req: 1, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 10, name: 'Energy Burst II', cost: 0, type: 'burst', burstMult: 33, req: 1, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 11, name: 'Enhanced Fingers III', cost: 100000, clickMult: 1.25, req: 2, owned: false, desc: '+25% click power' },
        { id: 12, name: 'Auto-Clicker III', cost: 250000, idleMult: 1.1, req: 2, owned: false, desc: '+10% idle production' },
        { id: 13, name: 'Bulk Discount III', cost: 500000, type: 'discount', discount: 0.05, req: 2, owned: false, desc: '-5% generator costs' },
        { id: 14, name: 'Production Boost III', cost: 0, mult: 1.1, req: 2, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 15, name: 'Energy Burst III', cost: 0, type: 'burst', burstMult: 33, req: 2, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 16, name: 'Enhanced Fingers IV', cost: 2500000, clickMult: 1.25, req: 3, owned: false, desc: '+25% click power' },
        { id: 17, name: 'Auto-Clicker IV', cost: 5000000, idleMult: 1.1, req: 3, owned: false, desc: '+10% idle production' },
        { id: 18, name: 'Bulk Discount IV', cost: 10000000, type: 'discount', discount: 0.05, req: 3, owned: false, desc: '-5% generator costs' },
        { id: 19, name: 'Production Boost IV', cost: 0, mult: 1.1, req: 3, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 20, name: 'Energy Burst IV', cost: 0, type: 'burst', burstMult: 33, req: 3, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 21, name: 'Enhanced Fingers V', cost: 50000000, clickMult: 1.25, req: 4, owned: false, desc: '+25% click power' },
        { id: 22, name: 'Auto-Clicker V', cost: 100000000, idleMult: 1.1, req: 4, owned: false, desc: '+10% idle production' },
        { id: 23, name: 'Bulk Discount V', cost: 250000000, type: 'discount', discount: 0.05, req: 4, owned: false, desc: '-5% generator costs' },
        { id: 24, name: 'Production Boost V', cost: 0, mult: 1.1, req: 4, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 25, name: 'Energy Burst V', cost: 0, type: 'burst', burstMult: 33, req: 4, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 26, name: 'Enhanced Fingers VI', cost: 1000000000, clickMult: 1.25, req: 5, owned: false, desc: '+25% click power' },
        { id: 27, name: 'Auto-Clicker VI', cost: 2500000000, idleMult: 1.1, req: 5, owned: false, desc: '+10% idle production' },
        { id: 28, name: 'Bulk Discount VI', cost: 5000000000, type: 'discount', discount: 0.05, req: 5, owned: false, desc: '-5% generator costs' },
        { id: 29, name: 'Production Boost VI', cost: 0, mult: 1.1, req: 5, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 30, name: 'Energy Burst VI', cost: 0, type: 'burst', burstMult: 33, req: 5, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 31, name: 'Enhanced Fingers VII', cost: 25000000000, clickMult: 1.25, req: 6, owned: false, desc: '+25% click power' },
        { id: 32, name: 'Auto-Clicker VII', cost: 50000000000, idleMult: 1.1, req: 6, owned: false, desc: '+10% idle production' },
        { id: 33, name: 'Bulk Discount VII', cost: 100000000000, type: 'discount', discount: 0.05, req: 6, owned: false, desc: '-5% generator costs' },
        { id: 34, name: 'Production Boost VII', cost: 0, mult: 1.1, req: 6, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 35, name: 'Energy Burst VII', cost: 0, type: 'burst', burstMult: 33, req: 6, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 36, name: 'Enhanced Fingers VIII', cost: 500000000000, clickMult: 1.25, req: 7, owned: false, desc: '+25% click power' },
        { id: 37, name: 'Auto-Clicker VIII', cost: 1000000000000, idleMult: 1.1, req: 7, owned: false, desc: '+10% idle production' },
        { id: 38, name: 'Bulk Discount VIII', cost: 2500000000000, type: 'discount', discount: 0.05, req: 7, owned: false, desc: '-5% generator costs' },
        { id: 39, name: 'Production Boost VIII', cost: 0, mult: 1.1, req: 7, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 40, name: 'Energy Burst VIII', cost: 0, type: 'burst', burstMult: 33, req: 7, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 41, name: 'Enhanced Fingers IX', cost: 10000000000000, clickMult: 1.25, req: 8, owned: false, desc: '+25% click power' },
        { id: 42, name: 'Auto-Clicker IX', cost: 25000000000000, idleMult: 1.1, req: 8, owned: false, desc: '+10% idle production' },
        { id: 43, name: 'Bulk Discount IX', cost: 50000000000000, type: 'discount', discount: 0.05, req: 8, owned: false, desc: '-5% generator costs' },
        { id: 44, name: 'Production Boost IX', cost: 0, mult: 1.1, req: 8, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 45, name: 'Energy Burst IX', cost: 0, type: 'burst', burstMult: 33, req: 8, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 46, name: 'Enhanced Fingers X', cost: 250000000000000, clickMult: 1.25, req: 9, owned: false, desc: '+25% click power' },
        { id: 47, name: 'Auto-Clicker X', cost: 500000000000000, idleMult: 1.1, req: 9, owned: false, desc: '+10% idle production' },
        { id: 48, name: 'Bulk Discount X', cost: 1000000000000000, type: 'discount', discount: 0.05, req: 9, owned: false, desc: '-5% generator costs' },
        { id: 49, name: 'Production Boost X', cost: 0, mult: 1.1, req: 9, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 50, name: 'Energy Burst X', cost: 0, type: 'burst', burstMult: 33, req: 9, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 },
        { id: 51, name: 'Enhanced Fingers XI', cost: 5000000000000000, clickMult: 1.25, req: 10, owned: false, desc: '+25% click power' },
        { id: 52, name: 'Auto-Clicker XI', cost: 10000000000000000, idleMult: 1.1, req: 10, owned: false, desc: '+10% idle production' },
        { id: 53, name: 'Bulk Discount XI', cost: 25000000000000000, type: 'discount', discount: 0.05, req: 10, owned: false, desc: '-5% generator costs' },
        { id: 54, name: 'Production Boost XI', cost: 0, mult: 1.1, req: 10, owned: false, desc: '+10% all production', dynamicCost: true, baseHours: 1 },
        { id: 55, name: 'Energy Burst XI', cost: 0, type: 'burst', burstMult: 33, req: 10, owned: false, desc: 'Instant energy boost', dynamicCost: true, baseHours: 1 }
    ],
    planets: [
        { id: 1, name: 'Earth', cost: 0, bonus: 0, icon: '🌍', owned: true },
        { id: 2, name: 'Mars', cost: 1000000000, bonus: 0.05, icon: '🔴', owned: false },
        { id: 3, name: 'Venus', cost: 5000000000, bonus: 0.08, icon: '🟡', owned: false },
        { id: 4, name: 'Mercury', cost: 15000000000, bonus: 0.12, icon: '⚪', owned: false },
        { id: 5, name: 'Jupiter', cost: 50000000000, bonus: 0.15, icon: '🟠', owned: false }
    ],
    achievements: [
        { id: 'click100', name: 'Clicker Novice', desc: '100 clicks', requirement: 100, bonus: 0.01, unlocked: false },
        { id: 'click1000', name: 'Click Master', desc: '1,000 clicks', requirement: 1000, bonus: 0.01, unlocked: false },
        { id: 'click10000', name: 'Droidor Monster', desc: '10,000 clicks', requirement: 10000, bonus: 0.01, unlocked: false },
        { id: 'gen100', name: 'Mass Production', desc: 'Own 100 total generators', requirement: 100, bonus: 0.1, type: 'nextGen', unlocked: false },
        { id: 'gen1_10', name: 'Assembly Starter', desc: '10 Assembly Lines', requirement: 10, genId: 1, bonus: 0.1, tier: 1, unlocked: false },
        { id: 'gen1_50', name: 'Assembly Builder', desc: '50 Assembly Lines', requirement: 50, genId: 1, bonus: 0.1, tier: 2, unlocked: false },
        { id: 'gen1_100', name: 'Assembly Master', desc: '100 Assembly Lines', requirement: 100, genId: 1, bonus: 0.1, tier: 3, unlocked: false },
        { id: 'gen2_10', name: 'Power Apprentice', desc: '10 Power Grids', requirement: 10, genId: 2, bonus: 0.1, tier: 1, unlocked: false },
        { id: 'gen2_50', name: 'Power Engineer', desc: '50 Power Grids', requirement: 50, genId: 2, bonus: 0.1, tier: 2, unlocked: false },
        { id: 'gen3_10', name: 'Memory Keeper', desc: '10 Memory Banks', requirement: 10, genId: 3, bonus: 0.1, tier: 1, unlocked: false }
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
    synergy: false,
    secretClicks: 0,
    galaxyUnlocked: false,
    galaxyPerm: false,
    lastSaveTime: Date.now()
};

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
    game.lastSaveTime = Date.now();
    localStorage.setItem('droidor_save', JSON.stringify(game));
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
            
            if (!game.evolutions || game.evolutions.length < CONFIG.evolutions.length) {
                const oldEvolution = game.evolution || 0;
                game.evolutions = JSON.parse(JSON.stringify(CONFIG.evolutions));
                for (let i = 0; i <= oldEvolution && i < game.evolutions.length; i++) {
                    game.evolutions[i].unlocked = true;
                }
            }
            
            if (game.ups.length < CONFIG.ups.length) {
                game.ups = JSON.parse(JSON.stringify(CONFIG.ups));
            }
            
            if (offlineTime > 60) {
                const prodPerSec = getTotalProd();
                const offlineGain = prodPerSec * offlineTime;
                
                if (offlineGain > 0) {
                    game.energy += offlineGain;
                    game.totalEnergy += offlineGain;
                    showOfflinePopup(offlineGain, offlineTime, false);
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
    const baseCost = Math.floor(gen.cost * Math.pow(1.2, gen.owned));
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
    return m;
}

function getGeneratorBonus(genId) {
    let bonus = 1;
    const genAchs = game.achievements.filter(a => a.genId === genId && a.unlocked);
    genAchs.forEach(ach => {
        bonus *= (1 + ach.bonus);
    });
    const gen100Ach = game.achievements.find(a => a.id === 'gen100' && a.unlocked);
    if (gen100Ach && genId > 1) {
        const totalGens = game.gens.reduce((sum, g) => sum + g.owned, 0);
        if (totalGens >= 100) {
            const firstLowGen = game.gens.find(g => g.owned < 100);
            if (firstLowGen && firstLowGen.id === genId) {
                bonus *= (1 + gen100Ach.bonus);
            }
        }
    }
    if (game.evolution >= genId) {
        bonus *= 2;
        if (genId > 1) {
            const prevGen = game.gens.find(g => g.id === genId - 1);
            if (prevGen) {
                if (prevGen.owned >= 10) bonus *= 1.1;
                if (prevGen.owned >= 30) bonus *= 1.1;
                if (prevGen.owned >= 50) bonus *= 1.1;
                if (prevGen.owned >= 100) bonus *= 1.1;
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
    
    // Add 5% of per-second production to click power (keeps clicks relevant)
    const prodBonus = getTotalProd() * 0.05;
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
    return getTotalProd() * 0.05;
}

function getTotalProd() {
    const genProd = game.gens.reduce((s, g) => {
        const bonus = getGeneratorBonus(g.id);
        return s + (g.owned * g.prod * bonus);
    }, 0);
    return (genProd + (game.idleRate * game.idleRateMult)) * getTotalMult();
}
function showAchievementNotification(title, message) {
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
function buyGen(id) {
    const gen = game.gens.find(function(g) { return g.id === id; });
    const cost = getGenCost(gen);
    if (game.energy >= cost) {
        // Calculate total generators BEFORE purchase
        const oldTotalGens = game.gens.reduce((s, g) => s + g.owned, 0);
        
        game.energy -= cost;
        const oldCount = gen.owned;
        gen.owned++;
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
                newTotalGens + ' generators owned → +' + totalBonus + '% click power'
            );
        }
        
        if (game.evolution >= gen.id + 1) {
            const milestones = [10, 30, 50, 100];
            milestones.forEach(function(milestone) {
                if (oldCount < milestone && newCount >= milestone) {
                    const nextGen = game.gens.find(g => g.id === gen.id + 1);
                    if (nextGen) {
                        showAchievementNotification(
                            '🔗 Cascade Bonus Unlocked!',
                            gen.icon + ' ' + gen.name + ' (' + milestone + ') →+10% to ' + nextGen.icon + ' ' + nextGen.name
                        );
                    }
                }
            });
        }
        
        checkAchievements();
        update();
    }
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
    
    if (up.type === 'burst') {
        const currentProd = getTotalProd();
        const burstAmount = currentProd * up.burstMult;
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
    confirmMsg += '✨ +' + (evo.prodBonus * 100).toFixed(0) + '% Global Production\n';
    
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
    
    let notifMsg = '✨ +' + (evo.prodBonus * 100).toFixed(0) + '% Global Production';
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
    game.energy -= p.cost;
    p.owned = true;
    update();
    showAchievementNotification(p.name + ' Conquered!', '+' + (p.bonus * 100) + '% production bonus!');
}

function checkAchievements() {
    game.achievements.forEach(function(ach) {
        if (ach.unlocked) return;
        if (ach.id.startsWith('click')) {
            if (game.totalClicks >= ach.requirement) {
                ach.unlocked = true;
                showAchievementNotification(ach.name, '+' + (ach.bonus * 100) + '% production bonus!');
            }
        }
        if (ach.id === 'gen100') {
            const totalGens = game.gens.reduce(function(sum, g) { return sum + g.owned; }, 0);
            if (totalGens >= ach.requirement) {
                ach.unlocked = true;
                showAchievementNotification(ach.name, 'Next generator gets +10% production bonus!');
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
    document.getElementById('gameBody').style.background = curEvo.bg;
    
    if (game.evolution > 0) {
        document.getElementById('evolutionBadgeDiv').style.display = 'flex';
        document.getElementById('evolutionBadge').textContent = game.evolution;
        const evoTooltip = document.getElementById('evolutionTooltipContent');
        if (evoTooltip) {
            let html = '<div class="prestige-tooltip-item">✨ Production: +' + (curEvo.prodBonus * 100).toFixed(0) + '%</div>';
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
        if (bonus > 1) {
            html += '<div style="font-size: 10px; color: #facc15; margin-bottom: 3px;">×' + bonus.toFixed(2) + ' bonus</div>';
        }
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
        const totalProd = gen.owned * gen.prod * getTotalMult() * genBonus;
        const perGenProd = gen.prod * getTotalMult() * genBonus;
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
        html += '<div style="font-size: 14px; color: #22d3ee; font-weight: bold;">' + fmt(perGenProd) + '/s</div>';
        if (genBonus > 1) {
            html += '<div style="font-size: 11px; color: #facc15;">(×' + genBonus.toFixed(2) + ' bonus)</div>';
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
        
        // Bottom row: buy button
        html += '<button class="buy-button" onclick="buyGen(' + gen.id + ')" ';
        if (game.energy < cost) html += 'disabled';
        html += '>Buy - ' + fmt(cost) + '</button>';
        
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
            const currentProd = getTotalProd();
            const burstAmount = currentProd * up.burstMult;
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
        html += '✨ <span style="color: #4ade80; font-weight: bold;">+' + (nextEvo.prodBonus * 100).toFixed(0) + '%</span> Global Production Multiplier<br>';
        
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
                cardHTML += '<div style="font-size: 11px; color: #94a3b8;">+' + (evo.prodBonus * 100).toFixed(0) + '% production';
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
        rightHTML += (p.bonus > 0 ? '+' + (p.bonus * 100) + '%' : '---') + '</div>';
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
            clickHTML += '<span style="color: #22d3ee; font-weight: bold;">+' + (genClickBonus * 100).toFixed(0) + '%</span></div>';
        }
        
        const prodClickBonus = getProdClickBonus();
        if (prodClickBonus > 0) {
            clickHTML += '<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">';
            clickHTML += '<span style="color: #94a3b8;">Production Bonus (5% of /s):</span>';
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
            prodHTML += '<span style="color: #facc15; font-weight: bold;">+' + (curEvo.prodBonus * 100).toFixed(0) + '%</span></div>';
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
        const genAchs = game.achievements.filter(a => a.genId);
        const specialAchs = game.achievements.filter(a => !a.id.startsWith('click') && !a.genId);
        
        if (clickAchs.length > 0) {
            achHTML += '<div style="font-size: 14px; font-weight: bold; color: #93c5fd; margin: 15px 0 10px;">🖱️ Click Achievements</div>';
            clickAchs.forEach(ach => {
                achHTML += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: ' + (ach.unlocked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(51, 65, 85, 0.3)') + '; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid ' + (ach.unlocked ? '#22c55e' : '#475569') + ';">';
                achHTML += '<div><div style="font-size: 13px; font-weight: bold; color: ' + (ach.unlocked ? '#4ade80' : '#94a3b8') + ';">' + (ach.unlocked ? '✓' : '○') + ' ' + ach.name + '</div>';
                achHTML += '<div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">' + ach.desc + '</div></div>';
                achHTML += '<div style="text-align: right;"><div style="font-size: 11px; color: #22d3ee;">' + (ach.unlocked ? '+' + (ach.bonus * 100) + '%' : game.totalClicks + '/' + ach.requirement) + '</div></div>';
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
        
        if (specialAchs.length > 0) {
            achHTML += '<div style="font-size: 14px; font-weight: bold; color: #93c5fd; margin: 15px 0 10px;">⭐ Special Achievements</div>';
            specialAchs.forEach(ach => {
                const totalGens = game.gens.reduce((s, g) => s + g.owned, 0);
                achHTML += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: ' + (ach.unlocked ? 'rgba(34, 197, 94, 0.1)' : 'rgba(51, 65, 85, 0.3)') + '; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid ' + (ach.unlocked ? '#22c55e' : '#475569') + ';">';
                achHTML += '<div><div style="font-size: 13px; font-weight: bold; color: ' + (ach.unlocked ? '#4ade80' : '#94a3b8') + ';">' + (ach.unlocked ? '✓' : '○') + ' ' + ach.name + '</div>';
                achHTML += '<div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">' + ach.desc + '</div></div>';
                achHTML += '<div style="text-align: right;"><div style="font-size: 11px; color: #22d3ee;">' + (ach.unlocked ? 'Unlocked!' : totalGens + '/' + ach.requirement) + '</div></div>';
                achHTML += '</div>';
            });
        }
        
        achievementsList.innerHTML = achHTML;
    }
}

// Game loops
setInterval(function() {
    const prod = getTotalProd();
    if (prod > 0) {
        game.energy += prod;
        game.totalEnergy += prod;
        update();
    }
}, 1000);

setInterval(function() {
    saveGame();
}, 30000);

window.addEventListener('beforeunload', function() {
    saveGame();
});

// Handle tab visibility change - recalculate earnings when tab becomes visible
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Calculate time since last save
        const now = Date.now();
        const lastSave = game.lastSaveTime || now;
        const offlineTime = (now - lastSave) / 1000;
        
        // If more than 2 seconds passed (accounting for minor delays), calculate earnings
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
        
        // Update the save time
        saveGame();
    } else if (document.visibilityState === 'hidden') {
        // Save when tab goes to background
        saveGame();
    }
});

setTimeout(function() {
    loadGame();
    update();
}, 0);