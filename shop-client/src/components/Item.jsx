import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../style";
import { addToCart } from "../state/addCart";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  const cartList = useSelector((state) => state.cart);
  const { itemId } = useParams();

  const isCartHover = cartList.cart.filter(
    (cartItem) => cartItem.id === Number(itemId)
  );
  console.log(isCartHover.length);

  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        sx={{ marginBottom: "20px" }}
      >
        <img
          alt={item.name}
          width="250px"
          height="170px"
          src={url}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {isHovered && isCartHover.length === 0 ? (
              <Button
                onClick={() => {
                  dispatch(addToCart({ item: { ...item, count } }));
                }}
                sx={{ backgroundColor: shades.primary[300], color: "white" }}
              >
                カートに入れる
              </Button>
            ) : (
              <Button
                sx={{ backgroundColor: shades.primary[300], color: "white" }}
              >
                カートに入れる
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box mb="30px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">&yen;&nbsp;&nbsp;{price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
