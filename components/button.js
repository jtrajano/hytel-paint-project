class Button {
    constructor(color, colorSize, highLight, stroke, strokeWeight)
    {
        this.color = color;
        this.colorSize = colorSize;
        this.highLight = highLight;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
    }
}

class CircleButton extends Button{
    constructor(color,colorSize, centerX, centerY, highLight = false, stroke= 0, strokeWeight= 3 ){
        super(color, colorSize, highLight, stroke, strokeWeight);
        this.colorSize = colorSize;
        this.highLight = highLight;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    render(){
        fill(this.color);
        circle(this.centerX, this.centerY, this.colorSize);

        // put borders
         stroke(0);
            strokeWeight(1);
            noFill();
            circle(this.centerX, this.centerY, this.colorSize);
            noStroke();

        if(this.highLight){
            stroke(this.stroke);
            strokeWeight(this.strokeWeight);
            noFill();
            circle(this.centerX, this.centerY, this.colorSize);
            noStroke();
        }
    }

}