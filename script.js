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

// Dokunmatik kaydırma için olay dinleyicileri
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);

function touchStart(event) {
    isDragging = true;
    startPos = event.touches[0].clientX;
    animationID = requestAnimationFrame(animation);
    slider.style.transition = 'none'; // Kaydırma sırasında geçiş efekti olmasın
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = event.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;

    // Eğer yeterince kaydırma yapıldıysa bir sonraki veya önceki slayta geç
    if (movedBy < -100 && currentSlide < sliderItems.length - 1) {
        currentSlide += 1;
    } else if (movedBy > 100 && currentSlide > 0) {
        currentSlide -= 1;
    }

    // Slaytı konumlandır
    setSliderPosition();
    slider.style.transition = 'transform 0.5s ease-in-out'; // Geçiş efekti geri ekle
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
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

// Otomatik kayma süresi (15 saniye)
const autoSlideDuration = 15000;

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
    const offset = -index * cardWidth; /* Mobilde her bir kart için kaydırma */
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