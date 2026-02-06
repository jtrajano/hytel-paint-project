class Slider {
  constructor(p) {
    this.sizeControlX = 688;
    this.sizeControlY = 40;
    this.sizeControlWidth = 150;
    this.sizeControlHeight = 20;
    this.brushSize = 20;
    this.minBrushSize = 5;
    this.maxBrushSize = 50;
    this.sliderComponent = null;
    this.p = p;
  }

  initializeComponent() {
    this.sliderComponent = this.p.createSlider(5, 50, 0);
    this.sliderComponent.position(738, 40);
    this.sliderComponent.size(80);
  }

  render() {
    this.brushSize = this.sliderComponent.value();
    this.p.fill(0);
    this.p.textAlign(this.p.LEFT, this.p.CENTER);
    this.p.textSize(12);
    this.p.noStroke();
    this.p.text(this.brushSize, 828, 50);
  }

  checkSizeClick() {
    this.brushSize = this.sliderComponent.value();
  }
}
