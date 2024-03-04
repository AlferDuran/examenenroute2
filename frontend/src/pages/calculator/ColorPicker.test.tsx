import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import ColorPicker from "./ColorPicker";
import { Color } from "../../models/Color";
import { screen } from "@testing-library/react";

describe("ColorPicker", () => {
  const colors: Color[] = [
    { id: 1, name: "Red", hex: "#FF0000", value: 0 },
    { id: 2, name: "Green", hex: "#00FF00", value: 1 },
    { id: 3, name: "Blue", hex: "#0000FF", value: 2 },
  ];

  const onChange = jest.fn();

  it("renders ColorPicker component with label and colors", () => {
    render(
      <ColorPicker colors={colors} onChange={onChange} label="Select a color" />
    );

    const labelElement = screen.getByText("Select a color");
    const selectElement = screen.getByPlaceholderText("Choose a color");

    expect(labelElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
  });

  it("calls onChange handler when a color is selected", async () => {
    render(
      <ColorPicker colors={colors} onChange={onChange} label="Select a color" />
    );

    await fireEvent.click(screen.getByPlaceholderText("Choose a color"));
    const listBox = within(screen.getByRole("listbox"));
    await fireEvent.click(listBox.getByText(/Green/));

    expect(onChange).toHaveBeenCalledWith({
      id: 2,
      name: "Green",
      hex: "#00FF00",
      value: 1,
    });
  });
});
