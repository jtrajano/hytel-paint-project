export class Button {
  constructor(
    p,
    {
      colorSize,
      highLight = false,
      color = "",
      stroke = 0,
      strokeWeight = 3,
      label = "",
    } = {},
  ) {
    this.p = p;
    this.color = color;
    this.stroke = stroke;
    this.strokeWeight = strokeWeight;
    this.label = label;
    this.colorSize = colorSize;
    this.highLight = highLight;
  }

  isClicked() {
    console.log("isClicked method not implemented.");
  }
  click() {
    console.log("click method not implemented.");
  }
}

export class RectButton extends Button {
  constructor(
    p,
    { positionX, positionY, width, height, activeColor, enableActive, ...rest },
  ) {
    super(p, rest);
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = width;
    this.height = height;
    this.activeColor = activeColor || "#2f6feb";
    this.isActive = false;
    this.enableActive = enableActive || false;
  }

  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.positionX &&
      mouseX <= this.positionX + this.width &&
      mouseY >= this.positionY &&
      mouseY <= this.positionY + this.height
    );
  }

  render() {
    this.p.fill(
      this.enableActive && this.isActive ? this.activeColor : this.color,
    );
    this.p.stroke(this.stroke);
    this.p.strokeWeight(this.strokeWeight);
    this.p.rect(this.positionX, this.positionY, this.width, this.height, 6);
    this.p.noStroke();
    this.p.fill(0);
    this.p.textAlign(this.p.CENTER, this.p.CENTER);
    this.p.textSize(12);
    this.p.text(
      this.label,
      this.positionX + this.width / 2,
      this.positionY + this.height / 2,
    );
  }
}
