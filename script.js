const carouselContainer = document.querySelector('.carousel-container');
let carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;
let currentIndex = 0;
let toggle = true;
const visibleItemsCount = 3;
const containerWidth = 1200;

//clone items for smooth looping
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

    //update carouselItems NodeList after cloning
    carouselItems = document.querySelectorAll('.carousel-item');
}



//show the next item
function showNextItem() {
    applyAnimationClasses();
     

    currentIndex++;

    const itemWidth = containerWidth / visibleItemsCount;
    const offset = -currentIndex * itemWidth + (containerWidth / 2 - itemWidth / 2);
    carouselContainer.style.transition = 'transform 6s ease';
    carouselContainer.style.transform = `translateX(${offset}px)`;

    if (currentIndex >= totalItems) {
        setTimeout(() => {
            carouselContainer.style.transition = 'none';
            currentIndex = 0;
            const resetOffset = -currentIndex * itemWidth + (containerWidth / 2 - itemWidth / 2);
            carouselContainer.style.transform = `translateX(${resetOffset}px)`;
             
        }, 2000);
    }
}

//apply animation classes to alternate cards
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
    const initialOffset = (containerWidth / 2 - itemWidth / 2);
    carouselContainer.style.transform = `translateX(${initialOffset}px)`;
    
     
    
    
    setTimeout(() => {
        showNextItem();
        setInterval(showNextItem, 6000);
    }, 100);
}

document.addEventListener('DOMContentLoaded', initCarousel);