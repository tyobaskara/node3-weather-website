const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const { getCurrentWeather } = require('./utils');

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// setup handlebars engine and views location
app.set('view engine', '.hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsPath);

// static from public folder
// localhost:3000
// localhost:3000/about.html
// localhost:3000/help.html
app.use(express.static(publicDirectoryPath));

// handlebars routing
// will match up folder ../views
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tyo Baskara'
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/help', (req, res) => {
  res.render('help');
});

// Get current weather
app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'Location required'
    })
  };

  getCurrentWeather(address, (error, data) => {
    if (error) return res.send({ error });

    res.send(data);
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'Help article not found'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    errorMessage: 'Page not found'
  })
});

// localhost:3000/about
app.use('/about', express.static(publicDirectoryPath + '/about.html'));

// localhost:3000/help
app.use('/help', express.static(publicDirectoryPath + '/help.html'));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

