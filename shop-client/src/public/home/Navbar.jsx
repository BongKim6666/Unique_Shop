import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge, Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { shades } from "../../style";
import { setIsCartOpen } from "../../state/addCart";
import { setIsWishOpen } from "../../state/addWishList";
import SearchBar from "./Search";
import logo from "../../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const wish = useSelector((state) => state.wish.wish);

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[600]}
        >
          <Box
            component="img"
            src={logo}
            width={"80px"}
            height={"50px"}
            alt="logo"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          {/* Search Bar */}
          <SearchBar />

          {/* カート */}
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined sx={{ width: "25px", height: "25px" }} />
            </IconButton>
          </Badge>
          {/*気に入り */}
          <Badge
            badgeContent={wish.length}
            color="secondary"
            invisible={wish.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <FavoriteBorderIcon
              onClick={() => dispatch(setIsWishOpen({}))}
              sx={{
                width: "25px",
                height: "25px",
                margin: "auto 0",
              }}
            />
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
