// DOM Elements
const enterSlider = document.getElementById('enterSlider');
const welcomeScreen = document.getElementById('welcomeScreen');
const modelViewer = document.getElementById('modelViewer');
const plantMenu = document.getElementById('plantMenu');
const loadingMessage = document.getElementById('loadingMessage');
const modelFrame = document.getElementById('modelFrame');
const videoOverlay = document.getElementById('videoOverlay');
const introVideo = document.getElementById('introVideo');
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// Initialize cursor animation
const colors = [
    "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d", "#e36e5c", "#df685c",
    "#d5585c", "#d1525c", "#c5415d", "#c03b5d", "#b22c5e", "#ac265e", "#9c155f", "#950f5f",
    "#830060", "#7c0060", "#680060", "#60005f", "#48005f", "#3d005e"
];

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

// Video handling
document.addEventListener('DOMContentLoaded', function() {
    welcomeScreen.style.opacity = '0';
    videoOverlay.style.display = 'block';
    introVideo.play();
    
    introVideo.addEventListener('ended', function() {
        // Fade out video
        videoOverlay.style.opacity = '0';
        videoOverlay.style.transition = 'opacity 1s ease-out';
        
        // Fade in welcome screen
        setTimeout(() => {
            videoOverlay.style.display = 'none';
            welcomeScreen.style.display = 'flex';
            welcomeScreen.style.opacity = '1';
        }, 1000);
    });
    
    // Hide all popups initially
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.style.display = 'none');
    
    // Hide development notice
    const developmentNotice = document.getElementById('developmentNotice');
    if (developmentNotice) {
        developmentNotice.style.display = 'none';
    }
});

// Cursor animation
window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function redirectToSuggestions() {
    window.location.href = 'suggestions.html';
}

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";
        circle.style.scale = (circles.length - index) / circles.length;
        
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
   
    requestAnimationFrame(animateCircles);
}

animateCircles();

// Slider and Navigation
enterSlider.addEventListener('input', function() {
    if (parseInt(this.value) >= 100) {
        showPlantMenu();
    }
});

function showPlantMenu() {
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        plantMenu.style.display = 'block';
        plantMenu.style.opacity = '0';
        
        // Force reflow
        void plantMenu.offsetWidth;
        
        plantMenu.style.opacity = '1';
        plantMenu.style.transition = 'opacity 0.5s ease-in';
    }, 500);
}

function showWelcomeScreen() {
    modelViewer.style.display = 'none';
    plantMenu.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    welcomeScreen.style.opacity = '1';
    enterSlider.value = 0;
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
