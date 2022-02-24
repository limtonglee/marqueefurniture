import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
  OutlinedInput,
} from "@mui/material";

export const CustomerListToolbar = ({ filterName, onFilterName }) => {
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Admin User Management
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <OutlinedInput
                value={filterName}
                onChange={onFilterName}
                placeholder="Search users"
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                }
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
