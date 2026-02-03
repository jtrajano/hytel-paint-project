function runTests() {
  suite("test click color", () => {
    it("clicks first color", () => {
      let result = getClickedColorIndex(55, 25, colors, 50, 20, 50, 10);
      expect(result).toBe(0)
    });

    it("clicks second color", () => {
      let result = getClickedColorIndex(115, 25, colors, 50, 20, 50, 10);
      expect(result).toBe(1)
    });

    it("no color clicked when outside", () => {
      let result = getClickedColorIndex(10, 25, colors, 50, 20, 50, 10);
      expect(result).toBe(-1)
    });
    
    it("no color when Y is outside", () => {
      let result = getClickedColorIndex(55, 100, colors, 50, 20, 50, 10);
      expect(result).toBe(-1)
    });
  });

  suite("test eraser click",()=>{
    it("eraser clicked", ()=>{
      let result = isEraserClicked(560, 30, 550, 20, 50);
      expect(result).toBe(true);
    });
    it("eraser not clicked when far away", ()=>{
      let result = isEraserClicked(100, 30, 550, 20, 50);
      expect(result).toBe(false);
    })
  })

  suite("test brush size slider", () => {
    it("slider click is detected", () => {
      let result = isSizeControlClicked(sizeControlX + 10, sizeControlY + 5, sizeControlX, sizeControlY, sizeControlWidth, sizeControlHeight);
      expect(result).toBe(true)
    });

    it("slider click outside is not detected", () => {
      let result = isSizeControlClicked(sizeControlX - 5, sizeControlY + 5, sizeControlX, sizeControlY, sizeControlWidth, sizeControlHeight);
      expect(result).toBe(false)
    });

    it("brush size changes when clicking slider", () => {
     
      const originalSize = brushSize;
      debugger;
      checkSizeClick(sizeControlX + sizeControlWidth, sizeControlY + 1);
      expect(brushSize).toBe(maxBrushSize);
      brushSize = originalSize;
    });

    it("brush size does not change when clicking outside slider", () => {
      const originalSize = brushSize;
      checkSizeClick(sizeControlX + sizeControlWidth + 50, sizeControlY + 1);
      expect(brushSize).toBe(originalSize);
    });
  });
}


// Test framework

function assert(condition, message) {
  if (!condition) {
    console.error("❌ FAIL:", message);
  } else {
    console.log("✅ PASS:", message);
  }
}

let __t = {
  suiteStack: [],
  total: 0,
  passed: 0,
  failed: 0,
};

function suite(name, fn) {
  __t.suiteStack.push(name);
  try { fn(); } finally { __t.suiteStack.pop(); }
}

function it(name, fn) {
  const suite = __t.suiteStack.join(" > ");
  const fullName = suite ? `${suite} > ${name}` : name;
  __t.total++;

  try {
    fn();
    __t.passed++;
    console.log(`✅ ${fullName}`);
  } catch (err) {
    __t.failed++;
    console.error(`❌ ${fullName}\n   ${err.message}`);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) throw new Error(`Expected ${expected} but got ${actual}`);
    },
    toEqual(expected) {
      // NOTE: JSON stringify is "good enough" for simple data structures.
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) throw new Error(`Expected ${e} but got ${a}`);
    }
  };
}

function testSummary() {
  console.log(`\n🧪 Tests: ${__t.total} | ✅ ${__t.passed} | ❌ ${__t.failed}\n`);
}
