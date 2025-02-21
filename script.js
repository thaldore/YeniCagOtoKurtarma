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

// Hizmet Alanlarını Kaydırma
const serviceWrapper = document.querySelector('.service-wrapper');
const serviceItems = document.querySelectorAll('.service-item');
const servicePrev = document.querySelector('.service-prev');
const serviceNext = document.querySelector('.service-next');
let currentServiceIndex = 0;

function showService(index) {
    const offset = -index * 100; // Mobilde tam genişlik için 100%
    serviceWrapper.style.transform = `translateX(${offset}%)`;
    currentServiceIndex = index;
}

servicePrev.addEventListener('click', () => {
    currentServiceIndex = (currentServiceIndex - 1 + serviceItems.length) % serviceItems.length;
    showService(currentServiceIndex);
});

serviceNext.addEventListener('click', () => {
    currentServiceIndex = (currentServiceIndex + 1) % serviceItems.length;
    showService(currentServiceIndex);
});

// Mobilde otomatik kaydırma
setInterval(() => {
    currentServiceIndex = (currentServiceIndex + 1) % serviceItems.length;
    showService(currentServiceIndex);
}, 5000); // 5 saniyede bir geçiş
