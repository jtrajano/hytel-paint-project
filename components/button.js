class Button {
  constructor(p, color, colorSize, highLight, stroke, strokeWeight) {
    this.color = color;
    this.colorSize = colorSize;
    this.highLight = highLight;
    this.stroke = stroke;
    this.strokeWeight = strokeWeight;
    this.p = p;
  }
}

class CircleButton extends Button {
  constructor(
    p,
    color,
    colorSize,
    centerX,
    centerY,
    highLight = false,
    stroke = 0,
    strokeWeight = 3,
  ) {
    super(p, color, colorSize, highLight, stroke, strokeWeight);
    this.colorSize = colorSize;
    this.highLight = highLight;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  render() {
    this.p.fill(this.color);
    this.p.circle(this.centerX, this.centerY, this.colorSize);

    // put borders
    this.p.stroke(0);
    this.p.strokeWeight(1);
    this.p.noFill();
    this.p.circle(this.centerX, this.centerY, this.colorSize);
    this.p.noStroke();

    if (this.highLight) {
      this.p.stroke(this.stroke);
      this.p.strokeWeight(this.strokeWeight);
      this.p.noFill();
      this.p.circle(this.centerX, this.centerY, this.colorSize);
      this.p.noStroke();
    }
  }
}
