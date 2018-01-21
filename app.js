const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    fs.appendFile('server.log', `${now}: ${req.method} ${req.url}\n`, (err) => {
        if(err) {
            console.log('unable to write log');
        }
    });
    next();
})

app.get('/', (req, res) => {
    res.render('home', {
        heading: 'Home Page',
        pageTitle: 'Home Title'
    });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
})