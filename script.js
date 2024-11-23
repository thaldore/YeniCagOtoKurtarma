// Hamburger menü simgesine tıklandığında menüyü göster
document.querySelector(".hamburger-menu").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("show");
});

function gosterDetay(hizmet, resim, aciklama) {
    const detayBolumu = document.getElementById('hizmet-detay');
    document.getElementById('detay-resim').src = resim;
    document.getElementById('detay-aciklama').textContent = aciklama;
    detayBolumu.classList.add('show');
}

function kapatDetay() {
    const detayBolumu = document.getElementById('hizmet-detay');
    detayBolumu.classList.remove('show');
}
