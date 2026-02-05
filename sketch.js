

const slider = new Slider();
const colorPalette = new ColorPalette();


function setup() {
  TEST_MODE ? initializeTest() : initializeCanvas(); 
}

function initializeCanvas(){
  createCanvas(1260, 700);  
  background('#999999');  

  fill('#fff');
  stroke(0);
  strokeWeight(1);
  rect(2, 25, 580, 55, 20);
  
  fill('#fff');  
  stroke(0);
  strokeWeight(1);
  rect(2, 102, 580, 500, 20);

  noStroke(); 
  slider.initializeComponent();
  drawControls();
}

function drawControls(){
  colorPalette.render();
  slider.render();
}
function draw() { 
   // Clear and redraw the toolbar area to prevent text stacking
  fill('#fff');
  stroke(0);
  strokeWeight(1);
  rect(2, 25, 580, 55, 20);
  drawControls();

  if (mouseIsPressed && mouseY < 82) {
    colorPalette.checkColorClick(mouseX, mouseY);
    slider.checkSizeClick(mouseX, mouseY);
  }
  
  // for the label of slider
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(12);
  noStroke();
  text(slider.brushSize, 490, 50);
  
  // Draw on canvas
  fill(colorPalette.activePaletteColor);
  noStroke();

  let upperBound = 102 + slider.brushSize/2;
  let rightBound = 583 - slider.brushSize/2;
  let leftBound = 2 + slider.brushSize/2;
  let bottomBound = 550 + slider.brushSize/2;
  if(mouseIsPressed 
    && mouseY > upperBound 
    && mouseY < bottomBound
    && mouseX < rightBound
    && mouseX > leftBound  
  ) {
    ellipse(mouseX, mouseY, slider.brushSize, slider.brushSize);
  }
}


