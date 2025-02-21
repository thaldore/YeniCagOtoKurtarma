// Slider Kontrolleri
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.control-prev');
const nextButton = document.querySelector('.control-next');
const indexContainer = document.querySelector('.index-container');
let currentSlide = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

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

// Dokunmatik kaydırma işlemleri
sliderItems.forEach((item, index) => {
    item.addEventListener('touchstart', touchStart(index));
    item.addEventListener('touchend', touchEnd);
    item.addEventListener('touchmove', touchMove);
});

function touchStart(index) {
    return function (event) {
        startPos = event.touches[0].clientX;
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    };
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = event.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentSlide < sliderItems.length - 1) {
        currentSlide += 1;
    } else if (movedBy > 100 && currentSlide > 0) {
        currentSlide -= 1;
    }

    setPositionByIndex();
    slider.classList.remove('grabbing');
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
    currentTranslate = currentSlide * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

// Kart Slider Kontrolleri
const cardWrapper = document.querySelector('.card-wrapper');
const cards = document.querySelectorAll('.card');
const cardPrev = document.querySelector('.card-prev');
const cardNext = document.querySelector('.card-next');
let currentCardIndex = 0;
let autoSlideInterval;

// Otomatik kayma süresi (20 saniye)
const autoSlideDuration = 20000;

// Otomatik kayma fonksiyonu
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        const isMobile = window.innerWidth <= 768;
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        showCard(currentCardIndex);
    }, autoSlideDuration);
}

// Masaüstünde 3 kart, mobilde 1 kart göster
function showCard(index) {
    const isMobile = window.innerWidth <= 768;
    const cardWidth = cards[0].offsetWidth; // Kartın genişliğini al
    const offset = -index * cardWidth; // Mobilde her bir kart için kaydırma
    cardWrapper.style.transform = `translateX(${offset}px)`;
    currentCardIndex = index;
}

// Otomatik kaymayı başlat
startAutoSlide();

// Önceki ve sonraki butonları
cardPrev.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Otomatik kaymayı durdur
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(currentCardIndex);
    startAutoSlide(); // Otomatik kaymayı yeniden başlat
});

cardNext.addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Otomatik kaymayı durdur
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
    startAutoSlide(); // Otomatik kaymayı yeniden başlat
});

cardWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoSlideInterval); // Dokunmatik müdahalede otomatik kaymayı durdur
});

cardWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
    startAutoSlide(); // Dokunmatik müdahale sonrası otomatik kaymayı yeniden başlat
});

function handleSwipe() {
    const isMobile = window.innerWidth <= 768;
    if (touchEndX < touchStartX) {
        // Sola kaydırma
        currentCardIndex = (currentCardIndex + 1) % cards.length;
    } else if (touchEndX > touchStartX) {
        // Sağa kaydırma
        currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    }
    showCard(currentCardIndex);
}