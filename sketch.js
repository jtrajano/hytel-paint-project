var fillColor = 'black';
var colors = ['white', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black'];
var paletteY = 20;
var paletteX = 20;
var colorSize = 20;
var spacing = 10;
var eraserX = 550;
var isEraser = false;


// Brush size variables
var brushSize = 20;
var minBrushSize = 5;
var maxBrushSize = 50;
var sizeControlX = 350;
var sizeControlY = 20;
var sizeControlWidth = 150;
var sizeControlHeight = 20;

const TEST_MODE = true;

function setup() {
  TEST_MODE ? initializeTest() : initializeCanvas(); 
}
function initializeTest(){
  noCanvas();
  runTests();
  testSummary();
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
  if (mouseIsPressed && mouseY < 50) {
    checkColorClick();
  }
  
  // Draw on canvas
  fill(fillColor);
  noStroke();
  if(mouseIsPressed && mouseY > 50) {
    ellipse(mouseX, mouseY, brushSize, brushSize);
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
  //fill(220);
  //noStroke();
  //rect(eraserX + 10, paletteY + 15, 30, 20);
  //fill(0);
  //textAlign(CENTER, CENTER);
  //textSize(10);
  //text('ERASE', eraserX + 25, paletteY + 40);
  
  // Highlight eraser if selected
  if (isEraser) {
    stroke(0);
    strokeWeight(3);
    noFill();
    rect(eraserX, paletteY, colorSize, colorSize);
    noStroke();
  }
  // Draw size control
  drawSizeControl();
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
         return;
    }
    
    // Check size control click
    checkSizeClick(mouseX, mouseY);

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


// Draw size control slider
function drawSizeControl() {
  // Draw background bar
  fill(200);
  stroke(0);
  strokeWeight(1);
  rect(sizeControlX, sizeControlY, sizeControlWidth, sizeControlHeight);
  
  // Calculate thumb position based on current brush size
  const thumbPosition = map(brushSize, minBrushSize, maxBrushSize, sizeControlX, sizeControlX + sizeControlWidth);
  
  // Draw thumb indicator
  fill(100);
  noStroke();
  rect(thumbPosition - 5, sizeControlY - 5, 10, sizeControlHeight + 10);
  
  // Draw size label
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(12);
  text(brushSize, sizeControlX + sizeControlWidth + 10, sizeControlY + sizeControlHeight / 2);
}

// Check if size control was clicked and update brush size
function checkSizeClick(mouseX, mouseY) {
  debugger;
  if (mouseY >= sizeControlY && mouseY <= sizeControlY + sizeControlHeight &&
      mouseX >= sizeControlX && mouseX <= sizeControlX + sizeControlWidth) {
    // Calculate brush size based on mouse position on slider
    const relativeX = mouseX - sizeControlX;
    const ratio = constrain(relativeX / sizeControlWidth, 0, 1);
    brushSize = round(map(ratio, 0, 1, minBrushSize, maxBrushSize));
  }
}

// Pure function: checks if size control was clicked
function isSizeControlClicked(mouseX, mouseY, sizeControlX, sizeControlY, sizeControlWidth, sizeControlHeight) {
  return mouseY > sizeControlY && 
         mouseY < sizeControlY + sizeControlHeight &&
         mouseX > sizeControlX && 
         mouseX < sizeControlX + sizeControlWidth;
}
