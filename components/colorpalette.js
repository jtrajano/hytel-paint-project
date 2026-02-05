class ColorPalette {
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
    this.paletteX = 20;
    this.colorSize = 20;
    this.spacing = 10;
    this.eraserX = 550;
    this.isEraser = false;
    this.p = p;
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
      let newButton = new CircleButton(
        this.p,
        this.colors[i],
        this.colorSize,
        centerX,
        centerY,
        isHighLight,
      );
      newButton.render();
    }

    // Draw eraser button as circle
    let eraserCenterX = this.eraserX + this.colorSize / 2;
    let eraserCenterY = this.paletteY + this.colorSize / 2;
    this.p.fill(255);
    this.p.stroke(0);
    this.p.strokeWeight(2);
    this.p.circle(eraserCenterX, eraserCenterY, this.colorSize);

    // Highlight eraser if selected
    if (this.isEraser) {
      this.p.stroke(0);
      this.p.strokeWeight(3);
      this.p.noFill();
      this.p.circle(eraserCenterX, eraserCenterY, this.colorSize);
      this.p.noStroke();
    }
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
}
