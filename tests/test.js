import { ToolBar } from "../components/toolbar.js";
import { SVGButton } from "../components/SVGButton.js";
import { Sketch } from "../sketch.js";

export const TEST_MODE = false;

export function initializeTest(p) {
  p.noCanvas();
  runTests(p);
  testSummary();
  p.noLoop();
}

function runTests(p) {
  suite("test click color", () => {
    const toolbar = new ToolBar(p);
    it("clicks first color", () => {
      // First circle center: paletteX + 0*(colorSize+spacing) + colorSize/2
      const centerX =
        toolbar.paletteX +
        0 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(0);
    });

    it("clicks second color", () => {
      // Second circle center: paletteX + 1*(colorSize+spacing) + colorSize/2
      const centerX =
        toolbar.paletteX +
        1 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(1);
    });

    it("clicks third color", () => {
      // Third circle center: paletteX + 2*(colorSize+spacing) + colorSize/2
      const centerX =
        toolbar.paletteX +
        2 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(2);
    });

    it("clicks fourth color", () => {
      // Fourth circle center: paletteX + 3*(colorSize+spacing) + colorSize/2
      const centerX =
        toolbar.paletteX +
        3 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(3);
    });

    it("clicks fourth color", () => {
      // Fifth circle center: paletteX + 4*(colorSize+spacing) + colorSize/2
      const centerX =
        toolbar.paletteX +
        4 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(4);
    });

    it("clicks fifth color", () => {
      // Sixth circle center: paletteX + 5*(colorSize+spacing) + colorSize/2
      const centerX =
        toolbar.paletteX +
        5 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(5);
    });

    it("clicks sixth color", () => {
      // Seventh circle center: paletteX + 6*(colorSize+spacing) + colorSize/2
      const centerX =
        toolbar.paletteX +
        6 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(6);
    });

    it("clicks seventh color", () => {
      // Eighth circle center: paletteX + 7*(colorSize+spacing) + colorSize/2
      const centerX =
          toolbar.paletteX +
        7 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 50);
      expect(result).toBe(7);
    });

    it("no color clicked when outside", () => {
      // Far outside all circles
      let result = toolbar.getClickedColorIndex(5, 5);
      expect(result).toBe(-1);
    });

    it("no color when Y is outside", () => {
      // Same X as first color but Y far away
      const centerX =
        toolbar.paletteX +
        0 * (toolbar.colorSize + toolbar.spacing) +
        toolbar.colorSize / 2;
      let result = toolbar.getClickedColorIndex(centerX, 100);
      expect(result).toBe(-1);
    });
  });

  suite("test eraser click", () => {
    const toolbar = new ToolBar(p);
    it("eraser clicked", () => {
      // Eraser circle center: eraserX + colorSize/2
      const eraserCenterX = toolbar.eraserX + toolbar.colorSize / 2;
      let result = toolbar.isEraserClicked(eraserCenterX, 50);
      expect(result).toBe(true);
    });
    it("eraser not clicked when far away", () => {
      let result = toolbar.isEraserClicked(100, 50);
      expect(result).toBe(false);
    });
  });

  suite("test clear button click", () => {
    const toolbar = new ToolBar(p);
    const paletteWidth =
      toolbar.colors.length * toolbar.colorSize +
      (toolbar.colors.length - 1) * toolbar.spacing;
    const controlGap = 30;
    const gapBetweenPalette = 30;
    const gapBetweenSlider = 30;
    const iconWidth = 23;
    const controlsWidth = controlGap * 4 + iconWidth;
    const toolbarPadding = 20;
    const sliderWidth = 80;
    const sliderLabelGap = 20;
    const sliderBlockWidth = sliderWidth + sliderLabelGap;
    const toolbarWidth =
      paletteWidth +
      gapBetweenPalette +
      sliderBlockWidth +
      gapBetweenSlider +
      controlsWidth +
      toolbarPadding * 2;
    const toolbarX = (1260 - toolbarWidth) / 2;
    const paletteX = toolbarX + toolbarPadding;
    const sliderX = paletteX + paletteWidth + gapBetweenPalette;
    const eraserX = sliderX + sliderBlockWidth + gapBetweenSlider;
    const clearX = eraserX + controlGap * 4;
    const clearButton = new SVGButton(p, {
      img: null,
      width: 23,
      height: 23,
      positionX: clearX,
      positionY: 40,
      enableActive: false,
    });

    it("clear button clicked when inside bounds", () => {
      // Click in the center of the button
      let result = clearButton.isClicked(clearX + 12, 51);
      expect(result).toBe(true);
    });

    it("clear button clicked at left edge", () => {
      // Click at left edge
      let result = clearButton.isClicked(clearX, 50);
      expect(result).toBe(true);
    });

    it("clear button clicked at right edge", () => {
      // Click at right edge: positionX + width
      let result = clearButton.isClicked(clearX + 23, 50);
      expect(result).toBe(true);
    });

    it("clear button not clicked when outside left", () => {
      // Click left of button
      let result = clearButton.isClicked(clearX - 10, 50);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside right", () => {
      // Click right of button
      let result = clearButton.isClicked(clearX + 33, 50);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside top", () => {
      // Click above button
      let result = clearButton.isClicked(clearX + 12, 30);
      expect(result).toBe(false);
    });

    it("clear button not clicked when outside bottom", () => {
      // Click below button
      let result = clearButton.isClicked(clearX + 12, 70);
      expect(result).toBe(false);
    });
  });

  suite("test undo redo download", () => {
    it("undo moves last stroke to redo", () => {
      const sketch = new Sketch(p);
      sketch.drawingLayer = p.createGraphics(sketch.canvasW, sketch.canvasH);
      sketch.strokes = [
        {
          color: "#000",
          size: 2,
          points: [
            { x: sketch.canvasX + 1, y: sketch.canvasY + 1 },
            { x: sketch.canvasX + 2, y: sketch.canvasY + 2 },
          ],
        },
      ];
      sketch.redoStrokes = [];
      sketch.undo();
      expect(sketch.strokes.length).toBe(0);
      expect(sketch.redoStrokes.length).toBe(1);
    });

    it("redo restores last undone stroke", () => {
      const sketch = new Sketch(p);
      sketch.drawingLayer = p.createGraphics(sketch.canvasW, sketch.canvasH);
      const stroke = {
        color: "#000",
        size: 2,
        points: [
          { x: sketch.canvasX + 1, y: sketch.canvasY + 1 },
          { x: sketch.canvasX + 2, y: sketch.canvasY + 2 },
        ],
      };
      sketch.strokes = [];
      sketch.redoStrokes = [stroke];
      sketch.redo();
      expect(sketch.strokes.length).toBe(1);
      expect(sketch.redoStrokes.length).toBe(0);
    });

    it("download triggers save with filename", () => {
      const sketch = new Sketch(p);
      sketch.drawingLayer = p.createGraphics(sketch.canvasW, sketch.canvasH);
      const originalSave = p.save;
      let savedName = "";
      p.save = (img, name) => {
        savedName = name;
      };
      sketch.downloadDrawing();
      p.save = originalSave;
      expect(savedName.startsWith("drawing-")).toBe(true);
      expect(savedName.endsWith(".png")).toBe(true);
    });
  });
}
