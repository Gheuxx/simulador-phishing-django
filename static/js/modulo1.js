const slides = document.querySelectorAll('.training-slide');
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');
const finishButton = document.getElementById('finish-module');

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    slides[index].classList.add('active');

    if (index === 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    if (index === slides.length - 1) {
        nextButton.classList.add('hidden');
        finishButton.classList.remove('hidden');
    } else {
        nextButton.classList.remove('hidden');
        finishButton.classList.add('hidden');
    }
}

nextButton.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
});

prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

showSlide(currentSlide);