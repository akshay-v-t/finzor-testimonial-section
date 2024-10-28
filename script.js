const carouselContainer = document.querySelector('.carousel-container');
let carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;
let currentIndex = 0;
const visibleItemsCount = 3;
const containerWidth = 1200;
let intervalId;
let isPaused = false;
const additionalOffset = 20;
const itemWidth = containerWidth / visibleItemsCount;

// Clone items for smooth looping
function cloneItems() {
    const clonedStart = [];
    const clonedEnd = [];

    carouselItems.forEach((item) => {
        const cloneStart = item.cloneNode(true);
        const cloneEnd = item.cloneNode(true);
        clonedStart.push(cloneStart);
        clonedEnd.push(cloneEnd);
        carouselContainer.appendChild(cloneStart);
        carouselContainer.insertBefore(cloneEnd, carouselContainer.firstChild);
    });

    // Update carouselItems NodeList after cloning
    carouselItems = document.querySelectorAll('.carousel-item');
}

// Show the next item
function showNextItem() {
    if (isPaused) return;

    currentIndex++;

    const offset = -currentIndex * itemWidth + (containerWidth / 2 - itemWidth / 2) + additionalOffset;
    carouselContainer.style.transition = 'transform 6s ease';
    carouselContainer.style.transform = `translateX(${offset}px)`;

    if (currentIndex >= totalItems) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            currentIndex = 0;
            const resetOffset = -currentIndex * itemWidth + (containerWidth / 2 - itemWidth / 2) + additionalOffset;
            carouselContainer.style.transform = `translateX(${resetOffset}px)`;
        }, 6000);
    }
}

// Apply animation classes to alternate cards once
function applyAnimationClasses() {
    carouselItems.forEach((item, index) => {
        // Apply initial animation direction based on the index
        if (index % 2 === 0) {
            item.classList.add('down');
        } else {
            item.classList.add('up');
        }
    });
}

// Initialize the carousel
function initCarousel() {
    cloneItems();

    const initialOffset = (containerWidth / 2 - itemWidth / 2) + additionalOffset;
    carouselContainer.style.transform = `translateX(${initialOffset}px)`;

    function startCarousel() {
        clearInterval(intervalId); // Clear any existing interval before starting
        intervalId = setInterval(showNextItem, 6000);
        showNextItem(); // Start immediately
    }

    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
        isPaused = true;
    });

    carouselContainer.addEventListener('mouseleave', () => {
        isPaused = false;
        startCarousel(); // Restart immediately on mouse leave
    });

    applyAnimationClasses(); // Only apply once to avoid reset
    startCarousel(); // Start immediately on load
}

document.addEventListener('DOMContentLoaded', initCarousel);
