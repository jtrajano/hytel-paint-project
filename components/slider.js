
class Slider {
    constructor(){ 
        this.sizeControlX = 350;
        this.sizeControlY = 40;
        this.sizeControlWidth = 150;
        this.sizeControlHeight = 20;
        this.brushSize = 20;
        this.minBrushSize = 5;
        this.maxBrushSize = 50;
        this.sliderComponent = null;
    }

    initializeComponent(){
        this.sliderComponent = createSlider(5, 50, 0);
        this.sliderComponent.position(400, 40);
        this.sliderComponent.size(80);
    }
    render(){
        this.brushSize = this.sliderComponent.value();
        fill(0);
        textAlign(LEFT, CENTER);
        textSize(12);
        noStroke();
        text(this.brushSize, 490, 50);
    }

    checkSizeClick(mouseX, mouseY) {
        this.brushSize = this.sliderComponent.value();
    }
}