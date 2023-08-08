document.addEventListener('DOMContentLoaded', (event) => {
    // Code to initialize your app goes here.
    // For example, you might start up the image slider:
    startSlider();

    // And set up the form submission handler:
    const form = document.getElementById('booking-form');
    form.addEventListener('submit', handleFormSubmit);

    document.getElementById('left-button').addEventListener('click', moveLeft);
    document.getElementById('right-button').addEventListener('click', moveRight);

    // And set up the Stripe checkout handler:
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

    // Set initial hash to '#about'
    if (!location.hash) {
        location.hash = '#about';
    }

    // Initialize the Google API client
    gapi.load('client:auth2', initClient);
});
