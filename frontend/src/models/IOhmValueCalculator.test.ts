import { IOhmValueCalculator } from "./IOhmValueCalculator";
import { Color } from "./Color";

describe("IOhmValueCalculator", () => {
  let calculator: IOhmValueCalculator;
  let mockColorA: Color;
  let mockColorB: Color;
  let mockColorC: Color;
  let mockColorD: Color;

  beforeEach(() => {
    mockColorA = { value: 1, hex: "", name: "" };
    mockColorB = { value: 2, hex: "", name: "" };
    mockColorC = { value: 3, hex: "", name: "" };
    mockColorD = { value: 4, hex: "", name: "" };

    calculator = new IOhmValueCalculator(
      mockColorA,
      mockColorB,
      mockColorC,
      mockColorD
    );
  });

  it("should be defined", () => {
    expect(calculator).toBeDefined();
  });

  it("should calculate Ohm value correctly", () => {
    // Mock values for colors
    mockColorA.value = 1;
    mockColorB.value = 2;
    mockColorC.value = 3;
    mockColorD.value = 4;

    // Ohm value calculation should be (1 * 10 + 2) * 10^3 = 12000
    const expectedOhmValue = (1 * 10 + 2) * Math.pow(10, 3);

    const ohmValue = calculator.calculateOhmValue();

    expect(ohmValue).toEqual(expectedOhmValue);
  });
});
