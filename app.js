const form = document.getElementById("dino-compare");
const button = document.getElementById("btn");
const dataSource = './dino.json';
let store = {
  dinoData: '',
  humanData: ''
}

function getDinoData(dataSource) {
	return fetch(dataSource)
	.then((response) => response.json())
  .then(data => {return data;})
	.catch(err => console.log("An error occured while fetching data: ", err))
}

// use of event listener inspired by the udacity racer simulator project
document.addEventListener("DOMContentLoaded", function() {
	handleDinoData(dataSource);
	setupClickHandlers();
});


async function handleDinoData(dataSource) {
	try {
    const dinoData = await getDinoData(dataSource);
    store = { ...store, dinoData };
    console.log('store, ', store);
	} catch(err) {
		console.log(`An error occured in handleDinoData: ${err.message}`);
		// print full error to console
		console.error(err);
	}
}



// Create Dino Constructor
class Dino {
  constructor(species, weight, height, diet, where, when, fact, img_file) {
    this.species = species,
    this.weight = weight,
    this.height = height,
    this.diet = diet,
    this.where = where,
    this.when = when,
    this.fact = fact
  }
}


// Create Dino Objects


// Create Human Object
class Human {
  constructor(name, feet, inches, weight, diet) {
    this.name = name,
    this.feet = feet,
    this.inches = inches,
    this.diet = diet,
    this.weight = weight,
    this.species = 'human',
    this.img_file = 'human.png'
  }
}

function setupClickHandlers() {

  button.addEventListener("click", (event) => {
    // Use IIFE to get human data from form
    const handleFormData = (function getFormData() {
      const name = document.getElementById("name").value;
      console.log(name);
      const feet = document.getElementById("feet").value;
      console.log(feet);
      const inches = document.getElementById("inches").value;
      console.log(inches);
      const weight = document.getElementById("weight").value;
      console.log(weight);
      const diet = document.getElementById("diet").value;
      console.log(diet);

      const humanData = new Human(name, feet, inches, weight, diet);
      store = { ...store, humanData };
      console.log('store, ', store);

    })();

  }, false);
}



    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array

        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
