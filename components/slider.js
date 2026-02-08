class Slider {
  constructor(p) {
    this.sizeControlX = 570;
    this.sizeControlY = 40;
    this.brushSize = 20;
    this.minBrushSize = 5;
    this.maxBrushSize = 50;
    this.sliderComponent = null;
    this.p = p;
  }

  initializeComponent() {
    this.sliderComponent = this.p.createSlider(
      this.minBrushSize,
      this.maxBrushSize,
      0,
    );
    this.sliderComponent.position(this.sizeControlX, this.sizeControlY);
    this.sliderComponent.size(80);
  }

  render() {
    this.brushSize = this.sliderComponent.value();
    this.p.fill(0);
    this.p.textAlign(this.p.LEFT, this.p.CENTER);
    this.p.textSize(12);
    this.p.noStroke();
    this.p.text(this.brushSize, 660, 50);
  }

  checkSizeClick() {
    this.brushSize = this.sliderComponent.value();
  }
}
