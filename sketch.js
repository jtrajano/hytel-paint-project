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

const TEST_MODE = false;

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
    let centerX = paletteX + i * (colorSize + spacing) + colorSize / 2;
    let centerY = paletteY + colorSize / 2;
    
    fill(colors[i]);
    circle(centerX, centerY, colorSize);
    
    // Highlight selected color with border
    if (fillColor === colors[i] && !isEraser) {
      stroke(0);
      strokeWeight(3);
      noFill();
      circle(centerX, centerY, colorSize);
      noStroke();
    }
  }
  
  // Draw eraser button as circle
  let eraserCenterX = eraserX + colorSize / 2;
  let eraserCenterY = paletteY + colorSize / 2;
  fill(255);
  stroke(0);
  strokeWeight(2);
  circle(eraserCenterX, eraserCenterY, colorSize);
  
  // Highlight eraser if selected
  if (isEraser) {
    stroke(0);
    strokeWeight(3);
    noFill();
    circle(eraserCenterX, eraserCenterY, colorSize);
    noStroke();
  }
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
  let radius = colorSize / 2;
  
  for (let i = 0; i < colors.length; i++) {
    let centerX = paletteX + i * (colorSize + spacing) + colorSize / 2;
    let centerY = paletteY + colorSize / 2;
    let distance = dist(mouseX, mouseY, centerX, centerY);
    if (distance < radius) {
      return i;
    }
  }
  return -1;
}

// Pure function: checks if eraser button was clicked
function isEraserClicked(mouseX, mouseY, eraserX, paletteY, colorSize) {
  let eraserCenterX = eraserX + colorSize / 2;
  let eraserCenterY = paletteY + colorSize / 2;
  let radius = colorSize / 2;
  let distance = dist(mouseX, mouseY, eraserCenterX, eraserCenterY);
  return distance < radius;
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
