import { RectButton } from "../base/button.js";

export class SVGButton extends RectButton {
  constructor(p, { img, enableActive = true, ...rest }) {
    super(p, { enableActive, ...rest });
    this.img = img;
    this.imgInverted = null;
    this.isActive = false;
  }
  click() {
    if (this.enableActive) {
      this.isActive = true;
    }
    super.click();
  }
  render() {
    const hovered = this.isClicked(this.p.mouseX, this.p.mouseY);
    const pressed = hovered && this.p.mouseIsPressed;
    const active = (this.enableActive && this.isActive) || pressed;
    if (hovered || active) {
      this.p.noStroke();
      this.p.fill(active ? "#2f6feb" : "#e5e5e5");
      this.p.rect(
        this.positionX - 5,
        this.positionY - 5,
        this.width + 10,
        this.height + 10,
        6,
      );
    }
    if (active && !this.imgInverted && this.img) {
      this.imgInverted = this.img.get();
      this.imgInverted.filter(this.p.INVERT);
    }
    this.p.image(
      active && this.imgInverted ? this.imgInverted : this.img,
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
}
