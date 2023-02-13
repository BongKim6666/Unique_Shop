import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToWish, removeFromWish } from "../state/addWishList";
import Item from "./Item";
import { shades } from "../style";
import { addToCart } from "../state/addCart";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wish);
  const { itemId } = useParams();
  const [value, setValue] = useState("shortDescription");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  // console.log(wishList);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isCart = cartList.cart.filter(
    (cartItem) => cartItem.id === Number(itemId)
  );

  const isWish = wishList.wish.filter(
    (wishItem) => wishItem.id === Number(itemId)
  );

  async function getItem() {
    const item = await fetch(
      `https://unique-shop-server.herokuapp.com/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getItems() {
    const items = await fetch(
      `https://unique-shop-server.herokuapp.com/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={
              item?.attributes?.image?.data?.attributes?.formats?.medium?.url
            }
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>商品</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>￥{item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {isCart.length === 0 ? (
              <Button
                sx={{
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
              >
                カートに入れる
              </Button>
            ) : (
              <Button
                sx={{
                  backgroundColor: "#222222",
                  color: "white",
                  borderRadius: 0,
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
              >
                カートに入れる
              </Button>
            )}
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex" alignItems="center">
              {isWish.length === 0 ? (
                <Button
                  onClick={() =>
                    dispatch(addToWish({ item: { ...item, count } }))
                  }
                >
                  <FavoriteBorderOutlinedIcon />
                </Button>
              ) : (
                <Button
                  onClick={() => dispatch(removeFromWish({ item: item.id }))}
                >
                  <FavoriteIcon sx={{ color: "red" }} />
                </Button>
              )}

              <Typography sx={{ ml: "5px" }}>気に入りに追加</Typography>
            </Box>
            <Typography>カテゴリー: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="概要" value="shortDescription" />
          <Tab label="説明" value="longDescription" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "shortDescription" && (
          <div>{item?.attributes?.shortDescription}</div>
        )}
        {value === "longDescription" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
      </Box>

      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          関連商品
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
