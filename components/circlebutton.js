import { Button } from "../base/button.js";

export class CircleButton extends Button {
  constructor(p, { centerX, centerY, ...rest }) {
    super(p, rest);
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
