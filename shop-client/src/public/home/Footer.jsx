import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="10px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        rowGap="10px"
      >
        <Box width="250px" margin={"0 auto"}>
          <Typography variant="h2" color={"black"} textAlign={"center"}>
            Unique Shop
          </Typography>
          <Typography color={"black"} textAlign={"center"} marginTop={"20px"}>
            &copy;&nbsp;&nbsp;All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
