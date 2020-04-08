
// matrix object
class Matrix {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    this.data = [];
    for (let i = 0; i < rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }

  static fromArray(arr) {
    // creates a matrix object from an array with 1 column and x rows based on array's size
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  static toArray(m) {
    let arr = [];
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        arr.push(m.data[i][j]);
      }
    }
    return arr;
  }

  randomize() {
    // randomizes all the values in the matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = (Math.random() * 2) - 1;  // random value from -1 to 1
      }
    }
    return this.data;
  }

  add(n) {
    // add n value to all elements (scalar)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] += n;
      }
    }
  }

  static add(a, b) {
    // add two matrices (element wise)
    if (a.rows == b.rows && a.cols == b.cols) {
      let m = new Matrix(a.rows, a.cols);
      for (let i = 0; i < a.rows; i++) {
        for (let j = 0; j < a.cols; j++) {
          m.data[i][j] = a.data[i][j] + b.data[i][j];
        }
      }
      return m;
    } else {
      console.log("Error: Can't add, rows and columns don't match.");
    }
  }

  transpose() {
    // flips rows and cols of matrix
    let tempMatrix = new Matrix(this.rows, this.cols);
    // copies the data from the matrix into a temp. matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        tempMatrix.data[i][j] = this.data[i][j];
      }
    }
    // resizes the matrix with flipped size
    this.rows = tempMatrix.cols;
    this.cols = tempMatrix.rows;
    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = tempMatrix.data[j][i];
      }
    }
  }

  static transpose(a) {
    // flips rows and cols of matrix
    let m = new Matrix(this.cols, this.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        m.data[i][j] = a.data[j][i];
      }
    }
    return m.data;
  }

  multiply(n) {
    // multiply all elements in matrix by n (scalar)
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] *= n;
      }
    }
  }

  static multiply(a, b) {
    // multiplies two matrices (also known as dot product)
    // [a b c]   [g h]
    // [d e f] * [i j]   = [(a*g)+(b*i)+(c*k) (a*h)+(b*j)+(c*l)]
    //           [k l]     [(d*g)+(e*i)+(f*k) (d*h)+(e*j)+(f*l)]
    let m = new Matrix(a.rows, b.cols);
    if (a.cols == b.rows) {
      for (let i = 0; i < a.rows; i++) {
        for (let j = 0; j < b.cols; j++) {
          var sum = 0;
          for (let k = 0; k < a.cols; k++) {
            sum += a.data[i][k] * b.data[k][j];
          }
          m.data[i][j] = sum;
        }
      }
      return m;
    } else {
      console.log("Error: Can't do dot product, rows of A don't match columns of B.");
    }
  };

  map(fn) {
    // applys a function (fn) to every element of the matrix
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = fn(this.data[i][j]);
      }
    }
  }

  serialize() {
    return JSON.stringify(this);
  }

  deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let m = new Matrix (data.rows, data.cols);
    m.data = data.data;
    return m;
  }

  print() {
    console.table(this.data);
  }

}
