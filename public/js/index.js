document.addEventListener('DOMContentLoaded', (event) => {
    startSlider();

    const form = document.getElementById('booking-form');
    form.addEventListener('submit', handleFormSubmit);

    document.getElementById('left-button').addEventListener('click', moveLeft);
    document.getElementById('right-button').addEventListener('click', moveRight);

    const button = document.getElementById('checkout-button');
    button.addEventListener('click', handleCheckout);

    window.addEventListener('hashchange', function () {
        const allLinks = document.querySelectorAll('.menu a');
        allLinks.forEach(link => {
            if (link.getAttribute('href') === location.hash) {
                link.style.fontWeight = 'bold';
            } else {
                link.style.fontWeight = 'normal';
            }
        });
    });
});
