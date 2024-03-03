import { Box, Text } from "grommet";
import React, { useMemo, useState } from "react";
import ColorPicker from "./ColorPicker";
import { Color } from "../../models/Color";
import { IOhmValueCalculator } from "../../models/IOhmValueCalculator";
import { useQuery } from "@tanstack/react-query";
import { findByType } from "../../services/color.service";

const colors: Color[] = [
  { name: "black", value: 0, hex: "#000000" },
  { name: "brown", value: 1, hex: "#95804a" },
  { name: "red", value: 2, hex: "#ca3435" },
  { name: "orange", value: 3, hex: "#ffa010" },
  { name: "yellow", value: 4, hex: "#fef200" },
  { name: "green", value: 5, hex: "#016612" },
  { name: "blue", value: 6, hex: "#16b8f3" },
  { name: "violet", value: 7, hex: "#9f0fef" },
  { name: "grey", value: 8, hex: "#cdd5d5" },
  { name: "white", value: 9, hex: "#FFFFFF" },
];

const Calculator: React.FC = () => {
  const [bandAColor, setBandAColor] = useState<Color | undefined>();
  const [bandBColor, setBandBColor] = useState<Color | undefined>();
  const [bandCColor, setBandCColor] = useState<Color | undefined>();
  const [bandDColor, setBandDColor] = useState<Color | undefined>();

  const result = useMemo(
    () =>
      bandAColor && bandBColor && bandCColor && bandDColor
        ? new IOhmValueCalculator(
            bandAColor,
            bandBColor,
            bandCColor,
            bandDColor
          ).calculateOhmValue()
        : 0,
    [bandAColor, bandBColor, bandCColor, bandDColor]
  );

  const toleranceQuery = useQuery({
    queryKey: ["Color.findByType", "tolerance"],
    queryFn: () => findByType("tolerance"),
    select: (data) =>
      data
        .sort((colorA, colorB) => colorA.value - colorB.value)
        .filter((color) => color.active),
  });

  const multiplierQuery = useQuery({
    queryKey: ["Color.findByType", "multiplier"],
    queryFn: () => findByType("multiplier"),
    select: (data) =>
      data
        .sort((colorA, colorB) => colorA.value - colorB.value)
        .filter((color) => color.active),
  });

  return (
    <Box>
      <Box flex direction="row" justify="center" gap="40px" wrap>
        <ColorPicker
          label="Band A"
          colors={colors}
          chosenColor={bandAColor}
          onChange={setBandAColor}
        />
        <ColorPicker
          label="Band B"
          colors={colors}
          chosenColor={bandBColor}
          onChange={setBandBColor}
        />
        <ColorPicker
          label="Multiplier"
          colors={multiplierQuery.data || colors}
          chosenColor={bandCColor}
          onChange={setBandCColor}
        />
        <ColorPicker
          label="Tolerance"
          colors={toleranceQuery.data || []}
          chosenColor={bandDColor}
          onChange={setBandDColor}
        />
        <div />
      </Box>
      <Box>
        <Text margin="50px" weight="bold" size="40px">
          <span> Result: {result} &#8486;</span>{" "}
          <span style={{ marginLeft: "15px" }}>
            &plusmn;{bandDColor?.value}%
          </span>
        </Text>
      </Box>
    </Box>
  );
};
export default Calculator;
