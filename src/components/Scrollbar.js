import { Box } from "@mui/material";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {

  return (
    <Box sx={{ overflowX: "auto", ...sx }} {...other}>
      {children}
    </Box>
  );
}
