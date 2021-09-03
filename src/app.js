const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// Define paths:
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// Root page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Colin Francis'
    });
});

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Colin Francis'
    })
});

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Colin Francis'
    })
});

// Weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: geoData.location,
                address: req.query.address
            });
        })
    })
});

// 404 Routes:
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Colin Francis',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Colin Francis',
        errorMessage: 'Page not found.'
    })
})

// Turn on server
app.listen(3000, () => console.log('[+] Server is running on port 3000'));

// References:
// app.use(express.static(path.join(__dirname, '../public'), {
//     extensions: ["html"]
// }));

// Products page:
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     })
// })