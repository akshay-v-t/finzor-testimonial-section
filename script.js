const carouselContainer = document.querySelector('.carousel-container');
let carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;
const visibleItemsCount = 3;
const containerWidth = 1200;
const additionalOffset = 20;
const itemWidth = containerWidth / visibleItemsCount;
let currentIndex = 0;
let intervalId, isPaused = false;

function cloneItems() {
    const clonesStart = Array.from(carouselItems).map(item => item.cloneNode(true));
    const clonesEnd = Array.from(carouselItems).map(item => item.cloneNode(true));

    clonesEnd.forEach(clone => carouselContainer.appendChild(clone));
    clonesStart.reverse().forEach(clone => carouselContainer.insertBefore(clone, carouselContainer.firstChild));

    carouselItems = document.querySelectorAll('.carousel-item'); 
}

function updateTransform() {
    const offset = -currentIndex * itemWidth + (containerWidth / 2 - itemWidth / 2) + additionalOffset;
    carouselContainer.style.transition = currentIndex === 0 ? 'none' : 'transform 6s ease';
    carouselContainer.style.transform = `translateX(${offset}px)`;
}

function showNextItem() {
    if (!isPaused) {
        currentIndex = (currentIndex + 1) % totalItems;
        updateTransform();
    }
}

function applyAnimationClasses() {
    carouselItems.forEach((item, index) => item.classList.add(index % 2 === 0 ? 'down' : 'up'));
}

function startCarousel() {
    clearInterval(intervalId);
    intervalId = setInterval(showNextItem, 6000);
    showNextItem();
}

function initCarousel() {
    cloneItems();
    updateTransform();
    applyAnimationClasses();

    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
        isPaused = true;
    });

    carouselContainer.addEventListener('mouseleave', () => {
        isPaused = false;
        startCarousel();
    });

    startCarousel();
}

document.addEventListener('DOMContentLoaded', initCarousel);
