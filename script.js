// HackShield Academy - Main JavaScript Functions

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize score display
    updateScoreDisplay();
    
    // Initialize leaderboards with bot players
    initializeLeaderboards();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Update user display
    updateUserDisplay();
}

function initializeLeaderboards() {
    // Initialize individual game leaderboards with bot players
    const gameLeaderboards = {
        phishing: [
            { name: "CyberGuardian", score: 250 },
            { name: "PhishHunter", score: 230 },
            { name: "EmailDefender", score: 215 },
            { name: "SpamSlayer", score: 200 },
            { name: "ThreatDetector", score: 185 }
        ],
        password: [
            { name: "SecureBuilder", score: 180 },
            { name: "PassMaster", score: 165 },
            { name: "CryptoKeeper", score: 150 },
            { name: "SafetyFirst", score: 135 },
            { name: "KeyGuardian", score: 120 }
        ],
        scam: [
            { name: "ScamBuster", score: 220 },
            { name: "ChatDefender", score: 205 },
            { name: "SocialShield", score: 190 },
            { name: "TrickSpotter", score: 175 },
            { name: "FraudFighter", score: 160 }
        ],
        quiz: [
            { name: "QuizMaster", score: 200 },
            { name: "KnowledgeKing", score: 185 },
            { name: "CyberExpert", score: 170 },
            { name: "InfoGuard", score: 155 },
            { name: "SecuritySage", score: 140 }
        ]
    };
    
    // Initialize if not exists
    Object.keys(gameLeaderboards).forEach(game => {
        const key = `${game}_leaderboard`;
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(gameLeaderboards[game]));
        }
    });
}

function updateUserDisplay() {
    const userElements = document.querySelectorAll('#currentUser, #currentUserMobile');
    userElements.forEach(element => {
        if (element) {
            element.textContent = 'Guest';
        }
    });
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Also setup mobile menu button for other pages
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuDiv = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenuDiv) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuDiv.classList.toggle('hidden');
        });
    }
}

function promptForName() {
    const name = prompt('Congratulations! Enter your name for the leaderboard:');
    return name && name.trim() ? name.trim() : 'Anonymous';
}

function updateGameLeaderboard(gameType, playerName, score) {
    const key = `${gameType}_leaderboard`;
    let leaderboard = JSON.parse(localStorage.getItem(key) || '[]');
    
    // Add player score
    leaderboard.push({ name: playerName, score: score });
    
    // Sort by score (descending)
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    leaderboard = leaderboard.slice(0, 10);
    
    localStorage.setItem(key, JSON.stringify(leaderboard));
    
    // Return player's position
    const playerPosition = leaderboard.findIndex(player => player.name === playerName && player.score === score) + 1;
    return { position: playerPosition, total: leaderboard.length };
}

function promptForUsername() {
    const username = prompt('Welcome to HackShield Academy! Please enter your username:');
    if (username && username.trim()) {
        localStorage.setItem('hackshield_username', username.trim());
        showWelcomeMessage(username.trim());
    }
}

function showWelcomeMessage(username) {
    // Create welcome toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50';
    toast.innerHTML = `Welcome, ${username}! Ready to become a cyber defender? 🛡️`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function updateScoreDisplay() {
    const totalScore = getTotalScore();
    const phishingScore = parseInt(localStorage.getItem('hackshield_phishing_score') || '0');
    const passwordScore = parseInt(localStorage.getItem('hackshield_password_score') || '0');
    const scamScore = parseInt(localStorage.getItem('hackshield_scam_score') || '0');
    const quizScore = parseInt(localStorage.getItem('hackshield_quiz_score') || '0');
    
    // Update total score elements
    const totalScoreElements = document.querySelectorAll('#totalScore, #heroScore, #totalScoreMobile');
    totalScoreElements.forEach(element => {
        if (element) {
            element.textContent = totalScore;
        }
    });
    
    // Update individual score elements
    const phishingElements = document.querySelectorAll('#phishingScore');
    phishingElements.forEach(element => {
        if (element) {
            element.textContent = phishingScore;
        }
    });
    
    const passwordElements = document.querySelectorAll('#passwordScore');
    passwordElements.forEach(element => {
        if (element) {
            element.textContent = passwordScore;
        }
    });
    
    const scamElements = document.querySelectorAll('#scamScore');
    scamElements.forEach(element => {
        if (element) {
            element.textContent = scamScore;
        }
    });
    
    const quizElements = document.querySelectorAll('#quizScore');
    quizElements.forEach(element => {
        if (element) {
            element.textContent = quizScore;
        }
    });
}

function getTotalScore() {
    const phishingScore = parseInt(localStorage.getItem('hackshield_phishing_score') || '0');
    const passwordScore = parseInt(localStorage.getItem('hackshield_password_score') || '0');
    const scamScore = parseInt(localStorage.getItem('hackshield_scam_score') || '0');
    const quizScore = parseInt(localStorage.getItem('hackshield_quiz_score') || '0');
    
    return phishingScore + passwordScore + scamScore + quizScore;
}

function updateScore(gameType, points) {
    const currentScore = parseInt(localStorage.getItem(`hackshield_${gameType}_score`) || '0');
    const newScore = currentScore + points;
    localStorage.setItem(`hackshield_${gameType}_score`, newScore.toString());
    
    updateScoreDisplay();
    updateLeaderboard();
    showScoreNotification(points);
}

function showScoreNotification(points) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 bounce-effect';
    notification.innerHTML = `+${points} points! 🎉`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function updateLeaderboard() {
    const username = localStorage.getItem('hackshield_username');
    const totalScore = getTotalScore();
    
    if (!username) return;
    
    let leaderboard = JSON.parse(localStorage.getItem('hackshield_leaderboard') || '[]');
    
    // Find existing entry or create new one
    const existingIndex = leaderboard.findIndex(entry => entry.username === username);
    
    if (existingIndex !== -1) {
        leaderboard[existingIndex].score = totalScore;
    } else {
        leaderboard.push({ username, score: totalScore });
    }
    
    // Sort by score (descending)
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 10
    leaderboard = leaderboard.slice(0, 10);
    
    localStorage.setItem('hackshield_leaderboard', JSON.stringify(leaderboard));
}

function showFeedback(isCorrect, message, element) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback-${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.textContent = message;
    
    if (element) {
        element.parentNode.insertBefore(feedbackDiv, element.nextSibling);
    } else {
        document.body.appendChild(feedbackDiv);
    }
    
    setTimeout(() => {
        feedbackDiv.remove();
    }, 3000);
}

function playSound(type) {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'correct':
            oscillator.frequency.value = 800;
            break;
        case 'incorrect':
            oscillator.frequency.value = 200;
            break;
        case 'achievement':
            oscillator.frequency.value = 1000;
            break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other files
window.HackShield = {
    updateScore,
    showFeedback,
    playSound,
    getTotalScore,
    updateScoreDisplay,
    shuffleArray,
    debounce,
    promptForName,
    updateGameLeaderboard,
    initializeMobileMenu: setupMobileMenu
};
