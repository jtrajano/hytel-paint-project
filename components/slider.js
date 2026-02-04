
class Slider {
    constructor(){ 
        this.sizeControlX = 350;
        this.sizeControlY = 20;
        this.sizeControlWidth = 150;
        this.sizeControlHeight = 20;
        this.brushSize = 20;
        this.minBrushSize = 5;
        this.maxBrushSize = 50;
        
    }
    render(){
        fill(200);
        stroke(0);
        strokeWeight(1);
        rect(this.sizeControlX, this.sizeControlY, this.sizeControlWidth, this.sizeControlHeight);
        
        // Calculate thumb position based on current brush size
        const thumbPosition = map(this.brushSize, this.minBrushSize, this.maxBrushSize, this.sizeControlX, this.sizeControlX + this.sizeControlWidth);
        
        // Draw thumb indicator
        fill(100);
        noStroke();
        rect(thumbPosition - 5, this.sizeControlY - 5, 10, this.sizeControlHeight + 10);
        
        // Draw size label
        fill(0);
        textAlign(LEFT, CENTER);
        textSize(12);
        text(this.brushSize, this.sizeControlX + this.sizeControlWidth + 10, this.sizeControlY + this.sizeControlHeight / 2);
    }

    checkSizeClick(mouseX, mouseY) {
        this.brushSize = this.calculateBrushSize(mouseX, mouseY);
    }

    calculateBrushSize(mouseX, mouseY) {
        if (!this.isSizeControlClicked(mouseX, mouseY, this.sizeControlX, this.sizeControlY, this.sizeControlWidth, this.sizeControlHeight)) {
            return this.brushSize; // No change if not clicking on control
        }
        const relativeX = mouseX - this.sizeControlX;
        const ratio = constrain(relativeX / this.sizeControlWidth, 0, 1);
        return round(map(ratio, 0, 1, this.minBrushSize, this.maxBrushSize));
    }

    // Pure function: checks if size control was clicked
     isSizeControlClicked(mouseX, mouseY) {
        return mouseY >= this.sizeControlY && 
        mouseY <= this.sizeControlY + this.sizeControlHeight &&
        mouseX >= this.sizeControlX && 
        mouseX <= this.sizeControlX + this.sizeControlWidth;
    }
}