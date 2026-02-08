const TEST_MODE = false;

function initializeTest(p) {
  p.noCanvas();
  runTests(p);
  testSummary();
  p.noLoop();
}

function runTests(p) {
  suite("test click color", () => {
    const colorPalette = new ColorPalette(p);
    it("clicks first color", () => {
      // First circle center: paletteX + 0*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        0 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(0);
    });

    it("clicks second color", () => {
      // Second circle center: paletteX + 1*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        1 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(1);
    });

    it("clicks third color", () => {
      // Third circle center: paletteX + 2*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        2 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(2);
    });

    it("clicks fourth color", () => {
      // Fourth circle center: paletteX + 3*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        3 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(3);
    });

    it("clicks fourth color", () => {
      // Fifth circle center: paletteX + 4*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        4 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(4);
    });

    it("clicks fifth color", () => {
      // Sixth circle center: paletteX + 5*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        5 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(5);
    });

    it("clicks sixth color", () => {
      // Seventh circle center: paletteX + 6*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        6 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(6);
    });

    it("clicks seventh color", () => {
      // Eighth circle center: paletteX + 7*(colorSize+spacing) + colorSize/2
      const centerX =
        colorPalette.paletteX +
        7 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 50);
      expect(result).toBe(7);
    });

    it("no color clicked when outside", () => {
      // Far outside all circles
      let result = colorPalette.getClickedColorIndex(5, 5);
      expect(result).toBe(-1);
    });

    it("no color when Y is outside", () => {
      // Same X as first color but Y far away
      const centerX =
        colorPalette.paletteX +
        0 * (colorPalette.colorSize + colorPalette.spacing) +
        colorPalette.colorSize / 2;
      let result = colorPalette.getClickedColorIndex(centerX, 100);
      expect(result).toBe(-1);
    });
  });

  suite("test eraser click", () => {
    const colorPalette = new ColorPalette(p);
    it("eraser clicked", () => {
      // Eraser circle center: eraserX + colorSize/2
      const eraserCenterX = colorPalette.eraserX + colorPalette.colorSize / 2;
      let result = colorPalette.isEraserClicked(eraserCenterX, 50);
      expect(result).toBe(true);
    });
    it("eraser not clicked when far away", () => {
      let result = colorPalette.isEraserClicked(100, 50);
      expect(result).toBe(false);
    });
  });

  suite("test clear button click", () => {
    const clearButton = new SVGButton(p, {
      img: null,
      width: 23,
      height: 23,
      positionX: 880,
      positionY: 40,
      enableActive: false,
    });

    it("clear button clicked when inside bounds", () => {
      // Click in the center of the button
      let result = clearButton.isClicked(892, 51);
      expect(result).toBe(true);
    });

    it("clear button clicked at left edge", () => {
      // Click at left edge: positionX = 880
      let result = clearButton.isClicked(880, 50);
      expect(result).toBe(true);
    });

    it("clear button clicked at right edge", () => {
      // Click at right edge: positionX + width = 880 + 23 = 903
      let result = clearButton.isClicked(903, 50);
      expect(result).toBe(true);
    });

    it("clear button not clicked when outside left", () => {
      // Click left of button
      let result = clearButton.isClicked(870, 50);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside right", () => {
      // Click right of button
      let result = clearButton.isClicked(913, 50);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside top", () => {
      // Click above button
      let result = clearButton.isClicked(892, 30);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside bottom", () => {
      // Click below button
      let result = clearButton.isClicked(892, 70);
      expect(result).toBe(false);
    });
  });
}
