/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: __Yingtong Lyu__ Student ID: __143631224__ Date: __2/18/2024__
*
********************************************************************************/

const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = []; // empty array to store processed LEGO set data

// Initialize function
function initialize() {
    return new Promise((resolve, reject) => {
        try {
          sets = setData.map(set => {
            const theme = themeData.find(theme => theme.id === set.theme_id);
            let themeName = theme ? theme.name : "Undefined"; 
                return {
                    ...set,
                    theme: themeName
                };
            });
          resolve();
        } catch (error) {
          reject("Error: " + error.message);
        }
    });
}

// getAllSets function
function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets.length > 0) {
            resolve(sets); 
        } else {
            reject("ERROR! no sets is found");
        }
    });
}

// getSetByNum function
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        // Find the set
        let set = sets.find(set => set.set_num === setNum);

        // If found, resolve the Promise
            // If not found, reject the Promise
        set ? resolve(set) : reject("ERROR! cannot be found the data");
    });
}

// getSetsByTheme function
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        let themeLowercase = theme.toLowerCase();

        const filteredSets = sets.filter(set =>set.theme.toLowerCase().includes(themeLowercase));
        // If matching sets are found, resolve the Promise
            // If no matching sets are found, reject the Promise        
        if (filteredSets.length > 0) {
            resolve(filteredSets); // Resolve with the filtered sets
        } else {
            reject("ERROR! cannot find set with theme"); 
        }
    });
}

// initialize();
// console.log(getAllSets()); // Should display all sets
// console.log(getSetByNum('001-1')); // Replace '001-1' with a set number
// console.log(getSetsByTheme('Technic')); // Replace 'Technic' with a theme

// initialize().then(() => console.log("Initialization successful.")).catch(error => console.error("Initialization failed:", error));

// Testing & Refactoring legoSets.js

// initialize().then(() => {
//     getAllSets().then(sets => console.log(sets));
//     getSetByNum('001-1').then(set => console.log(set)).catch(error => console.error(error));
//     getSetsByTheme('Technic').then(sets => console.log(sets)).catch(error => console.error(error));
// }).catch(error => console.error("Initialization failed: " + error));

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };