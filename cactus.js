class Cactus {
  constructor() {
    let spacing = random(60, 90);
    
    this.cactArray = new Array(); 
    this.cactArray[0] = new Image(); 
    this.cactArray[1] = new Image(); 
    this.cactArray[2] = new Image(); 
    this.cactArray[3] = new Image(); 

    this.cactArray[0].src = "img/firstCact.png";
    this.cactArray[1].src = "img/doubleCact.png";
    this.cactArray[2].src = "img/oddCact.png";
    this.cactArray[3].src = "img/tripleCact.png"; 

    let randomItem = this.cactArray[Math.floor(Math.random() * this.cactArray.length)];
    this.temp = randomItem; 
    this.bottom = spacing;
    this.x = width;
    this.w = 65;
    this.speed = 10;
  }

  // Did this cactus hit a dino?
  hits(dino) {
    if ((dino.y + dino.r) > (height - this.bottom)) { 
        if (dino.x > this.x && dino.x  < this.x  + this.w) {
        return true;
      }
    }
    return false;
  }
  // Draw the cactus
  show() {
    ctx.drawImage(this.temp, this.x, height - 85, this.w, this.bottom); 
  }
  // Update the cactus
  update() {
    this.x -= this.speed;
  }
  // Has it moved offscreen?
  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}