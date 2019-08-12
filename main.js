let { Neat, Network, architect, methods } = carrot;

var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var POP = 50;
var GAMES = 75; 
var mutation_rate = 1.5; 
var mutation_amount = 6.5; 
var elitism = Math.round(0.2 * GAMES);
var countGen = 0; 

const neat = new Neat(4, 2, {
  population: POP,
  elitism: elitism,
  mutation_rate: mutation_rate,
  mutation_amount: mutation_amount,
  equal: false
})
// All active dinos (not yet collided with cactus)
let activeDinos = []
// All dinos for any given population
let currentGeneration = [];
let cactus = [];
let clouds = [];
let grounds = [];  
let counter = 0;
// Interface elements
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;
// All time high score
let highScore = 0;
let runBest = false;
let runBestButton;
//Create an environment for the background of the game
function setup() {
  let canvas = createCanvas(850, 412);
  canvas.parent('canvas');
  // Access the interface elements
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
}
//Populate the Dinos with random mutations
function populating() {
     neat.population = neat.population.map(function(genome) { 
    // grab a random mutation method
    const random_mutation_method = methods.mutation.FFW[Math.floor(Math.random() * methods.mutation.FFW.length)]
    // mutate the genome
    genome.mutate(random_mutation_method)
    // return the mutated genome
    return genome
  })
  for (let i = 0; i < neat.population.length; i++) {
    activeDinos.push(new Dino(neat.population[i]));
  }
  countGen++;
}
//Random number from 0 to 1
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//Draw the remaining gmae
function draw() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, cvs.width, cvs.height); 
  // Should we speed up cycles per frame
  let cycles = speedSlider.value();
  speedSpan.html(cycles);
  // How many times to advance the game
  for (let n = 0; n < cycles; n++) {
    // Show all the cactus
    for (let i = cactus.length - 1; i >= 0; i--) {
      cactus[i].update();
      if (cactus[i].offscreen()) {
        cactus.splice(i, 1);
      }
    }
   // Show all the clouds
   for (let i = clouds.length - 1; i >= 0; i--) {
      clouds[i].update(); 
      if (clouds[i].offscreen()) {
        clouds.splice(i, 1);
       }
     }  
   // Show all the ground
  for (let i = grounds.length - 1; i >= 0; i--) {
     grounds[i].update(); 
     if (grounds[i].offscreen()) {
       grounds.splice(i, 1);
      }
    } 
    // Create a population
      for (let i = activeDinos.length - 1; i >= 0; i--) {
        let dino = activeDinos[i];
        dino.think(cactus);
        dino.update();
        // Check all the cactus
        for (let j = 0; j < cactus.length; j++) {
          if (cactus[j].hits(activeDinos[i])) {
             activeDinos[i].brain.score = activeDinos[i].getScore();
             currentGeneration.push(activeDinos.splice(i, 1).brain);
            break;
          }
        }
        if (dino.bottomTop()) {
          activeDinos.splice(i, 1);
        }
      }
     let randomArraySpacing = [70,  105];
     let randomSpacing =   getRandomInt(2);
     let getCactusSpacing = randomArraySpacing[randomSpacing];
    // Add a new cactus every so often
    if (counter % getCactusSpacing == 0) {
     cactus.push(new Cactus());
    }
    if (counter % 55 == 0) {
     clouds.push(new Cloud());
    }
    if (counter % 127 == 0) {
     grounds.push(new Ground());
    }   
    counter++;
  }
  // What is highest score of the current population
  let tempHighScore = 0;
  // If we're training
  if (!runBest) {
    // Which is the best bird?
    let tempBestDino = null;
    for (let i = 0; i < activeDinos.length; i++) {
      var s = activeDinos[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestDino = activeDinos[i];
      }
    }
    // Is it the all time high scorer?
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestDino = tempBestDino;
    }
  } else {
    // Just one dino, the best one so far
    tempHighScore = bestDino.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }
  // Draw everything!
  for (let i = 0; i < cactus.length; i++) {
    cactus[i].show();
  }
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].show();
  }
  for (let i = 0; i < grounds.length; i++) {
    grounds[i].show();
  }
  if (runBest) {
    bestDino.draw();
  } else {
    for (let i = 0; i < activeDinos.length; i++) {
      activeDinos[i].draw();
    }
    // If we're out of dinos go to the next generation
    if (activeDinos.length == 0) {
      neat.sort(); 
      const newGeneration = [];
    // gets the best of previous generation and inserts them into the next population
    for (let i = 0; i < elitism; i++) {
        newGeneration.push(neat.population[i]);
    }
    // test to see if parent gets returned
    for (let i = 0; i < POP - elitism; i++) {
      newGeneration.push(neat.getOffspring());
    }
     neat.population = newGeneration;
     populating(); 
    }
  }
  this.ctx.fillStyle = "black";
	this.ctx.font="20px Oswald, sans-serif";
  this.ctx.fillText("Generation: " + countGen, 10,25)
  this.ctx.fillText("Population: " + activeDinos.length + "/" + POP, 10, 50 );
  this.ctx.fillText("High Score: " + highScore, 700, 25);
  this.ctx.fillText("Current Score: " + s, 10, 75);
}
