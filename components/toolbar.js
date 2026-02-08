import { SVGButton } from "./SVGButton.js";
import { CircleButton } from "./CircleButton.js";
import { Slider } from "./slider.js";

export class ToolBar {
  constructor(p) {
    this.activePaletteColor = "gray";
    this.colors = [
      "gray",
      "red",
      "blue",
      "green",
      "yellow",
      "orange",
      "purple",
      "black",
    ];
    this.paletteY = 40;
    this.paletteX = 310;
    this.colorSize = 20;
    this.spacing = 10;
    this.eraserX = 700;
    this.controlGap = 30;
    this.undoX = this.eraserX + this.controlGap;
    this.redoX = this.eraserX + this.controlGap * 2;
    this.downloadX = this.eraserX + this.controlGap * 3;
    this.isEraser = false;
    this.eraserButton = null;
    this.undoButton = null;
    this.redoButton = null;
    this.downloadButton = null;
    this.clearButton = null;
    this.slider = new Slider(p);
    this.slider.initializeComponent(this.p);
    this.p = p;
  }

  setLayout({ paletteX, eraserX, controlGap }) {
    if (typeof paletteX === "number") {
      this.paletteX = paletteX;
    }
    if (typeof eraserX === "number") {
      this.eraserX = eraserX;
    }
    if (typeof controlGap === "number") {
      this.controlGap = controlGap;
    }
    this.undoX = this.eraserX + this.controlGap;
    this.redoX = this.eraserX + this.controlGap * 2;
    this.downloadX = this.eraserX + this.controlGap * 3;
    if (this.eraserButton) {
      this.eraserButton.positionX = this.eraserX;
    }
    if (this.undoButton) {
      this.undoButton.positionX = this.undoX;
    }
    if (this.redoButton) {
      this.redoButton.positionX = this.redoX;
    }
    if (this.downloadButton) {
      this.downloadButton.positionX = this.downloadX;
    }
  }

  render() {
    this.p.noStroke();
    for (let i = 0; i < this.colors.length; i++) {
      let centerX =
        this.paletteX +
        i * (this.colorSize + this.spacing) +
        this.colorSize / 2;
      let centerY = this.paletteY + this.colorSize / 2;
      let isHighLight =
        this.activePaletteColor === this.colors[i] && !this.isEraser;
      let newButton = new CircleButton(this.p, {
        centerX: centerX,
        centerY: centerY,
        color: this.colors[i],
        colorSize: this.colorSize,
        highLight: isHighLight,
      });
      newButton.render();
    }

    if (!this.eraserButton && this.eraserSVG) {
      this.eraserButton = new SVGButton(this.p, {
        img: this.eraserSVG,
        width: 23,
        height: 23,
        positionX: this.eraserX,
        positionY: 40,
      });
    }
    if (!this.undoButton && this.undoLeftSVG) {
      this.undoButton = new SVGButton(this.p, {
        img: this.undoLeftSVG,
        width: 23,
        height: 23,
        positionX: this.undoX,
        positionY: 40,
        enableActive: false,
      });
    }
    if (!this.redoButton && this.undoRightSVG) {
      this.redoButton = new SVGButton(this.p, {
        img: this.undoRightSVG,
        width: 23,
        height: 23,
        positionX: this.redoX,
        positionY: 40,
        enableActive: false,
      });
    }
    if (!this.downloadButton && this.downloadSVG) {
      this.downloadButton = new SVGButton(this.p, {
        img: this.downloadSVG,
        width: 23,
        height: 23,
        positionX: this.downloadX,
        positionY: 40,
        enableActive: false,
      });
    }
    if (!this.clearButton && this.trashSVG) {
      this.clearButton = new SVGButton(this.p, {
        img: this.trashSVG,
        width: 23,
        height: 23,
        positionX: this.downloadX + this.controlGap,
        positionY: 40,
        enableActive: false,
      });
    }

    if (this.eraserButton) {
      this.eraserButton.isActive = this.isEraser;
      this.eraserButton.render();
    }
    if (this.undoButton) {
      this.undoButton.render();
    }
    if (this.redoButton) {
      this.redoButton.render();
    }
    if (this.downloadButton) {
      this.downloadButton.render();
    }
    if (this.clearButton) {
      this.clearButton.render();
    }

    this.slider.render();
  }

  // Pure function: checks if eraser button was clicked
  isEraserClicked(mouseX, mouseY) {
    let eraserCenterX = this.eraserX + this.colorSize / 2;
    let eraserCenterY = this.paletteY + this.colorSize / 2;
    let radius = this.colorSize / 2;
    let distance = this.p.dist(mouseX, mouseY, eraserCenterX, eraserCenterY);
    return distance < radius;
  }

  // Pure function: determines which color index was clicked (if any)
  getClickedColorIndex(mouseX, mouseY) {
    let radius = this.colorSize / 2;

    for (let i = 0; i < this.colors.length; i++) {
      let centerX =
        this.paletteX +
        i * (this.colorSize + this.spacing) +
        this.colorSize / 2;
      let centerY = this.paletteY + this.colorSize / 2;
      let distance = this.p.dist(mouseX, mouseY, centerX, centerY);
      if (distance < radius) {
        return i;
      }
    }
    return -1;
  }

  checkColorClick(mouseX, mouseY) {
    // Use testable pure functions
    const colorIndex = this.getClickedColorIndex(mouseX, mouseY);
    if (colorIndex !== -1) {
      this.activePaletteColor = this.colors[colorIndex];
      this.isEraser = false;
      return;
    }

    // Check eraser button using pure function
    if (this.isEraserClicked(mouseX, mouseY)) {
      this.isEraser = true;
      this.activePaletteColor = "#fff"; // Set to background color
      return;
    }
  }

  isUndoClicked(mouseX, mouseY) {
    return this.undoButton ? this.undoButton.isClicked(mouseX, mouseY) : false;
  }

  isRedoClicked(mouseX, mouseY) {
    return this.redoButton ? this.redoButton.isClicked(mouseX, mouseY) : false;
  }

  isDownloadClicked(mouseX, mouseY) {
    return this.downloadButton
      ? this.downloadButton.isClicked(mouseX, mouseY)
      : false;
  }
}
