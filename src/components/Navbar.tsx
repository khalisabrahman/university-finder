import { Box, Stack, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
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
        <SchoolIcon sx={{ mr: "10px" }} />{" "}
        <Typography color="#FFF">UniversityFinder</Typography>
      </Box>
      <Box display="flex" sx={{ gap: "10px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography>Home</Typography>
        </Link>
        <Link to="/favorites" style={{ textDecoration: "none", color: "#fff" }}>
          <Typography>Favorites</Typography>
        </Link>
      </Box>
    </Stack>
  );
};

export default Navbar;
