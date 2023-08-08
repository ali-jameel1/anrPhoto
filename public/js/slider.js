const images = [
    '/photos/beach.jpg',
    '/photos/cave.jpg',
    '/photos/waves.jpg',
    '/photos/mountain.jpg',
    '/photos/wedding.jpg',
    '/photos/turkey.jpg',
    '/photos/pakistan.jpg',
    '/photos/bridge.jpg',
    '/photos/city.jpg',
    '/photos/building.jpg',
    '/photos/graduate.jpg',
    '/photos/skateboard.jpg',
    // add as many images as you want
];

let currentImageIndex = 0;
slider.style.backgroundImage = `url(${images[currentImageIndex]})`;
currentImageIndex++;

function startSlider() {
    console.log("Setting image")
    console.log(images[currentImageIndex])
    setInterval(() => {
        // Add opacity transition
        slider.style.opacity = 0;

        currentImageIndex++;
        if (currentImageIndex > images.length - 1) {
            currentImageIndex = 0
        }
        slider.style.backgroundImage = `url(${images[currentImageIndex]})`;
        slider.style.opacity = 1;
    }, 5000);
    console.log("Image set")
}

function moveLeft() {
    clearInterval(null);
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    slider.style.backgroundImage = `url(${images[currentImageIndex]})`;
}

function moveRight() {
    clearInterval(null);
    currentImageIndex = (currentImageIndex + 1) % images.length;
    slider.style.backgroundImage = `url(${images[currentImageIndex]})`;
}
