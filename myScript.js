
"use strict";

const galleryImages = document.querySelectorAll(".photo-card img");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxCounter = document.querySelector("#lightboxCounter");

const closeButton = document.querySelector("#lightboxClose");
const previousButton = document.querySelector("#lightboxPrev");
const nextButton = document.querySelector("#lightboxNext");

let currentIndex = 0;

function updateLightbox() {
    const selectedImage = galleryImages[currentIndex];
    const photoCard = selectedImage.closest(".photo-card");
    const title = photoCard.querySelector("h3");

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
    lightboxTitle.textContent = title.textContent;

    lightboxCounter.textContent =
        `${currentIndex + 1} / ${galleryImages.length}`;
}

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
}

function showPreviousImage() {
    currentIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;

    updateLightbox();
}

galleryImages.forEach((image, index) => {
    image.style.cursor = "pointer";

    image.addEventListener("click", () => {
        openLightbox(index);
    });
});

// Connect the lightbox buttons
closeButton.addEventListener("click", closeLightbox);
nextButton.addEventListener("click", showNextImage);
previousButton.addEventListener("click", showPreviousImage);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        showNextImage();
    } else if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
});