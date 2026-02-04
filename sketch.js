

const slider = new Slider();
const colorPalette = new ColorPalette();

function setup() {
  TEST_MODE ? initializeTest() : initializeCanvas(); 
}

function initializeCanvas(){
  createCanvas(600, 600);  
  background('#999999');  
  noStroke(); 
  drawControls();
}

function drawControls(){
  colorPalette.render();
  slider.render();
}
function draw() {
  // Redraw palette area to update selection highlight
  fill('#999999');
  noStroke();
  rect(0, 0, 600, 100);
  drawControls();
  
  if (mouseIsPressed && mouseY < 50) {
    colorPalette.checkColorClick(mouseX, mouseY);
    slider.checkSizeClick(mouseX, mouseY);
  }
  
  // Draw on canvas
  fill(colorPalette.activePaletteColor);
  noStroke();
  if(mouseIsPressed && mouseY > 50) {
    ellipse(mouseX, mouseY, slider.brushSize, slider.brushSize);
  }
}







// Pure function: calculates new brush size based on click position



