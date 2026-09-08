interface TextLayout {
  width: number;
  height: number;
}

interface MeasuredText<T> extends TextLayout {
  value: T;
}

interface FitTextToAreaOptions<T> {
  maxFontSize: number;
  maxWidth: number;
  maxHeight: number;
  measure: (fontSize: number) => Promise<MeasuredText<T>>;
}

export async function fitTextToArea<T>({
  maxFontSize,
  maxWidth,
  maxHeight,
  measure,
}: FitTextToAreaOptions<T>): Promise<MeasuredText<T> & { fontSize: number }> {
  let fontSize = maxFontSize;

  while (true) {
    const measured = await measure(fontSize);

    if (
      (measured.width <= maxWidth && measured.height <= maxHeight) ||
      fontSize === 1
    ) {
      return { ...measured, fontSize };
    }

    const scale = Math.min(
      maxWidth / measured.width,
      maxHeight / measured.height
    );
    fontSize = Math.max(
      1,
      Math.min(fontSize - 1, Math.floor(fontSize * scale))
    );
  }
}
