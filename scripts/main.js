const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav_links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
document.querySelector(".nav_links").forEach(n  => n.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
}));



const btn = document.querySelector('.switch');

btn.addEventListener('click', () => {
    btn.classList.add('.special');
});