var stripe = Stripe('pk_live_51NcOFoKM0JyveRgIS1JVO56i4ZXuszIpO3gBNipqkjzDZo7grqv41OjxUbTfKjjYIQNEcd9YNqSnydfqCRJszEZw00wu2v52hf');

// Put your images in this array
const images = [
    '/photos/Prints/DSC_1619-Enhanced.jpg',
    '/photos/Prints/THECITY.jpg',
    '/photos/Prints/DSC_9491.jpg',
    '/photos/Prints/DSC_1659-Enhanced-SR.jpg',
    '/photos/Prints/DSC_3167.jpg',
    '/photos/Prints/DSC_8354.jpg',
    '/photos/Prints/DSC_3652.jpg',
    '/photos/Prints/DSC_95033.jpg',
    '/photos/Prints/DSC_3370.jpg',
    '/photos/Prints/DSC_3401.jpg',
    '/photos/Prints/DSC_1189-Enhanced-SR.jpg',
    '/photos/Prints/DSC_4150.jpg',
    '/photos/Prints/DSC_7307.jpg',
    '/photos/Prints/DSC_2704.jpg',
    '/photos/Prints/DSC_3007.jpg',
    // add as many images as you want
];

var gallery = document.getElementById('gallery');

for (var i = 0; i < images.length; i++) {
    (function (i) {
        var img = document.createElement('img');
        img.src = images[i];
        img.classList.add('gallery-image');
        gallery.appendChild(img);
        img.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        img.onclick = async function () {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: images[i] }),
            });
            console.log(JSON.stringify({ image: images[i] }))

            const session = await response.json();
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                alert(result.error.message);
            }
        };
    })(i);
}
