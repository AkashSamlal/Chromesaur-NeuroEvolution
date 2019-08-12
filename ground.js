class Ground {
    constructor() {
      this.groundImage = new Image(); 
      this.groundImage.src = "img/ground.png"; 
      this.bottom = 65;
      this.x = 0;
      this.w = 2000;
      this.speed = 10;
    }
    // Draw the ground
    show() {
      ctx.drawImage(this.groundImage, this.x, height - 50, this.w, 28); 
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