// DOM Elements
const enterSlider = document.getElementById('enterSlider');
const welcomeScreen = document.getElementById('welcomeScreen');
const modelViewer = document.getElementById('modelViewer');
const plantMenu = document.getElementById('plantMenu');
const loadingMessage = document.getElementById('loadingMessage');
const modelFrame = document.getElementById('modelFrame');

// Event Listeners
enterSlider.addEventListener('input', function() {
    if (this.value == 100) {
        showPlantMenu();
    }
});

// Navigation Functions
function showPlantMenu() {
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        plantMenu.style.display = 'block';
    }, 500);
}

function showWelcomeScreen() {
    modelViewer.style.display = 'none';
    plantMenu.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    welcomeScreen.style.opacity = '1';
    enterSlider.value = 0;
    
    // Reset model frame
    modelFrame.src = 'about:blank';
}

function showCurryLeafModel() {
    plantMenu.style.display = 'none';
    modelViewer.style.display = 'flex';
    loadingMessage.style.display = 'block';
    
    setTimeout(() => {
        loadingMessage.style.display = 'none';
        modelFrame.src = "https://lumalabs.ai/embed/c9bfc7e0-826b-4611-a142-cce50ebe8717?mode=sparkles&background=%23ffffff&color=%23000000&showTitle=true&loadBg=true&logoPosition=bottom-left&infoPosition=bottom-right&cinematicVideo=undefined&showMenu=false";
    }, 2000);
}

// Popup Management
function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
    }
}

function hidePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none';
    }
}

function showTeamInfo() {
    showPopup('teamInfo');
}

// Development Notice Management
function showDevelopmentNotice() {
    const notice = document.getElementById('developmentNotice');
    if (notice) {
        notice.style.display = 'block';
    }
}

function hideDevelopmentNotice() {
    const notice = document.getElementById('developmentNotice');
    if (notice) {
        notice.style.display = 'none';
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Error loading resource:', e.target);
    if (e.target.tagName === 'IFRAME') {
        loadingMessage.textContent = 'Error loading model. Please try again later.';
        loadingMessage.style.display = 'block';
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Reset all views to initial state
    showWelcomeScreen();
    
    // Ensure all popups are hidden initially
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.style.display = 'none');
    
    // Hide development notice
    const developmentNotice = document.getElementById('developmentNotice');
    if (developmentNotice) {
        developmentNotice.style.display = 'none';
    }
});
