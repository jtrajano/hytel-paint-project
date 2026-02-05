let slider;

function setup() {
  createCanvas(100, 100);

  // Create a slider and place it at the top of the canvas.
  // Set its default value to 0.
  slider = createSlider(0, 255, 0);
  slider.position(10, 10);
  slider.size(80);

  describe('A black square with a range slider at the top. The square changes color when the slider is moved.');
}

function draw() {
  // Use the slider as a grayscale value.
  let g = slider.value();
  background(g);
}