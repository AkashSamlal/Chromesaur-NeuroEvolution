# Chromesaur-NeuroEvolution
Using Machine Learning to play Chromesaur, use NEAT algorithm from Carrot.js

## Incorporating Carrot.js 
#### Initialize NEAT
```javascript 
//Initalize variables for neat 
let populate = 50;
let GAMES = 70;
let elitism = Math.round(0.2 * GAMES);
let rate = 1.5;
let amount = 8.5; 

//Initalize Neat itself 
const neat = new Neat(5, 2, {
  population: populate,
  elitism: elitism,
  mutation_rate: rate,
  mutation_amount: amount,
  equal: false
})
```
#### Create Population Method
```javascript
function populating() {
 neat.population = neat.population.map(function(genome) { 
// grab a random mutation method
const random_mutation_method = methods.mutation.FFW[Math.floor(Math.random() * methods.mutation.FFW.length)]
// mutate the genome
genome.mutate(random_mutation_method)
// return the mutated genome
  return genome
})
//populate the mutated genomes into the active dinos array 
for (let i = 0; i < neat.population.length; i++) {
  activeDinos.push(new Dino(neat.population[i]));
}
//Counter increment for New Generation
 countGen++;
}
```
#### Start a New Generation
```javascript
// If there is no more dinos start the next generation
 if (activeDinos.length == 0) {
    //sort the population by score, highest to lowest
    neat.sort(); 
   //new array to push for new generation
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
```



