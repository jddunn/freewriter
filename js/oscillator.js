// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var Oscillator = function() {
  this.angle = createVector();
  this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
  this.amplitude = createVector(random(30, width/2), random(30, height/2));



  this.oscillate = function() {
    this.angle.add(this.velocity);
  };

  this.display = function() {
    var x = sin(this.angle.x) * this.amplitude.x;
    var y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width/2, height/2);
    stroke(255);
    strokeWeight(2);
    stroke(150, 150, 150);
    fill(253, 253, 253, 253);
    line(0, 0, x, y);
    ellipse(x, y, 16, 16);
    pop();
    var mapX = x * 10;
    var mapY = y * 10;
    if (turnOnAutoBool) {
      if (mapX > canvas.width && cipherEntered == true) {
        cipherOn();
        }
      if (mapY > canvas.height && cipherEntered == true) {
        cipherOff();
      }
    }
    // print(mapX);
    // print(canvas.width)
  };
};

// var OscillatorCollide = function() {
//   this.angle = createVector();
//   this.velocity = createVector(random(-.001, .001), random(-.001, .001));
//   this.amplitude = createVector(random(20, width/2), random(20, height/2));

//   this.oscillate = function() {
//     this.angle.add(this.velocity);
//   };

//   this.display = function() {
//     var x = sin(this.angle.x) * this.amplitude.x;
//     var y = sin(this.angle.y) * this.amplitude.y;

//     push();
//     translate(width/2, height/2);
//     stroke(255);
//     strokeWeight(2);
//     stroke(150, 150, 150);
//     fill(220, 220, 220, 220);
//     line(0, 0, x, y);
//     ellipse(x, y, 16, 16);
//     pop();

//   }
// };