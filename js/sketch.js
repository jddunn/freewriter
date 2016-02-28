// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An array of objects
var oscillators = [];
var oscillatorCollide;

var canvas;
var userSpeed = 0;

var turnOnAutoBool = false;

function setup()  {
  canvas = createCanvas(displayWidth/8.5, displayHeight/7.0);
  canvas.parent('circleCanvas');
  //canvas.position(displayWidth /1.2, displayHeight/1.6);
  // Initialize all objects
  userSpeed = userSpeed + 4;
  // oscillatorCollide = new OscillatorCollide();
  for (var i = 0; i < userSpeed; i++) {
    oscillators.push(new Oscillator());
  }
}

function draw() {
  background(254, 253, 251);
    // oscillatorCollide.display();

  // Run all objects
  for (var i = 0; i < userSpeed; i++) {
    oscillators.push(new Oscillator());
    oscillators[i].oscillate();
    oscillators[i].display();

  }
  // oscillatorCollide.ocillate();

 

    // velocity.y = velocity.y * -1;
  
}

function turnOnAuto() {
  if (cipherEntered == true) {
    turnOnAutoBool = true;
    cipherOn();
  }
}


function turnOffAuto() {
  if (cipherEntered == true) {
    turnOffAutoBool = false;
    cipherOff();
  }
}

function turnAutoFaster() {
    userSpeed = userSpeed + 1;
    // print(userSpeed);
    return userSpeed;
}


function turnAutoSlower() {
  if (userSpeed >= 0) {
    userSpeed = userSpeed - 1;
    return userSpeed;
        // print(userSpeed);

  }
}