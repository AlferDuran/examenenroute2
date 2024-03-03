import { Select, Box, Text } from "grommet";
import React from "react";
import { pickTextColorBasedOnBgColorAdvanced } from "../../utils";
import { Color } from "../../models/Color";

type ColorPickerProps = {
  colors: Color[];
  chosenColor?: Color;
  onChange: (color: Color) => void;
  label: string;
};

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  return (
    <div data-testid={props.label} style={{paddingBottom:'15px'}}>
      <Text weight="bold">{props.label}</Text>
      <br />
      <Select
        style={{
          backgroundColor: props.chosenColor?.hex,
          color: pickTextColorBasedOnBgColorAdvanced(
            props.chosenColor?.hex || "",
            "white",
            "black"
          ),
        }}
        labelKey="name"
        value={props.chosenColor}
        onChange={(e) => props.onChange(e.option)}
        options={props.colors}
        placeholder="Choose a color"
      >
        {(option: Color) => (
          <Box
            direction="row"
            gap="small"
            align="center"
            pad="medium"
            style={{
              backgroundColor: option.hex,
              color: pickTextColorBasedOnBgColorAdvanced(
                option.hex,
                "white",
                "black"
              ),
            }}
          >
            {option.name}
          </Box>
        )}
      </Select>
    </div>
  );
};

export default ColorPicker;
