import React from "react";
import { render } from "@testing-library/react";
import ColorCrud from "./ColorCrud";
import { screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("ColorCrud", () => {
  jest.mock("../../services/color.service", () => ({
    create: jest.fn(),
    findByType: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
  }));
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders ColorCrud component with expected data", async () => {
    const mockColors = [
      { id: 1, name: "Red", hex: "#FF0000", value: 1, active: true },
      { id: 2, name: "Green", hex: "#00FF00", value: 2, active: true },
      { id: 3, name: "Blue", hex: "#0000FF", value: 3, active: true },
    ];

    const client = new QueryClient();
    client.setQueryData(["Color.findByType", "multiplier"], mockColors);
    render(
      <QueryClientProvider client={client}>
        <ColorCrud type="multiplier" />
      </QueryClientProvider>
    );

    // Check if the header text is rendered correctly
    const headerText = await screen.findByText("Multiplier");
    expect(headerText).toBeInTheDocument();

    // Check if the create button is rendered
    const createButton = await screen.findByText("Create");
    expect(createButton).toBeInTheDocument();

    // Check if the color data is rendered in the DataTable
    mockColors.forEach((color) => {
      expect(screen.getByText(color.name)).toBeInTheDocument();
      expect(screen.getByText(color.hex)).toBeInTheDocument();
      expect(screen.getByText(color.value.toString())).toBeInTheDocument();
    });
  });
});
