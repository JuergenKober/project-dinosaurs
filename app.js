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
    store = { ...store, dinoData: dinoData.Dinos };
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
    this.img_file = img_file,
    this.compare_msg = '',
    this.default_msg = 'All birds are considered dinosaurs.'
  }
}


// Create Dino Objects
const createDinoObjects = () => {
  let dinoList = [];

  store.dinoData.map((elem) => {

    if (elem.species !== 'Pigeon') {
      const dino = new Dino(
        elem.species, elem.weight, elem.height, elem.diet,
        elem.where, elem.when, elem.fact, elem.img_file
      )
      dinoList.push(dino);

    } else {
      const bird = new Dino(
        elem.species, elem.weight, elem.height, elem.diet,
        elem.where, elem.when, elem.fact, elem.img_file
      )
      store = { ...store, birdObj: bird };
    }

    store = { ...store, dinoObjs: dinoList };
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
      const feet = document.getElementById("feet").value;
      const inches = document.getElementById("inches").value;
      const weight = document.getElementById("weight").value;
      const diet = document.getElementById("diet").value;

      const humanObj = new Human(name, feet, inches, weight, diet);
      store = { ...store, humanObj };

    })();

    // On button click, prepare and display infographic
    generateTiles(grid, store);

    // Remove form from screen
    //form.remove();

  }, false);
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function(human) {
  if (this.height > human.height) {
    this.compare_msg = `The ${this.species} is bigger than ${human.name}`;
  } else if (this.height < human.height) {
    this.compare_msg = `The ${this.species} is smaller than ${human.name}`;
  } else {
    this.compare_msg = `The ${this.species} is as big as ${human.name}`;
  }
  return this.compare_msg;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function(human) {
  if (this.weight > human.weight) {
    this.compare_msg = `The ${this.species} is heavier than ${human.name}`;
  } else if (this.weight < human.weight) {
    this.compare_msg = `The ${this.species} is lighter than ${human.name}`;
  } else {
    this.compare_msg = `The ${this.species} is as heavy as ${human.name}`;
  }
  return this.compare_msg;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function(human) {
  this.compare_msg = `The ${this.species}'s diet is ${this.diet}, the ${human.name}'s diet is ${human.diet}`;
  return this.compare_msg;
}

Dino.prototype.getFacts = function(human) {
  const dinoFacts = [
    this.fact,
    `This dinosaur lived in ${this.where}`,
    `This dinosaur lived during the ${this.when}`,
    this.compareHeight(human),
    this.compareWeight(human),
    this.compareDiet(human)
  ]
  const dinoIndex = Math.round(Math.random(0, dinoFacts.length-1)*(dinoFacts.length-1));

  return dinoFacts[dinoIndex];
};

// Generate Tiles for each Dino in Array
const generateDinoTile = (dinos, bird, human) => {

  const creatureList = shuffleArray(dinos);
  creatureList.push(bird);
  const tiles = creatureList.map((elem, index) => {
    const dinoFact = elem.getFacts(human);
    if (elem.species === 'Pigeon') {
      return singleTile('bird', elem, elem.default_msg);
    } else if (index !== 3 ) {
      return singleTile('dino', elem, dinoFact);
    } else {
      return singleTile('dino', elem, dinoFact).concat('', singleTile('human', human));
    }
  }).join("");

  return tiles;
}

function singleTile(type, obj, fact) {
  const backgroundImage = `
    style="background-image: url(./images/${obj.img_file});
      background-size: cover;
      background-position: center;"
  `;
  switch(type) {
    case 'dino':
      return `
        <div ${backgroundImage}class="grid-item">
          <h2>${obj.species}</h2>
          <p>${fact}</p>
        </div>
      `
      break;
    case 'bird':
      return `
        <div ${backgroundImage}class="grid-item">
          <h2>${obj.species}</h2>
          <p>${fact}</p>
        </div>
      `
      break;
    case 'human':
      return `
        <div ${backgroundImage}class="grid-item">
          <h2>${obj.name}</h2>
        </div>
      `
      break;
    default:
      return `
        <div class="grid-item">
          <h2>${elem.species}</h2>
          <p>${fact}</p>
        </div>
      `
  }
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
}
