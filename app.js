require('dotenv').config(); 
const express = require('express');
// const flash= require ('express-flash-messages')
const flash = require('connect-flash');
const methodoverride = require('method-override');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = 5000|| process.env.port
 
connectDB(); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  
app.use(methodoverride('_method'))
     
// Static file     
app.use(express.static("public"));    
  
    
// express session
app.use(session( {secret: 'secret', resave:false , saveUnintialize: true,  cookie:{maxAge: 1000 * 60 * 60 * 24* 7}}));

// app.use(flash({sessionKeyName: 'flashMessage'}))
app.use(
    flash({

      sessionKeyName: 'flashMessage'
        })    
  );    

// Template layout   
app.use(expressLayout)  
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
   
// routing
app.use('/', require('./server/routes/customers')); 

// Home  page


//handling error
app.get('*', (req, res) => {
    res.status(404).render("404");
});

app.listen(port, (req, res) => {
    console.log(`App listening on port ${port}`)
});

