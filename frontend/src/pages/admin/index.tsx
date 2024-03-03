import React from "react";
import ColorCrud from "./CRUD";
import { Box } from "grommet";

const Admin: React.FC = () => {
  return (
    <Box flex direction="row" justify="center" gap="50px" wrap>
      <ColorCrud type="multiplier" />
      <ColorCrud type="tolerance" />
      <div />
    </Box>
  );
};
export default Admin;
