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
  try {
    fn();
  } finally {
    __t.suiteStack.pop();
  }
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
      if (actual !== expected)
        throw new Error(`Expected ${expected} but got ${actual}`);
    },
    toEqual(expected) {
      // NOTE: JSON stringify is "good enough" for simple data structures.
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) throw new Error(`Expected ${e} but got ${a}`);
    },
  };
}

function testSummary() {
  console.log(
    `\n🧪 Tests: ${__t.total} | ✅ ${__t.passed} | ❌ ${__t.failed}\n`,
  );
}
