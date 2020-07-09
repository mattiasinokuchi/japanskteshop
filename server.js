const express = require('express'); //load express
const hbs = require('hbs'); //load handlebars
const fs = require('fs');
const port = process.env.PORT || 3000;
const app = express();  //make a new express app
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.set('view engine', 'hbs');  //declare view engine
app.use((req, res, next) => { //register middleware to serve a logger
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
});*/
app.use(express.static(__dirname + '/public')); //add middleware to serve static HTML pages
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Japansk Teshop',
    welcomeMessage: 'Välkommen till min nya affär!!!',
  });
});
app.get('/tea', (req, res) => {
  res.render('tea.hbs', {
    pageTitle: 'Te',
  });
});
app.get('/genmai', (req, res) => {
  res.render('genmai.hbs', {
    pageTitle: 'Genmaicha',
  });
});
app.get('/macha', (req, res) => {
  res.render('macha.hbs', {
    pageTitle: 'Macha',
  });
});
app.get('/sencha', (req, res) => {
  res.render('sencha.hbs', {
    pageTitle: 'Sencha',
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Om affären',
  });
});
app.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    pageTitle: 'Kontakta affären',
  });
});
app.listen(port, () => {  //bind app to port 3000
  console.log(`Server is up on port ${port}`);
});
