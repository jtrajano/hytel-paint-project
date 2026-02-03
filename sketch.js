var fillColor = 'black';
var colors = ['white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black'];
var paletteY = 20;
var paletteX = 50;
var colorSize = 50;
var spacing = 10;
var eraserX = 550;
var isEraser = false;

const TEST_MODE = true;

function setup() {
  TEST_MODE ? initializeTest() : initializeCanvas(); 
}
function initializeTest(){
  noCanvas();
  runTests();
  noLoop();
}

function initializeCanvas(){
  createCanvas(600, 600);  
  background('#999999');  
  noStroke();  // Draw color palette once  drawPalette();  if (TEST_MODE) {
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
    // Use testable pure functions
    const colorIndex = getClickedColorIndex(mouseX, mouseY, colors, paletteX, paletteY, colorSize, spacing);
    if (colorIndex !== -1) {
      fillColor = colors[colorIndex];
      isEraser = false;
      return;
    }
    
    // Check eraser button using pure function
    if (isEraserClicked(mouseX, mouseY, eraserX, paletteY, colorSize)) {
      isEraser = true;
      fillColor = '#999999'; // Set to background color
    }
  }
}

// Pure function: determines which color index was clicked (if any)
function getClickedColorIndex(mouseX, mouseY, colors, paletteX, paletteY, colorSize, spacing) {
  if (mouseY < paletteY || mouseY > paletteY + colorSize) {
    return -1; // Not in palette area
  }
  
  for (let i = 0; i < colors.length; i++) {
    let x = paletteX + i * (colorSize + spacing);
    if (mouseX > x && mouseX < x + colorSize) {
      return i;
    }
  }
  return -1; // No color clicked
}

// Pure function: checks if eraser button was clicked
function isEraserClicked(mouseX, mouseY, eraserX, paletteY, colorSize) {
  return mouseX > eraserX && 
         mouseX < eraserX + colorSize &&
         mouseY > paletteY && 
         mouseY < paletteY + colorSize;
}

// Pure function: checks if point is inside a rectangle
function isInsideRect(x, y, rectX, rectY, rectWidth, rectHeight) {
  return x > rectX && x < rectX + rectWidth && 
         y > rectY && y < rectY + rectHeight;
}
