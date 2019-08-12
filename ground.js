class Ground {
    constructor() {
      this.groundImage = new Image(); 
      this.groundImage.src = "img/ground.png"; 
      this.bottom = 65;
      this.x = width;
      this.w = 1000;
      this.speed = 10;
    }
    // Draw the ground
    show() {
      ctx.drawImage(this.groundImage, 0, height - 50, this.w, this.bottom); 
    }  
    // Update the ground
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