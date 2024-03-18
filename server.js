/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: __Yingtong Lyu__ Student ID: __143631224__ Date: __3/17/2024__
*
********************************************************************************/

const { error } = require("console");
const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

legoData.initialize().then(() => {
    app.listen(HTTP_PORT, () => console.log(`server listening on: http://localhost:${HTTP_PORT}`)); // Start the server
});

// Homepage route
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

// About route
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"))
}); 

// 404 route
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/404.html"))
}); 

// Sets route
app.get('/lego/sets', (req, res) => { 
    const theme = req.query.theme;
    if (theme) {
      legoData.getSetsByTheme(theme)
        .then(legoSets => {
          res.json(legoSets);
        })
        .catch(error => {
          res.status(404).send(error);
        });
    } else {
      legoData.getAllSets()
        .then(legoSets => {
          res.json(legoSets);
        })
        .catch(error => {
          res.status(500).send(error);
        });
    }
});

// Num route
app.get('/lego/sets/:set_num', (req, res) => {
    const setNum = req.params.set_num;
    legoData.getSetByNum(setNum)
    .then(legoSets => {
      if (legoSets) {
        res.json(legoSets);
      } else {
        res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});



// 404 route 
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});
