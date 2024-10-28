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
    const clones = [...carouselItems].flatMap(item => [
        item.cloneNode(true),
        item.cloneNode(true)
    ]);
    carouselContainer.append(...clones.slice(0, totalItems)); // clone end
    carouselContainer.prepend(...clones.slice(totalItems));   // clone start
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
