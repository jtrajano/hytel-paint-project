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
      // First circle center: paletteX + 0*(colorSize+spacing) + colorSize/2 = 358 + 10 = 368
      let result = colorPalette.getClickedColorIndex(
        368,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(0);
    });

    it("clicks second color", () => {
      // Second circle center: paletteX + 1*(colorSize+spacing) + colorSize/2 = 358 + 30 + 10 = 398
      let result = colorPalette.getClickedColorIndex(
        398,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(1);
    });

    it("clicks third color", () => {
      // Third circle center: paletteX + 2*(colorSize+spacing) + colorSize/2 = 358 + 60 + 10 = 428
      let result = colorPalette.getClickedColorIndex(
        428,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(2);
    });

    it("clicks fourth color", () => {
      // Fourth circle center: paletteX + 3*(colorSize+spacing) + colorSize/2 = 358 + 90 + 10 = 458
      let result = colorPalette.getClickedColorIndex(
        458,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(3);
    });

    it("clicks fourth color", () => {
      // Fifth circle center: paletteX + 4*(colorSize+spacing) + colorSize/2 = 358 + 120 + 10 = 488
      let result = colorPalette.getClickedColorIndex(
        488,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(4);
    });

    it("clicks fifth color", () => {
      // Sixth circle center: paletteX + 5*(colorSize+spacing) + colorSize/2 = 358 + 150 + 10 = 518
      let result = colorPalette.getClickedColorIndex(
        518,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(5);
    });

    it("clicks sixth color", () => {
      // Seventh circle center: paletteX + 6*(colorSize+spacing) + colorSize/2 = 358 + 180 + 10 = 548
      let result = colorPalette.getClickedColorIndex(
        548,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(6);
    });

    it("clicks seventh color", () => {
      // Eighth circle center: paletteX + 7*(colorSize+spacing) + colorSize/2 = 358 + 210 + 10 = 578
      let result = colorPalette.getClickedColorIndex(
        578,
        50,
        colorPalette.colors,
        358,
        20,
        20,
        10,
      );
      expect(result).toBe(7);
    });

    it("no color clicked when outside", () => {
      // Far outside all circles
      let result = colorPalette.getClickedColorIndex(
        5,
        5,
        colorPalette.colors,
        20,
        20,
        20,
        10,
      );
      expect(result).toBe(-1);
    });

    it("no color when Y is outside", () => {
      // Same X as first color but Y far away
      let result = colorPalette.getClickedColorIndex(
        30,
        100,
        colorPalette.colors,
        20,
        20,
        20,
        10,
      );
      expect(result).toBe(-1);
    });
  });

  suite("test eraser click", () => {
    const colorPalette = new ColorPalette(p);
    it("eraser clicked", () => {
      // Eraser circle center: eraserX + colorSize/2 = 888 + 10 = 898
      let result = colorPalette.isEraserClicked(898, 50, 888, 20, 20);
      expect(result).toBe(true);
    });
    it("eraser not clicked when far away", () => {
      let result = colorPalette.isEraserClicked(100, 50, 888, 20, 20);
      expect(result).toBe(false);
    });
  });

  suite("test clear button click", () => {
    const clearButton = new RectButton(p, {
      positionX: 638,
      positionY: 35,
      width: 70,
      height: 30,
      label: "Clear",
      color: "#f2f2f2",
      stroke: 0,
      strokeWeight: 1,
    });

    it("clear button clicked when inside bounds", () => {
      // Click in the center of the button
      let result = clearButton.isClicked(663, 50);
      expect(result).toBe(true);
    });

    it("clear button clicked at left edge", () => {
      // Click at left edge: positionX = 638
      let result = clearButton.isClicked(638, 50);
      expect(result).toBe(true);
    });

    it("clear button clicked at right edge", () => {
      // Click at right edge: positionX + width = 638 + 70 = 708
      let result = clearButton.isClicked(708, 50);
      expect(result).toBe(true);
    });

    it("clear button not clicked when outside left", () => {
      // Click left of button
      let result = clearButton.isClicked(628, 50);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside right", () => {
      // Click right of button
      let result = clearButton.isClicked(718, 50);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside top", () => {
      // Click above button
      let result = clearButton.isClicked(325, 30);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside bottom", () => {
      // Click below button
      let result = clearButton.isClicked(325, 70);
      expect(result).toBe(false);
    });
  });
}
