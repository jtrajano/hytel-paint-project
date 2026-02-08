class Sketch {
  constructor(p) {
    this.slider = new Slider(p);
    this.colorPalette = new ColorPalette(p);
    this.eraserButton = {};
    this.p = p;
    this.strokes = [];
    this.redoStrokes = [];
    this.currentStroke = null;
    this.canvasX = 180;
    this.canvasY = 102;
    this.canvasW = 900;
    this.canvasH = 500;
    this.clearButton = null;
    p.preload = () => this.preload();
    p.setup = () => this.setup();
    p.initializeTest = (p) => initializeTest(p);
    p.mousePressed = () => this.handleMousePressed();
    p.mouseReleased = () => this.handleMouseReleased();
  }

  setup() {
    TEST_MODE ? this.p.initializeTest(this.p) : this.initializeCanvas();
  }
  preload() {
    this.eraserSVG = this.p.loadImage("assets/eraser-svgrepo-com.svg");
    this.undoLeftSVG = this.p.loadImage("assets/undo-left-svgrepo-com.svg");
    this.undoRightSVG = this.p.loadImage("assets/undo-right-svgrepo-com.svg");
    this.trashSVG = this.p.loadImage("assets/trash-alt-svgrepo-com.svg");
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
    this.p.rect(this.canvasX, this.canvasY, this.canvasW, this.canvasH, 20);
    this.p.noStroke();
    this.slider.initializeComponent(this.p);
    if (!this.clearButton && this.trashSVG) {
      this.clearButton = new SVGButton(this.p, {
        img: this.trashSVG,
        width: 23,
        height: 23,
        positionX: 880,
        positionY: 40,
        enableActive: false,
      });
    }
    this.p.drawControls();
  }

  drawControls() {
    this.colorPalette.render(
      this.eraserSVG,
      this.undoLeftSVG,
      this.undoRightSVG,
    );
    this.slider.render();
    //this.eraserButton.render();
    if (this.clearButton) {
      this.clearButton.render();
    }
  }

  draw() {
    // Clear and redraw the toolbar area to prevent text stacking
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(290, 25, 680, 55, 20);
    this.drawControls();

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

    let upperBound = this.canvasY + this.slider.brushSize / 2;
    let rightBound = this.canvasX + this.canvasW - this.slider.brushSize / 2;
    let leftBound = this.canvasX + this.slider.brushSize / 2;
    let bottomBound = this.canvasY + this.canvasH - this.slider.brushSize / 2;

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
      if (!this.currentStroke) {
        this.currentStroke = {
          color: this.colorPalette.activePaletteColor,
          size: this.slider.brushSize,
          points: [],
        };
      }
      this.currentStroke.points.push({
        x: this.p.mouseX,
        y: this.p.mouseY,
      });
      this.p.line(this.p.pmouseX, this.p.pmouseY, this.p.mouseX, this.p.mouseY);
    }
  }

  handleMousePressed() {
    if (this.p.mouseY >= 82) {
      return;
    }
    if (
      this.clearButton &&
      this.clearButton.isClicked(this.p.mouseX, this.p.mouseY)
    ) {
      this.clearCanvas();
      return;
    }
    if (this.colorPalette.isUndoClicked(this.p.mouseX, this.p.mouseY)) {
      this.undo();
      return;
    }
    if (this.colorPalette.isRedoClicked(this.p.mouseX, this.p.mouseY)) {
      this.redo();
      return;
    }
    this.colorPalette.checkColorClick(this.p.mouseX, this.p.mouseY);
    this.slider.checkSizeClick(this.p.mouseX, this.p.mouseY);
  }

  handleMouseReleased() {
    if (!this.currentStroke) {
      return;
    }
    if (this.currentStroke.points.length > 1) {
      this.strokes.push(this.currentStroke);
      this.redoStrokes = [];
    }
    this.currentStroke = null;
  }

  undo() {
    if (this.strokes.length === 0) {
      return;
    }
    const stroke = this.strokes.pop();
    this.redoStrokes.push(stroke);
    this.redrawFromStrokes();
  }

  redo() {
    if (this.redoStrokes.length === 0) {
      return;
    }
    const stroke = this.redoStrokes.pop();
    this.strokes.push(stroke);
    this.redrawFromStrokes();
  }

  redrawFromStrokes() {
    this.p.noStroke();
    this.p.fill("#fff");
    this.p.rect(this.canvasX, this.canvasY, this.canvasW, this.canvasH, 20);
    for (const stroke of this.strokes) {
      this.p.stroke(stroke.color);
      this.p.strokeWeight(stroke.size);
      this.p.strokeCap(this.p.ROUND);
      for (let i = 1; i < stroke.points.length; i++) {
        const prev = stroke.points[i - 1];
        const cur = stroke.points[i];
        this.p.line(prev.x, prev.y, cur.x, cur.y);
      }
    }
  }

  clearCanvas() {
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(this.canvasX, this.canvasY, this.canvasW, this.canvasH, 20);
    this.p.noStroke();
    this.strokes = [];
    this.redoStrokes = [];
    this.currentStroke = null;
  }
}

new p5((p) => new Sketch(p));
