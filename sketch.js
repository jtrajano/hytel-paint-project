class Sketch {
  constructor(p) {
    this.slider = new Slider(p);
    this.colorPalette = new ColorPalette(p);
    this.p = p;
    p.setup = () => this.setup();
    p.initializeTest = (p) => initializeTest(p);
  }

  setup() {
    TEST_MODE ? this.p.initializeTest(this.p) : this.initializeCanvas();
  }

  initializeCanvas() {
    this.p.draw = () => this.draw();
    this.p.drawControls = () => this.drawControls();

    this.p.createCanvas(1260, 700);
    this.p.background("#999999");

    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(2, 25, 580, 55, 20);

    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(2, 102, 580, 500, 20);
    this.p.noStroke();
    this.slider.initializeComponent(this.p);
    this.p.drawControls();
  }

  drawControls() {
    this.colorPalette.render(this.p);
    this.slider.render(this.p);
  }
  draw() {
    // Clear and redraw the toolbar area to prevent text stacking
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(2, 25, 580, 55, 20);
    this.drawControls();

    if (this.p.mouseIsPressed && this.p.mouseY < 82) {
      this.colorPalette.checkColorClick(this.p.mouseX, this.p.mouseY);
      this.slider.checkSizeClick(this.p.mouseX, this.p.mouseY);
    }

    // for the label of slider
    this.p.fill(0);
    this.p.textAlign(this.p.LEFT, this.p.CENTER);
    this.p.textSize(12);
    this.p.noStroke();
    this.p.text(this.slider.brushSize, 490, 50);

    // Draw on canvas
    this.p.fill(this.colorPalette.activePaletteColor);
    this.p.noStroke();

    let upperBound = 102 + this.slider.brushSize / 2;
    let rightBound = 583 - this.slider.brushSize / 2;
    let leftBound = 2 + this.slider.brushSize / 2;
    let bottomBound = 550 + this.slider.brushSize / 2;
    if (
      this.p.mouseIsPressed &&
      this.p.mouseY > upperBound &&
      this.p.mouseY < bottomBound &&
      this.p.mouseX < rightBound &&
      this.p.mouseX > leftBound
    ) {
      this.p.ellipse(
        this.p.mouseX,
        this.p.mouseY,
        this.slider.brushSize,
        this.slider.brushSize,
      );
    }
  }
}

new p5((p) => new Sketch(p));
