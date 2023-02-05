import { Box, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import Link from "@mui/material/Link";

const Contact = () => {
  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <Typography variant="h1" mb={"30px"}>
        Contact Us
      </Typography>
      <Typography lineHeight={2}>
        商品の品質に問題がある場合、またはご不明な点がございましたら、<br></br>
        メールボタンをクリックしてメールを送信してください。
        <br></br>24時間以内に返信いたします.
      </Typography>
      <Link href="mailto:bongkim8090@gmail.com">
        <IconButton>
          <MarkEmailReadOutlinedIcon fontSize="large" />
        </IconButton>
      </Link>
    </Box>
  );
};

export default Contact;
