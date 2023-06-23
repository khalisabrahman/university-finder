import { Box, Stack, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#DC3545",
        top: 0,
        justifyContent: "space-between",
        zIndex: 100,
      }}
    >
      <Box display="flex">
        <SchoolIcon sx={{ mr: "10px" }} /> University Finder
      </Box>
      <Box display="flex" sx={{ gap: "10px" }}>
        <Link to="/">
          <Typography>Home</Typography>
        </Link>
        <Link to="/favorites">
          <Typography>Favorites</Typography>
        </Link>
      </Box>
    </Stack>
  );
};

export default Navbar;
