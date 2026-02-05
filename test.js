
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
      debugger;
      let result = colorPalette.getClickedColorIndex(30, 50, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(0)
    });

    it("clicks second color", () => {
      // Second circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(60, 50,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(1)
    });

    it("clicks third color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(90, 50,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(2)
    });

    it("clicks fourth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(120, 50, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(3)
    });

    it("clicks fourth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(150, 50, colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(4)
    });

    it("clicks fifth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(180, 50,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(5)
    });

    it("clicks sixth color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(210, 50,colorPalette.colors, 20, 20, 20, 10);
      expect(result).toBe(6)
    });

    it("clicks seventh color", () => {
      // Third circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 20 + 30 + 10 = 60
      let result = colorPalette.getClickedColorIndex(240, 50,colorPalette.colors, 20, 20, 20, 10);
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
      let result = colorPalette.isEraserClicked(560, 50, 550, 20, 20);
      expect(result).toBe(true);
    });
    it("eraser not clicked when far away", ()=>{
      let result = colorPalette.isEraserClicked(100, 50, 550, 20, 20);
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
}

