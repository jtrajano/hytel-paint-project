let slider;

function setup() {
  //createCanvas(100, 100);

  // Create a slider and place it at the top of the canvas.
  // Set its default value to 0.
  //rect(100, 100, 200, 150, 20); 
  createCanvas(1260, 580);

  background(200);
  noStroke();
  rect(30, 20, 600, 55, 20);
 
  createSliderComponent();

  //describe('A black square with a range slider at the top. The square changes color when the slider is moved.');
}


function createSliderComponent(){

  slider = createSlider(0, 255, 0);
  slider.position(520, 35);
  slider.size(80);
}
function draw() {
  // U//se the slider as a grayscale value.
  //let g = slider.value();
  //background(g);
//let g = slider.value();
  //background(g);
}