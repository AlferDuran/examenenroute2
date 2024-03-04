import React from "react";
import ColorCrud from "./ColorCrud";
import { Box } from "grommet";

const Admin: React.FC = () => {
  return (
    <Box flex direction="row" justify="center" gap="50px" wrap data-testid='crud-page'>
      <ColorCrud type="multiplier" />
      <ColorCrud type="tolerance" />
      <div />
    </Box>
  );
};
export default Admin;
