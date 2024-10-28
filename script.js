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

function cloneItems() {
    carouselItems.forEach(item => {
        carouselContainer.appendChild(item.cloneNode(true));
        carouselContainer.insertBefore(item.cloneNode(true), carouselContainer.firstChild);
    });
    carouselItems = document.querySelectorAll('.carousel-item');
}

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

function applyAnimationClasses() {
    carouselItems.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? 'down' : 'up');
    });
}

function startCarousel() {
    clearInterval(intervalId);
    intervalId = setInterval(showNextItem, 6000);
    showNextItem();
}

function initCarousel() {
    cloneItems();
    const initialOffset = (containerWidth / 2 - itemWidth / 2) + additionalOffset;
    carouselContainer.style.transform = `translateX(${initialOffset}px)`;

    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
        isPaused = true;
    });

    carouselContainer.addEventListener('mouseleave', () => {
        isPaused = false;
        startCarousel();
    });

    applyAnimationClasses();
    startCarousel();
}

document.addEventListener('DOMContentLoaded', initCarousel);
