class Sketch {
  constructor(p) {
    this.slider = new Slider(p);
    this.colorPalette = new ColorPalette(p);
    this.eraserButton = {};
    this.p = p;
    this.clearButton = new RectButton(p, {
      positionX: 690,
      positionY: 35,
      width: 70,
      height: 30,
      label: "Clear",
      color: "#f2f2f2",
      stroke: 0,
      strokeWeight: 1,
    });
    p.preload = () => this.preload();
    p.setup = () => this.setup();
    p.initializeTest = (p) => initializeTest(p);
  }

  setup() {
    TEST_MODE ? this.p.initializeTest(this.p) : this.initializeCanvas();
  }
  preload() {
    this.eraserSVG = this.p.loadImage("assets/eraser-svgrepo-com.svg");
    //debugger;
  }
  initializeCanvas() {
    this.p.draw = () => this.draw();
    this.p.drawControls = () => this.drawControls();
    this.p.createCanvas(1260, 700);
    this.p.background("#999999");
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(290, 25, 680, 55, 20);
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(180, 102, 900, 500, 20);
    this.p.noStroke();
    this.slider.initializeComponent(this.p);
    this.p.drawControls();
  }

  drawControls() {
    this.colorPalette.render(this.eraserSVG);
    this.slider.render();
    //this.eraserButton.render();
    this.clearButton.render();
  }

  draw() {
    // Clear and redraw the toolbar area to prevent text stacking
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(290, 25, 680, 55, 20);
    this.drawControls();

    if (this.p.mouseIsPressed && this.p.mouseY < 82) {
      if (this.clearButton.isClicked(this.p.mouseX, this.p.mouseY)) {
        this.clearButton.click();
        return;
      }
      this.colorPalette.checkColorClick(this.p.mouseX, this.p.mouseY);
      this.slider.checkSizeClick(this.p.mouseX, this.p.mouseY);
    }

    // for the label of slider
    this.p.fill(0);
    this.p.textAlign(this.p.LEFT, this.p.CENTER);
    this.p.textSize(12);
    this.p.noStroke();
    this.p.text(this.slider.brushSize, 660, 50);

    // Draw on canvas
    this.p.stroke(this.colorPalette.activePaletteColor);
    this.p.strokeWeight(this.slider.brushSize);
    this.p.strokeCap(this.p.ROUND);

    let upperBound = 102 + this.slider.brushSize / 2;
    let rightBound = 1080 - this.slider.brushSize / 2;
    let leftBound = 180 + this.slider.brushSize / 2;
    let bottomBound = 602 - this.slider.brushSize / 2;

    if (
      this.p.mouseIsPressed &&
      this.p.mouseY > upperBound &&
      this.p.mouseY < bottomBound &&
      this.p.mouseX < rightBound &&
      this.p.mouseX > leftBound &&
      this.p.pmouseY > upperBound &&
      this.p.pmouseY < bottomBound &&
      this.p.pmouseX < rightBound &&
      this.p.pmouseX > leftBound
    ) {
      this.p.line(this.p.pmouseX, this.p.pmouseY, this.p.mouseX, this.p.mouseY);
    }
  }
}

new p5((p) => new Sketch(p));
