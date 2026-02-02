var fillColor = 'black';
var colors = ['white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black'];
var paletteY = 20;
var paletteX = 50;
var colorSize = 50;
var spacing = 10;
var eraserX = 550;
var isEraser = false;

function setup() {
  createCanvas(600, 600);
  background('#999999');
  noStroke();
  // Draw color palette once
  drawPalette();
}

function draw() {
  // Redraw palette area to update selection highlight
  fill('#999999');
  noStroke();
  rect(0, 0, 600, 100);
  drawPalette();
  
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
    if (fillColor === colors[i] && !isEraser) {
      stroke(0);
      strokeWeight(3);
      noFill();
      rect(paletteX + i * (colorSize + spacing), paletteY, colorSize, colorSize);
      noStroke();
    }
  }
  
  // Draw eraser button
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(eraserX, paletteY, colorSize, colorSize);
  
  // Draw eraser icon
  fill(220);
  noStroke();
  rect(eraserX + 10, paletteY + 15, 30, 20);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('ERASE', eraserX + 25, paletteY + 40);
  
  // Highlight eraser if selected
  if (isEraser) {
    stroke(0);
    strokeWeight(3);
    noFill();
    rect(eraserX, paletteY, colorSize, colorSize);
    noStroke();
  }
}

function checkColorClick() {
  if (mouseIsPressed) {
    // Check color palette
    for (let i = 0; i < colors.length; i++) {
      let x = paletteX + i * (colorSize + spacing);
      let y = paletteY;
      
      if (mouseX > x && mouseX < x + colorSize && 
          mouseY > y && mouseY < y + colorSize) {
        fillColor = colors[i];
        isEraser = false;
      }
    }
    
    // Check eraser button
    if (mouseX > eraserX && mouseX < eraserX + colorSize &&
        mouseY > paletteY && mouseY < paletteY + colorSize) {
      isEraser = true;
      fillColor = '#999999'; // Set to background color
    }
  }
}