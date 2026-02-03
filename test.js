
function assert(condition, message) {
  if (!condition) {
    console.error("❌ FAIL:", message);
  } else {
    console.log("✅ PASS:", message);
  }
}


function runTests() {
  // Test color palette click detection
  assert(getClickedColorIndex(55, 25, colors, 50, 20, 50, 10) === 0, "clicks first color");
  assert(getClickedColorIndex(115, 25, colors, 50, 20, 50, 10) === 1, "clicks second color");
  assert(getClickedColorIndex(10, 25, colors, 50, 20, 50, 10) === -1, "no color clicked when outside");
  assert(getClickedColorIndex(55, 100, colors, 50, 20, 50, 10) === -1, "no color when Y is outside");
  
  // Test eraser click detection
  assert(isEraserClicked(560, 30, 550, 20, 50) === true, "eraser clicked");
  assert(isEraserClicked(100, 30, 550, 20, 50) === false, "eraser not clicked when far away");
  
  // Test rectangle collision
  assert(isInsideRect(75, 35, 50, 20, 50, 50) === true, "point inside rectangle");
  assert(isInsideRect(10, 10, 50, 20, 50, 50) === false, "point outside rectangle");
}
