import { ToolBar } from "./base/toolbar.js";
import { Slider } from "./base/slider.js";
import { SVGButton } from "./components/SVGButton.js";

class Sketch {
  constructor(p) {
    this.slider = new Slider(p);
    this.toolbar = new ToolBar(p);
    this.eraserButton = {};
    this.p = p;
    this.strokes = [];
    this.redoStrokes = [];
    this.currentStroke = null;
    this.canvasX = 180;
    this.canvasY = 102;
    this.canvasW = 900;
    this.canvasH = 500;
    this.drawingLayer = null;
    this.clearButton = null;
    this.toolbarX = 290;
    this.toolbarY = 25;
    this.toolbarW = 680;
    this.toolbarH = 55;
    this.toolbarPadding = 20;
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
    this.downloadSVG = this.p.loadImage(
      "assets/download-square-svgrepo-com.svg",
    );
  }

  initializeCanvas() {
    this.p.draw = () => this.draw();
    this.p.drawControls = () => this.drawControls();
    this.p.createCanvas(1260, 700);
    this.p.background("#999999");
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.updateToolbarLayout();
    this.p.rect(this.toolbarX, this.toolbarY, this.toolbarW, this.toolbarH, 20);
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
        positionX: this.toolbar.downloadX + this.toolbar.controlGap,
        positionY: 40,
        enableActive: false,
      });
    }
    this.drawingLayer = this.p.createGraphics(this.canvasW, this.canvasH);
    this.p.drawControls();
  }

  drawControls() {
    this.toolbar.render(
      this.eraserSVG,
      this.undoLeftSVG,
      this.undoRightSVG,
      this.downloadSVG,
    );
    this.slider.render();
    if (this.clearButton) {
      this.clearButton.render();
    }
  }

  draw() {
    // Clear and redraw the toolbar area to prevent text stacking
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.updateToolbarLayout();
    this.p.rect(this.toolbarX, this.toolbarY, this.toolbarW, this.toolbarH, 20);
    this.drawControls();

    // Redraw canvas area and the drawing layer
    this.p.fill("#fff");
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.rect(this.canvasX, this.canvasY, this.canvasW, this.canvasH, 20);
    this.p.noStroke();
    if (this.drawingLayer) {
      this.p.image(this.drawingLayer, this.canvasX, this.canvasY);
    }

    if (this.drawingLayer) {
      this.drawingLayer.stroke(this.toolbar.activePaletteColor);
      this.drawingLayer.strokeWeight(this.slider.brushSize);
      this.drawingLayer.strokeCap(this.p.ROUND);
    }

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
          color: this.toolbar.activePaletteColor,
          size: this.slider.brushSize,
          points: [],
        };
      }
      this.currentStroke.points.push({
        x: this.p.mouseX,
        y: this.p.mouseY,
      });
      if (this.drawingLayer) {
        this.drawingLayer.line(
          this.p.pmouseX - this.canvasX,
          this.p.pmouseY - this.canvasY,
          this.p.mouseX - this.canvasX,
          this.p.mouseY - this.canvasY,
        );
      }
    }
  }

  updateToolbarLayout() {
    const paletteWidth =
      this.toolbar.colors.length * this.toolbar.colorSize +
      (this.toolbar.colors.length - 1) * this.toolbar.spacing;
    const controlGap = 30;
    const gapBetweenPalette = 30;
    const gapBetweenSlider = 30;
    const iconWidth = 23;
    const sliderWidth = 80;
    const sliderLabelGap = 20;
    const sliderBlockWidth = sliderWidth + sliderLabelGap;
    const controlsWidth = controlGap * 4 + iconWidth;
    const toolbarWidth =
      paletteWidth +
      gapBetweenPalette +
      sliderBlockWidth +
      gapBetweenSlider +
      controlsWidth +
      this.toolbarPadding * 2;
    this.toolbarW = toolbarWidth;
    this.toolbarX = (this.p.width - this.toolbarW) / 2;
    const paletteX = this.toolbarX + this.toolbarPadding;
    const sliderX = paletteX + paletteWidth + gapBetweenPalette;
    const eraserX = sliderX + sliderBlockWidth + gapBetweenSlider;
    this.toolbar.setLayout({
      paletteX,
      eraserX,
      controlGap,
    });
    this.slider.setLayout({ x: sliderX, y: this.toolbarY + 15 });
    if (this.clearButton) {
      this.clearButton.positionX =
        this.toolbar.downloadX + this.toolbar.controlGap;
      this.clearButton.positionY = this.toolbarY + 15;
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
    if (this.toolbar.isUndoClicked(this.p.mouseX, this.p.mouseY)) {
      this.undo();
      return;
    }
    if (this.toolbar.isRedoClicked(this.p.mouseX, this.p.mouseY)) {
      this.redo();
      return;
    }
    if (this.toolbar.isDownloadClicked(this.p.mouseX, this.p.mouseY)) {
      this.downloadDrawing();
      return;
    }
    this.toolbar.checkColorClick(this.p.mouseX, this.p.mouseY);
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
    if (!this.drawingLayer) {
      return;
    }
    this.drawingLayer.clear();
    for (const stroke of this.strokes) {
      this.drawingLayer.stroke(stroke.color);
      this.drawingLayer.strokeWeight(stroke.size);
      this.drawingLayer.strokeCap(this.p.ROUND);
      for (let i = 1; i < stroke.points.length; i++) {
        const prev = stroke.points[i - 1];
        const cur = stroke.points[i];
        this.drawingLayer.line(
          prev.x - this.canvasX,
          prev.y - this.canvasY,
          cur.x - this.canvasX,
          cur.y - this.canvasY,
        );
      }
    }
  }

  clearCanvas() {
    if (this.drawingLayer) {
      this.drawingLayer.clear();
    }
    this.strokes = [];
    this.redoStrokes = [];
    this.currentStroke = null;
  }

  downloadDrawing() {
    const now = new Date();
    const timestamp =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      "-" +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");
    if (!this.drawingLayer) {
      return;
    }
    const output = this.p.createGraphics(this.canvasW, this.canvasH);
    output.background(255);
    output.image(this.drawingLayer, 0, 0);
    const img = output.get();
    output.remove();
    this.p.save(img, `drawing-${timestamp}.png`);
  }
}

new p5((p) => new Sketch(p));
