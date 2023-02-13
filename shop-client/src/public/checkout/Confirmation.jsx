import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Confirmation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success" sx={{ fontSize: "20px" }}>
        <AlertTitle sx={{ fontSize: "20px" }}>成功</AlertTitle>
        順調にに注文出来ました — <strong>ご購入おめでとうございます</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
