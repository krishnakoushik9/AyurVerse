// DOM Elements
const enterSlider = document.getElementById('enterSlider');
const welcomeScreen = document.getElementById('welcomeScreen');
const modelViewer = document.getElementById('modelViewer');
const plantMenu = document.getElementById('plantMenu');
const loadingMessage = document.getElementById('loadingMessage');
const modelFrame = document.getElementById('modelFrame');
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// Configuration
const leafCount = 20; // Number of leaves
const fallDuration = 10; // Duration of each fall in seconds

// Function to create leaves and start falling animation
function createFallingLeaves() {
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    leaf.style.animationDuration = `${fallDuration + Math.random() * 5}s`; // Random fall duration for variation
    leaf.style.animationDelay = `${Math.random() * 5}s`; // Staggered start

    document.body.appendChild(leaf);

    // Remove leaf element after it falls off the screen
    leaf.addEventListener('animationend', () => {
      leaf.remove();
      createFallingLeaves(); // Recursively add new leaves for continuous effect
    });
  }
}

// Start the animation on page load
window.addEventListener('load', createFallingLeaves);


const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

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
