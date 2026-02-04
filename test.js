
const TEST_MODE = false;

function initializeTest(){
  noCanvas();
  runTests();
  testSummary();
  noLoop();
}

function runTests() {
  suite("test click color", () => {
    const colorPalette = new ColorPalette();
    it("clicks first color", () => {
      // First circle center: paletteX + 0*(colorSize+spacing) + colorSize/2 = 20 + 10 = 30
      let result = colorPalette.getClickedColorIndex(30, 30, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(0)
    });

    it("clicks second color", () => {
      // Second circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(60, 30,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(1)
    });

    it("clicks third color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(90, 30,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(2)
    });

    it("clicks fourth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(120, 30, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(3)
    });

    it("clicks fourth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(150, 30, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(4)
    });

    it("clicks fifth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(180, 30,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(5)
    });

    it("clicks sixth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(210, 30,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(6)
    });

    it("clicks seventh color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(240, 30,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(7)
    });

    it("no color clicked when outside", () => {
      // Far outside all circles
      let result = colorPalette.getClickedColorIndex(5, 5, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(-1)
    });
    
    it("no color when Y is outside", () => {
      // Same X as first color but Y far away
      let result = colorPalette.getClickedColorIndex(30, 100, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(-1)
    });
  });

  suite("test eraser click",()=>{
    const colorPalette = new ColorPalette();
    it("eraser clicked", ()=>{
      // Eraser circle center: eraserX + colorSize/2 = 550 + 10 = 560
      let result = colorPalette.isEraserClicked(560, 30, 550, 20, 20);
      expect(result).toBe(true);
    });
    it("eraser not clicked when far away", ()=>{
      let result = colorPalette.isEraserClicked(100, 30, 550, 20, 20);
      expect(result).toBe(false);
    })
  })

  suite("test brush size slider", () => {
    const slider = new Slider();
    const originalSize = slider.brushSize;
    it("slider click is detected", () => {
      let result = slider.isSizeControlClicked(slider.sizeControlX + 10, 
        slider.sizeControlY + 5);
      expect(result).toBe(true)
    });

    it("slider click outside is not detected", () => {
      let result = slider.isSizeControlClicked(slider.sizeControlX - 5, slider.sizeControlY + 5);
      expect(result).toBe(false)
    });

    it("brush size changes when clicking slider", () => {
      slider.checkSizeClick(slider.sizeControlX + slider.sizeControlWidth,slider.sizeControlY + 1);
      expect(slider.brushSize).toBe(slider.maxBrushSize);
      slider.brushSize = originalSize;
    });

    it("brush size does not change when clicking outside slider", () => {
      slider.checkSizeClick(slider.sizeControlX + slider.sizeControlWidth + 50,slider.sizeControlY + 1);
      expect(slider.brushSize).toBe(originalSize);
    });
  });

  
  suite("test calculateBrushSize", () => {
    const slider = new Slider();
    it("returns max brush size when clicking at right edge", () => {
      let result = slider.calculateBrushSize(350 + 150, 25, 350, 20, 150, 20, 5, 50, 20);
      expect(result).toBe(50);
    });

    it("returns min brush size when clicking at left edge", () => {
      let result = slider.calculateBrushSize(350, 25, 350, 20, 150, 20, 5, 50, 20);
      expect(result).toBe(5);
    });

    it("returns mid brush size when clicking at center", () => {
      let result = slider.calculateBrushSize(350 + 75, 25, 350, 20, 150, 20, 5, 50, 20);
      // Mid point between 5 and 50 is approximately 28
      expect(result).toBe(28);
    });

    it("returns current size when clicking outside control", () => {
      let result = slider.calculateBrushSize(100, 25, 350, 20, 150, 20, 5, 50, 20);
      expect(result).toBe(20);
    });

    it("returns current size when clicking below control", () => {
      let result = slider.calculateBrushSize(400, 50, 350, 20, 150, 20, 5, 50, 20);
      expect(result).toBe(20);
    });

    it("returns current size when clicking above control", () => {
      let result = slider.calculateBrushSize(400, 10, 350, 20, 150, 20, 5, 50, 20);
      expect(result).toBe(20);
    });

    it("constrains to max when clicking beyond right edge", () => {
      let result = slider.calculateBrushSize(500, 25, 350, 20, 150, 20, 5, 50, 20);
      console.log(result);
      expect(result).toBe(50);
    });

    it("constrains to min when clicking before left edge but within Y bounds", () => {
      // This tests the constrain function
      let result = slider.calculateBrushSize(340, 25, 350, 20, 150, 20, 5, 50, 20);
      expect(result).toBe(20); // Outside bounds, so returns current
    });

    it("calculates quarter position correctly", () => {
      // 25% of the way: 350 + (150 * 0.25) = 387.5
      let result = slider.calculateBrushSize(388, 25, 350, 20, 150, 20, 5, 50, 20);
      // 25% between 5 and 50 = 5 + (45 * 0.25) = 16.25, rounded = 16
      expect(result).toBe(16);
    });

    it("calculates three-quarter position correctly", () => {
      // 75% of the way: 350 + (150 * 0.75) = 462.5
      let result = slider.calculateBrushSize(463, 25, 350, 20, 150, 20, 5, 50, 20);
      // 75% between 5 and 50 = 5 + (45 * 0.75) = 38.75, rounded = 39
      expect(result).toBe(39);
    });
  });
}

