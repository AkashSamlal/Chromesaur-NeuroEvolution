let Dino = function(brain) {
  // position and size of dino
  this.x = 64;
  this.y = height - 60 ;
  this.r = 60;
  this.brain = brain;
  this.dinoImage = new Image();
  this.dinoImage.src = "img/dino.png";
  // Gravity and velocity
  this.gravity = 1.55;
  this.velocity = 0;
  // Score is how many frames it's been alive
  this.score = 0;
  // Fitness is normalized version of score
  this.fitness = 0;

  // Create a copy of this dino
  this.copys = function(){
    return new Dino(this.brain);
  }
  //Draw the Dino
  this.draw = function(){
      ctx.drawImage(this.dinoImage,  this.x, this.y, this.r, this.r);
   }
  // Dino determines if it should jump or not!
  this.think = function(cactus) {
    // First find the closest cactus
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < cactus.length; i++) {
      let diff = cactus[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = cactus[i];
      }
    }
     // Now create the inputs to the neural network
    if (closest != null) {
      let inputs = [];
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      inputs[1] = map(closest.bottom, 0, height, 0, 1);
      inputs[2] = map(this.y, 0, height, 0, 1);
      inputs[3] = map(this.velocity, -5, 5, 0, 1);
      // Get the outputs from the network
      let action = this.brain.activate(inputs);
      // Decide to jump or not!
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }
  // Jump up
  this.up = function() {
    if(this.y == height - 60) {
    this.velocity = -20;
     }
  }
  //// Dino dies when hits bottom?
  this.bottomTop = function(){
    return (this.y > height || this.y < 0);
  }
  // Update dino's position based on velocity, gravity, etc.
  this.update = function(){
    this.y += this.velocity; 
    this.velocity += this.gravity;  
    this.y = constrain(this.y, 0, height - 60);
    // Every frame it is alive increases the score
    this.score++;
  }
  this.getScore = function(){
    return this.score;
  }
  return this;
}