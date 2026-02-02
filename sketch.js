function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}var fillColor = 'white'

function setup() {
  createCanvas(600, 600);
  background('#999999');
  noStroke();
  
  rect(50, 20, 60, 60);
  fill('red');
  rect(120, 20, 60, 60);
}

function draw() {

  
  if (mouseIsPressed && mouseX > 50 && mouseX < 110 && mouseY > 20 && mouseY < 70) {
    fillColor = 'white'
  }
    
  if (mouseIsPressed && mouseX > 120 && mouseX < 180 && mouseY > 20 && mouseY < 70) {
    fillColor = 'red'
  }
  
  fill(fillColor)
  if(mouseIsPressed && mouseY > 110) {
    ellipse(mouseX, mouseY, 60, 60);
  }
}