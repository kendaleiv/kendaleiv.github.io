import assert from "node:assert/strict";
import test from "node:test";
import { fitTextToArea } from "./fitTextToArea.ts";

const MAX_WIDTH = 950;
const MAX_HEIGHT = 380;

function wrappedLayout(title, fontSize) {
  const characterWidth = fontSize * 0.6;
  const charactersPerLine = Math.max(1, Math.floor(MAX_WIDTH / characterWidth));
  const lineCount = Math.ceil(title.length / charactersPerLine);

  return {
    value: title,
    width: Math.min(title.length, charactersPerLine) * characterWidth,
    height: lineCount * fontSize * 1.2,
  };
}

async function fitTitle(title) {
  return fitTextToArea({
    maxFontSize: 72,
    maxWidth: MAX_WIDTH,
    maxHeight: MAX_HEIGHT,
    measure: async fontSize => wrappedLayout(title, fontSize),
  });
}

test("keeps short titles at the existing font size", async () => {
  const result = await fitTitle("A short blog post title");

  assert.equal(result.fontSize, 72);
});

test("reduces long titles until their wrapped layout fits", async () => {
  const result = await fitTitle(
    "A long blog post title with enough words to wrap across several lines in the social image"
  );

  assert.ok(result.fontSize < 72);
  assert.ok(result.height <= MAX_HEIGHT);
});

test("fits long unbroken titles", async () => {
  const result = await fitTitle("unbroken".repeat(80));

  assert.ok(result.fontSize < 72);
  assert.ok(result.width <= MAX_WIDTH);
  assert.ok(result.height <= MAX_HEIGHT);
});

test("fits exceptionally long titles", async () => {
  const result = await fitTitle("exceptionally long title ".repeat(200));

  assert.ok(result.fontSize < 24);
  assert.ok(result.width <= MAX_WIDTH);
  assert.ok(result.height <= MAX_HEIGHT);
});
