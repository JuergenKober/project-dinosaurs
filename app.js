const form = document.getElementById("dino-compare");
const button = document.getElementById("btn");
const grid = document.getElementById("grid-container");
const dataSource = './dino.json';
let store = {
  dinoData: '',
  humanObj: '',
  birdObj: '',
  dinoObjs: []
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
    console.log('dinoData, ', dinoData.Dinos)
    store = { ...store, dinoData: dinoData.Dinos };
    console.log('store, ', store);
    createDinoObjects();
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
    this.weight = parseInt(weight),
    this.height = parseInt(height),
    this.diet = diet,
    this.where = where,
    this.when = when,
    this.fact = fact,
    this.img_file = img_file
  }
}


// Create Dino Objects
const createDinoObjects = () => {
  console.log('store from createDinoObjects ', store);

  let dinoList = [];

  store.dinoData.map((elem) => {

    if (elem.species !== 'Pigeon') {
      const dino = new Dino(
        elem.species, elem.weight, elem.height, elem.diet,
        elem.where, elem.when, elem.fact, elem.img_file
      )
      dinoList.push(dino);

    } else {
      console.log('it is a bird')
      const bird = new Dino(
        elem.species, elem.weight, elem.height, elem.diet,
        elem.where, elem.when, elem.fact, elem.img_file
      )
      store = { ...store, birdObj: bird };
    }

    console.log('dinoList: ', dinoList);
    store = { ...store, dinoObjs: dinoList };
    console.log('store from createDinoObjects', store);
  });
}

// Create Human Object
class Human {
  constructor(name, feet, inches, weight, diet) {
    this.name = name,
    this.diet = diet,
    this.feet = parseInt(feet),
    this.inches = parseInt(inches),
    // 1 foot is equal to 12 inches
    this.height = parseInt(feet)*12 + parseInt(inches),
    this.weight = parseInt(weight),
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

      const humanObj = new Human(name, feet, inches, weight, diet);
      store = { ...store, humanObj };
      console.log('store, ', store);

    })();

    generateTiles(grid, store);

  }, false);
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareHeight = (dinoHeight, humanHeight) => {
  const msg = '';
  if (dinoHeight > humanHeight) {
    msg = 'Dino is bigger than Human';
  } else if (dinoHeight < humanHeight) {
    msg = 'Dino is smaller than Human';
  } else {
    msg = 'Dino is as big as Human';
  }
  return msg;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareWeight = (dinoWeight, humanWeight) => {
  const msg = '';
  if (dinoWeight > humanWeight) {
    msg = 'Dino is heavier than Human';
  } else if (dinoWeight < humanWeight) {
    msg = 'Dino is lighter than Human';
  } else {
    msg = 'Dino is as heavy as Human';
  }
  return msg;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = (dinoDiet, humanDiet) => {
  const msg = `The dino's diet is ${dinoDiet}, the humans diet is ${humanDiet}`;
  return msg;
}

Dino.prototype.getFacts = function(human) {
/****
  weight": 70000,
  "height": "372",
  "diet": "herbavor",
  "where": "North America",
  "when": "Late Jurasic",
  "fact
***/
  const dinoFacts = [
    this.fact,
    `This dinosaur lived in ${this.where}`,
    `This dinosaur during the ${this.when}`
  ]
  console.log(dinoFacts);
  return dinoFacts[0];
};

// Generate Tiles for each Dino in Array
const generateDinoTile = (dinos, bird, human) => {

  const creatureList = shuffleArray(dinos);
  creatureList.push(bird);
  const tiles = creatureList.map((elem, index) => {
    const dinoFact = elem.getFacts(human);
    if (index !== 3 ) {
      return `
        <div class="grid-item">
          ${elem.species}
          <br />
          ${dinoFact}
        </div>
      `
    } else {
      return `
        <div class="grid-item">${elem.species}</div>
        <div class="grid-item">human</div>
      `
    }
  }).join("");

  console.log('tiles: ', tiles);

  return tiles;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
/* from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Add tiles to DOM
const generateTiles = (elem, store) => {

  const tiles = generateDinoTile(store.dinoObjs, store.birdObj, store.humanObj);
  elem.innerHTML = tiles;
  /***
   `
    <div class="grid-item">1 from generateTiles</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
  `
  ***/
}


    // Remove form from screen


// On button click, prepare and display infographic
