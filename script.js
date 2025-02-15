// Hamburger menü simgesine tıklandığında menüyü göster
document.querySelector(".hamburger-menu").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("show");
});

function expandService(element) {
    document.querySelectorAll('.service-item').forEach(item => {
        if (item !== element) {
            item.classList.remove('expanded');
        }
    });
    element.classList.toggle('expanded');
}