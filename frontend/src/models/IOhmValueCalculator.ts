import { Color } from "./Color";

export class IOhmValueCalculator {
  bandAColor: Color;
  bandBColor: Color;
  bandCColor: Color;
  bandDColor: Color;
  calculateOhmValue() {
    return (
      (this.bandAColor.value * 10 + this.bandBColor.value) *
      Math.pow(10, this.bandCColor.value)
    );
  }

  constructor(
    bandAColor: Color,
    bandBColor: Color,
    bandCColor: Color,
    bandDColor: Color
  ) {
    this.bandAColor = bandAColor;
    this.bandBColor = bandBColor;
    this.bandCColor = bandCColor;
    this.bandDColor = bandDColor;
  }
}
