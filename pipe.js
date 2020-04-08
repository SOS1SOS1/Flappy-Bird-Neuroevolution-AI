
class Pipe {

  constructor(start_x) {
    this.width = 40;
    this.gapSize = 160;
    this.createRandomPipe(start_x)
  }

  update() {
    this.x -= 5;
    if (this.x < -this.width) {
      // pipe went off screen so create a new random pipe
      this.createRandomPipe(this.x+pipe_spacing*2);
      score++;
      if (score > highestScore) {
        highestScore = score;
      }
    }
  }

  draw() {
    // top pipe
    rect(this.x, 0, this.width, this.top);
    // bottom pipe
    rect(this.x, this.bottom, this.width, height-this.bottom);
  }

  createRandomPipe(xPos) {
    this.x = xPos;
    this.gapY = Math.floor((Math.random() * (height-250)) + 100);
    this.bottom = this.gapY + this.gapSize/2;
    this.top = this.gapY - this.gapSize/2;
  }

  getGapY() {
    return this.gapY;
  }

  getX() {
    return this.x;
  }

  getBottom() {
    return this.bottom;
  }

  getTop() {
    return this.top;
  }

  getWidth() {
    return this.width;
  }

}
