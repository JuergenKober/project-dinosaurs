const form = document.getElementById("dino-compare");
const button = document.getElementById("btn");

const dinoData = () => {
   return fetch('./dino.json')
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch((error) => console.log(error));
}

console.log(dinoData());

// Create Dino Constructor
class Dino {
  constructor(species, weight, height, diet, where, when, fact) {
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
  constructor(name, feet, inches, diet) {
    this.name = name,
    this.feet = feet,
    this.inches = inches,
    this.diet = diet,
    this.species = 'human'
  }
}

button.addEventListener("click", (event) => {
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
});

   // Use IIFE to get human data from form

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
