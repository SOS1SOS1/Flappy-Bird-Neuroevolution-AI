/*
** NEURAL NETWORKS **
*/

class NeuralNetwork {

  constructor(inputs, hiddens, outputs) {
    if (inputs instanceof NeuralNetwork) {
      let a = inputs;
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      // weights between input and hidden
      this.weights_ih = a.weights_ih.copy();
      // weights between hidden and output
      this.weights_ho = a.weights_ho.copy();

      // weights between input and hidden
      this.bias_h = a.bias_h.copy();
      // weights between hidden and output
      this.bias_o = a.bias_o.copy();
    } else {
      this.input_nodes = inputs;
      this.hidden_nodes = hiddens;
      this.output_nodes = outputs;

      // weights between input and hidden
      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      // weights between hidden and output
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

      this.weights_ih.randomize();
      this.weights_ho.randomize();

      // weights between input and hidden
      this.bias_h = new Matrix(this.hidden_nodes, 1);
      // weights between hidden and output
      this.bias_o = new Matrix(this.output_nodes, 1);

      this.bias_h.randomize();
      this.bias_o.randomize();
    }
  }

  feedForward(input_array) {
    // STEP 1 - put inputs in a matrix
    let inputs = Matrix.fromArray(input_array);

    // STEP 2 - calculates hidden node outputs
    let hidden = Matrix.multiply(this.weights_ih, inputs);  // matrix product of inputs and weights
    hidden = Matrix.add(hidden, this.bias_h);  // add in bias
    hidden.map(this.sigmoid);  // activation function

    // STEP 3 - calculates output node outputs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output = Matrix.add(output, this.bias_o);  // add in bias
    output.map(this.sigmoid);    // activation function

    return Matrix.toArray(output);  // returns outputs as array
  }

  copy() {
    return new NeuralNetwork(this);
  }

  mutate(rate) {
    function mutate(val) {
      if (Math.random() < rate) {
        //return 2 * Math.random() - 1; // new random value
        return val + randomGaussian(0, 0.1); // does a small nudge
      } else {
        return val;
      }
    }
    // uses above function for mutation
    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);
  }

  // returns the value of x in the sigmoid normalizing function
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_h = Matrix.deserialize(data.bias_h);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    return nn;
  }

  startTraining() {
    this.training = true;
  }

  isTraining() {
    this.training;
  }

  isFinished() {
    return this.finished;
  }

}
