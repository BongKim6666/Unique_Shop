import { useSelector, useDispatch } from "react-redux";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { removeFromWish, setIsWishOpen } from "../../state/addWishList";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WishMenu = () => {
  const dispatch = useDispatch();
  const wish = useSelector((state) => state.wish.wish);

  const isWishOpen = useSelector((state) => state.wish.isWishOpen);

  return (
    <Box
      display={isWishOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">気に入り ({wish.length})</Typography>
            <IconButton onClick={() => dispatch(setIsWishOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* Wish LIST */}
          <Box>
            {wish.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="100px"
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromWish({ id: item.id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.shortDescription}</Typography>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">商品数 :</Typography>
              <Typography fontWeight="bold">{wish.length}</Typography>
            </FlexBox>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WishMenu;
