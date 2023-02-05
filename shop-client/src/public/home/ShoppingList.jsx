import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { setItems } from "../../state/addCart";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);

  // console.log("items", items);

  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );

    const itemsJson = await items.json();

    dispatch(setItems(itemsJson.data));
    // console.log(itemsJson.data);
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sofaItems = items.filter((item) => item.attributes.category === "sofa");
  const tableItems = items.filter(
    (item) => item.attributes.category === "table"
  );
  const chairItems = items.filter(
    (item) => item.attributes.category === "chair"
  );
  const lightItems = items.filter(
    (item) => item.attributes.category === "light"
  );
  const bedItems = items.filter((item) => item.attributes.category === "bed");

  return (
    <Box width="900px" margin="80px auto">
      <Typography variant="h2" textAlign="center">
        販売商品
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="ソファ" value="sofa" />
        <Tab label="テーブル" value="table" />
        <Tab label="椅子" value="chair" />
        <Tab label="ライト" value="light" />
        <Tab label="ベッド" value="bed" />
      </Tabs>
      <Box
        sx={{
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(3, 252px)",
          // gridTemplateRows: "177px",
          rowGap: "20px",
          columnGap: "7.33%",
        }}
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}

        {value === "sofa" &&
          sofaItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "table" &&
          tableItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "chair" &&
          chairItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "light" &&
          lightItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bed" &&
          bedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
