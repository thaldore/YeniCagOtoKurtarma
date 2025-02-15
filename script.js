// Slider Kontrolleri
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.control-prev');
const nextButton = document.querySelector('.control-next');
let currentSlide = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + 3) % 3; // 3 resim olduğu için
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % 3; // 3 resim olduğu için
    showSlide(currentSlide);
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % 3; // 3 resim olduğu için
    showSlide(currentSlide);
}, 7000); // 7 saniyede bir geçiş

// Hizmet Alanlarını Kaydırma
const serviceWrapper = document.querySelector('.service-wrapper');
const serviceItems = document.querySelectorAll('.service-item');
const servicePrev = document.querySelector('.service-prev');
const serviceNext = document.querySelector('.service-next');
let currentServiceIndex = 0;

function showService(index) {
    const offset = -index * 33.33;
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

setInterval(() => {
    currentServiceIndex = (currentServiceIndex + 1) % serviceItems.length;
    showService(currentServiceIndex);
}, 5000); // 5 saniyede bir geçiş

// Hizmet Öğelerini Genişletme
function expandService(element) {
    document.querySelectorAll('.service-item').forEach(item => {
        if (item !== element) {
            item.classList.remove('expanded');
        }
    });
    element.classList.toggle('expanded');
}