const pigLatin = require('../js/z2c-speech.js');

test('converts text to Pig Latin', () => {
  expect(pigLatin("Spoken output goes here")).toBe("oken-Spay output-ay oes-gay ere-hay");
});

test('removes the last character if it is a space', () => {
  expect(pigLatin("Spoken output goes here ")).toBe("oken-Spay output-ay oes-gay ere-hay");
});

