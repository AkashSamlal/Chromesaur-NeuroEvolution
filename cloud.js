class Cloud {
    constructor() {
      let centery = random(60, 90);
      let rHeight = random(90, 250);  

      this.cloudImage = new Image(); 
      this.cloudImage.src = "img/cloud.png";
  
      this.bottom = centery;
      this.randomHeight = rHeight;
      this.x = width;
      this.w = 90;
      this.speed = 10;
  }
    // Draw the cloud
    show() {
      ctx.drawImage(this.cloudImage, this.x, this.randomHeight, this.w, 30); 
    }
    // Update the cloud
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