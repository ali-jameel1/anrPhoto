const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
// const google = require('googleapis');

// import { google } from "googleapis"

const app = express();

const stripe = require('stripe')('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');

app.use(bodyParser.json());
app.use(express.static('public'));

// Add this route handler
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

app.get('/product', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html/product.html'));
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
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                // replace this with your product information
                price_data: {
                    currency: 'cad',
                    product_data: {
                        name: 'Buy this print!',
                    },
                    unit_amount: 200, // price in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://www.google.com/',
        cancel_url: 'https://www.google.com/',
    });

    res.json({ id: session.id });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
