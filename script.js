const carouselContainer = document.querySelector('.carousel-container');
let carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;
let currentIndex = 0;
let toggle = true;
const visibleItemsCount = 3;
const containerWidth = 1200;
let intervalId;
let isPaused = false;
const additionalOffset = 20; // Adjust this value to move the carousel right

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
    if (isPaused) return; // Don't proceed if paused

    applyAnimationClasses();

    currentIndex++;

    const itemWidth = containerWidth / visibleItemsCount;
    const offset = -currentIndex * itemWidth + (containerWidth / 2 - itemWidth / 2) + additionalOffset;
    carouselContainer.style.transition = 'transform 2s ease';
    carouselContainer.style.transform = `translateX(${offset}px)`;

    if (currentIndex >= totalItems) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            currentIndex = 0;
            const resetOffset = -currentIndex * itemWidth + (containerWidth / 2 - itemWidth / 2) + additionalOffset;
            carouselContainer.style.transform = `translateX(${resetOffset}px)`;
        }, 2000);
    }
}

// Apply animation classes to alternate cards
function applyAnimationClasses() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('up', 'down');
        if (toggle) {
            item.classList.add(index % 2 === 0 ? 'down' : 'up');
        } else {
            item.classList.add(index % 2 === 0 ? 'up' : 'down');
        }
    });
    toggle = !toggle;
}

function initCarousel() {
    cloneItems();

    const itemWidth = containerWidth / visibleItemsCount;
    const initialOffset = (containerWidth / 2 - itemWidth / 2) + additionalOffset;
    carouselContainer.style.transform = `translateX(${initialOffset}px)`;

    function startCarousel() {
        showNextItem();
        intervalId = setInterval(showNextItem, 6000);
    }

    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
        isPaused = true; // Set paused state
    });

    carouselContainer.addEventListener('mouseleave', () => {
        isPaused = false; // Clear paused state
        startCarousel(); // Restart carousel
    });

    setTimeout(startCarousel, 1000);
}

document.addEventListener('DOMContentLoaded', initCarousel);