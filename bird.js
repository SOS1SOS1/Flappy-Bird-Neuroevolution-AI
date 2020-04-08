
class Bird {

  constructor(brain) {
    this.score = 0;  // based on how long the bird lives
    this.fitness = 0; // used to determine what percentage odds it has of being put in mating pool
    this.isAlive = true;

    this.radius = 15;
    this.x = 30;
    this.y = height/2;

    this.velocity = 0;
    this.acceleration = 0.6;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 8, 2);
    }

    this.red = Math.random() * 255;
    this.green = Math.random() * 255;
    this.blue = Math.random() * 255
  }

  draw() {
  	fill(this.red, this.green, this.blue, 75);
    stroke(this.red, this.green, this.blue, 95);
    circle(this.x, this.y, this.radius*2);
  }

  think() {
  	// determines next closest pipe
  	var nextPipe;
    if (pipes[0].getX() < pipes[1].getX() && pipes[0].getX() + pipes[0].getWidth() > this.x - this.radius) {
      nextPipe = pipes[0];
    } else {
      nextPipe = pipes[1];
    }

    // uses brain to decide if to jump
    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = nextPipe.getX() / width;
    inputs[2] = nextPipe.getGapY() / height;
    inputs[3] = this.velocity / 10;
    let outputs = this.brain.feedForward(inputs);

    if (outputs[0] > outputs[1]) {
      this.jump();
    }
  }

  hit() {
    savedBirds.push(this);
    this.isAlive = false;
  }

  jump() {
    this.velocity = -10;
  }

  gravity() {
    this.velocity += this.acceleration;
    this.y += this.velocity;

    if (this.y < 0 + this.radius + 2) {
      this.hit();
    } else if (this.y > height - this.radius-2) {
      this.hit();
    }
  }

  getScore() {
    return this.score;
  }

  mutate(rate) {
    this.brain.mutate(rate);
  }

  getIsAlive() {
    return this.isAlive;
  }

  getRadius() {
    return this.radius;
  }

  getDiameter() {
    return this.radius*2;
  }

  getY() {
    return this.y;
  }

  getX() {
    return this.x;
  }

}
