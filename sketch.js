
var gameStarted = false;
var score = 0;
var highestScore = 0;
var slider;

var modes = ["HUMAN", "AI"];
var mode = modes[1];

var bestBird;
var birds = [];
var savedBirds = [];
var pipes = [];
var speed = 1;
var population_size = 500;
var num_generations = 1;
var pipe_spacing = 250;

function setup() {
  createCanvas(375, 600);
  textSize(16);
  textAlign(LEFT);
  slider = createSlider(1, 50, 1)
  slider.style("margin-top", "10px");

  pipes[0] = new Pipe(width);
  pipes[1] = new Pipe(width+pipe_spacing);

  if (mode == "AI") {
    for (let i = 0; i < population_size; i++) {
    	birds[i] = new Bird();
    }
    bestBird = birds[0];
  } else if (mode == "HUMAN") {
    birds[0] = new Bird();
  }

  // let loadBest = createButton("Load Best Bird");
  // loadBest.mousePressed(loadBestBird);
  // let trainOffBest = createButton("Train w/ Best Bird");
  // trainOffBest.mousePressed(trainOffBestBird);

  noLoop();
}


function draw() {
  // logic stuff
  speed = slider.value();
	// once the game has started, this updates the bird and pipes positions
	if (gameStarted == true && mode == "AI") {
		for (let i = 0; i < speed; i++) {
			for (let bird of birds) {
				if (bird.getIsAlive()) {
	        // roughly keeps track of bird's distance traveled
	        bird.score += 5;
	        bird.gravity();
	        bird.think();
	        checkForCollision(bird);
	      }
			}

			// if a bird dies, it removes it from the array
	    for (let i = 0; i < birds.length; i++) {
	      if (birds[i].getIsAlive() == false) {
	        birds.splice(i, 1);
	      } 
	    }

	    if (birds.length > 0) {
	    	// if a bird is still alive, update pipes
	     	for (let pipe of pipes) {
					pipe.update();
			 	}
	    } else {
	    	// otherwise, it creates a new generation of birds
	      score = 0;
	      newGeneration();
	    }
	  }
  } else if (gameStarted == true && mode == "HUMAN") {
  	for (let bird of birds) {
			if (bird.getIsAlive()) {
	      // roughly keeps track of bird's distance traveled
	      bird.score += 1;
	      bird.gravity();
	      checkForCollision(bird);
	    }
		}

		// if a bird dies, it removes it from the array
	  for (let i = 0; i < birds.length; i++) {
	    if (birds[i].getIsAlive() == false) {
	      birds.splice(i, 1);
	    } 
	  }

	  // if bird is still alive, update pipes
    if (birds.length > 0) {
    	for (let pipe of pipes) {
				pipe.update()
			}
    }
  }

	// drawing stuff
  background(169, 208, 245);

	// draws birds
	for (let bird of birds) {
		if (bird.getIsAlive()) {
			bird.draw()
		}
	}	
	// draws pipes
	fill(72, 179, 66);
	stroke(45, 102, 51);
	if (birds.length > 0) {
		for (let pipe of pipes) {
			pipe.draw()
		}
	}

	// draws scoreboard
  fill(0);
  text("Generation #" + num_generations, 10, 25);
  text("Score: " + score, 10, 50);
  text("Highest Score: " + highestScore, 10, height-15);

}

function keyPressed() {
  if (keyCode === 32) {  // 32 is the ascii key code for space bar
    // starts or resumes the game
    if (!gameStarted) {
      gameStarted = true;
      loop();
    }

    if (mode == "HUMAN") {
      // bird jumps
      if (birds.length > 0) {
      	birds[0].jump();
      }
    }
  } else if (keyCode == 80) {  // letter p
    // pauses game
    gameStarted = false;
  } else if (keyCode == 81) {  // letter q
    // quit game
    console.log("quit");
    noLoop();
  } else if (key === 'S') {
    // saves the best birds data to a json file
    //saveJSON(bestBird, 'bird.json');
  }
}

function checkForCollision(bird) {
	for (pipe of pipes) {
	  if (bird.getY() - bird.getRadius() < pipe.getTop() || bird.getY() + bird.getRadius() > pipe.getBottom()) {
	    if (bird.getX() - bird.getRadius() < pipe.getX() + pipe.getWidth() && bird.getX() + bird.getRadius() > pipe.getX()) {
	      // hit
	      bird.hit();
	    }
	  }
	}
}

function newGeneration() {
	// sums up birds fitnesses
  var sum = 0;
  for (let i = 0; i < savedBirds.length; i++) {
    sum += savedBirds[i].getScore();
  }

  // sets fitness value to a normalized value
  for (let i = 0; i < savedBirds.length; i++) {
    savedBirds[i].fitness = savedBirds[i].score / sum;
    if (savedBirds[i].score > bestBird.score) {
      bestBird = savedBirds[i];
    }
  }

  // Reproduction
  for (let i = 0; i < population_size; i++) {
    birds[i] = pickBird();
  }
  savedBirds = [];

  // resets pipes
  pipes[0] = new Pipe(width);
  pipes[1] = new Pipe(width+pipe_spacing);

  // keeps track of how many generations
  num_generations++;
}

// higher fitness gets picked more
// lower fitness picked less
function pickBird() {
  var index = 0;
  var r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];

  // create a child bird with that bird's brain
  let child = new Bird(bird.brain);
  // mutate the brain a bit
  child.mutate(0.01);
  return child;
}

// function loadBestBird() {
//   //data = loadJSON('bird.json');
//   p = new Population(0.01, 1);
//   bestBird = new Bird(data.brain.deserialize());
//   p.population[0] = bestBird;
// }

// var data = {};
// function preload() {
//   //data = loadJSON('bird.json');
// }

// function trainOffBestBird() {
//   // Reproduction
//   for (let i = 0; i < population_size; i++) {
//     p.population[i] = p.pickBasedOnBestBird();
//   }
//   score = 0;
//   savedBirds = [];

//   // resets pipes
//   pipe1 = new Pipe(0);
//   pipe2 = new Pipe(275);
// }
