// Slider Kontrolleri
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.control-prev');
const nextButton = document.querySelector('.control-next');
const indexContainer = document.querySelector('.index-container');
let currentSlide = 0;

// Slider resimlerini yükle
const sliderItems = document.querySelectorAll('.slider-item');
sliderItems.forEach((item, index) => {
    item.style.backgroundImage = `url(${item.getAttribute('data-img-url')})`;
    const indexButton = document.createElement('button');
    indexButton.addEventListener('click', () => showSlide(index));
    indexContainer.appendChild(indexButton);
});

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
    updateIndexButtons();
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % sliderItems.length;
    showSlide(currentSlide);
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % sliderItems.length;
    showSlide(currentSlide);
}, 7000); // 7 saniyede bir geçiş

function updateIndexButtons() {
    const buttons = indexContainer.querySelectorAll('button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === currentSlide);
    });
}

// Mobilde dokunmatik kaydırma
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Sola kaydırma
        currentSlide = (currentSlide + 1) % sliderItems.length;
    } else if (touchEndX > touchStartX) {
        // Sağa kaydırma
        currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
    }
    showSlide(currentSlide);
}

// Kart Slider Kontrolleri
const cardWrapper = document.querySelector('.card-wrapper');
const cards = document.querySelectorAll('.card');
const cardPrev = document.querySelector('.card-prev');
const cardNext = document.querySelector('.card-next');
let currentCardIndex = 0;

// Masaüstünde 3 kart, mobilde 1 kart göster
function showCard(index) {
    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? -index * 100 : -index * (100 / 3); // Mobilde 1 kart, masaüstünde 3 kart
    cardWrapper.style.transform = `translateX(${offset}%)`;
    currentCardIndex = index;
}

cardPrev.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    currentCardIndex = (currentCardIndex - (isMobile ? 1 : 3) + cards.length) % cards.length;
    showCard(currentCardIndex);
});

cardNext.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    currentCardIndex = (currentCardIndex + (isMobile ? 1 : 3)) % cards.length;
    showCard(currentCardIndex);
});

setInterval(() => {
    const isMobile = window.innerWidth <= 768;
    currentCardIndex = (currentCardIndex + (isMobile ? 1 : 3)) % cards.length;
    showCard(currentCardIndex);
}, 5000); // 5 saniyede bir geçiş


cardWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

cardWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const isMobile = window.innerWidth <= 768;
    if (touchEndX < touchStartX) {
        // Sola kaydırma
        currentCardIndex = (currentCardIndex + (isMobile ? 1 : 3)) % cards.length;
    } else if (touchEndX > touchStartX) {
        // Sağa kaydırma
        currentCardIndex = (currentCardIndex - (isMobile ? 1 : 3) + cards.length) % cards.length;
    }
    showCard(currentCardIndex);
}