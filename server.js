/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: __Yingtong Lyu__ Student ID: __143631224__ Date: __3/27/2024__

  Link to assignment: https://spotless-tick-outerwear.cyclic.app/
*
********************************************************************************/

const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const legoData = require("./modules/legoSets");

// Use EJS as the template engine
app.set("view engine", "ejs");

// Serve static files from 'public' directory
app.use(express.static('public'));

// Initialize legoData and start server
legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => console.log(`Server listening on: http://localhost:${HTTP_PORT}`));
});

// Homepage route
app.get('/', (req, res) => { 
    // Example of rendering 'home.ejs' without additional data
    res.render("home", { page: '/' });
});

// About route
app.get('/about', (req, res) => {
  // Pass 'page' data for navbar highlighting
  res.render('about', { page: '/about' });
}); 

// Sets route - Adjusted to render a view instead of sending JSON
app.get('/lego/sets', (req, res) => { 
  const theme = req.query.theme;
  if (theme) {
    legoData.getSetsByTheme(theme)
      .then(legoSets => {
        res.render("sets", { sets: legoSets, page: '/lego/sets' });
      })
      .catch(error => {
        console.error(error);
        res.status(404).render("404", { page: '' });
      });
  } else {
    legoData.getAllSets()
      .then(legoSets => {
        res.render("sets", { sets: legoSets, page: '/lego/sets' });
      })
      .catch(error => {
        console.error(error);
        res.status(500).render("error", { error: error, page: '' });
      });
  }
});

// Individual Set route - Adjusted to render a view instead of sending JSON
app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;
  legoData.getSetByNum(setNum)
  .then(legoSet => {
    if (legoSet) {
      // Make sure 'setDetail.ejs' exists in your 'views' directory
      res.render("setDetail", { set: legoSet, page: '/lego/sets' });
    } else {
      // Render a 404 page if set not found
      res.status(404).render("404", { page: '' });
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).render("error", { error: error, page: '' });
  });
});


// Generic 404 route handler - Adjusted to render a 404 EJS template
app.use((req, res) => {
    res.status(404).render("404", { page: '' });
});
