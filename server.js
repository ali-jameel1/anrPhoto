const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

const stripe = require('stripe')('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');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/index.html'));
});

app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/contact.html'));
});

app.get('/booknow', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/book.html'));
});

app.get('/products', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/products.html'));
});

app.get('/people', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/people.html'));
});

app.get('/scenes', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/scenes.html'));
});

app.get('/prints', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/prints.html'));
});

app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/about.html'));
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message || name.contains("undefined")){
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anrphoto8@gmail.com',
            pass: 'knbrfaltyaiykhsm'
        }
    });

    const mailOptions = {
        from: email,
        replyTo: email,
        to: 'anrphoto8@gmail.com',
        subject: `${name} Has reached out to ANR!`,
        text: `From: ${name} <${email}>\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send(info.response);
        }
    });
});

app.post('/create-checkout-session', async (req, res) => {
    const { image, size, price } = req.body;

    const title = size === "12x18" ? "12X18 Glossy Print" : "11X14 Glossy Prin";
    const priceInCents = Math.round(parseFloat(price) * 100);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US'],
        },
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: title,
                        images: ['https://www.anrphoto.com/' + image]
                    },
                    unit_amount: priceInCents,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://www.anrphoto.com/prints',
        cancel_url: 'https://www.anrphoto.com/prints',
    });

    res.json({ id: session.id });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
