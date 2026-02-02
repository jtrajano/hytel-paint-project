var fillColor = 'black';
var colors = ['white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black'];
var paletteY = 20;
var paletteX = 50;
var colorSize = 50;
var spacing = 10;

function setup() {
  createCanvas(600, 600);
  background('#999999');
  noStroke();
  // Draw color palette once
  drawPalette();
}

function draw() {
  // Check which color is clicked
  if (mouseIsPressed && mouseY < 100) {
    checkColorClick();
  }
  
  // Draw on canvas
  fill(fillColor);
  noStroke();
  if(mouseIsPressed && mouseY > 100) {
    ellipse(mouseX, mouseY, 40, 40);
  }
}

function drawPalette() {
  noStroke();
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(paletteX + i * (colorSize + spacing), paletteY, colorSize, colorSize);
    
    // Highlight selected color with border
    if (fillColor === colors[i]) {
      stroke(0);
      strokeWeight(3);
      noFill();
      rect(paletteX + i * (colorSize + spacing), paletteY, colorSize, colorSize);
      noStroke();
    }
  }
}

function checkColorClick() {
  if (mouseIsPressed) {
    for (let i = 0; i < colors.length; i++) {
      let x = paletteX + i * (colorSize + spacing);
      let y = paletteY;
      
      if (mouseX > x && mouseX < x + colorSize && 
          mouseY > y && mouseY < y + colorSize) {
        fillColor = colors[i];
      }
    }
  }
}