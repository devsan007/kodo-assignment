const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // initiliazing express


const pageNotFound = require('./controllers/page-not-found'); // common controller for 404
const listRoutes = require('./routes/index'); // importing routes


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

/* 
configuring view for EJS templating engine
*/
app.set('view engine','ejs');
app.set('views','views');

/* configuiring routes as middleware */
app.use(listRoutes.routes);
app.use(pageNotFound.getPageNotFound);

/* Starting server */
app.listen(3000);