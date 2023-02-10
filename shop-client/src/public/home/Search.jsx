import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { setItems } from "../../state/addCart";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const items = useSelector((state) => state.cart.items);

  // console.log("items", items);

  async function getItems() {
    const items = await fetch(
      "https://unique-shop-server.herokuapp.com/api/items?populate=image",
      { method: "GET" }
    );

    const itemsJson = await items.json();

    dispatch(setItems(itemsJson.data));
    // console.log(itemsJson.data);
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const optionsName = items.map((item) => {
    return item.attributes.name;
  });

  const handleKeyDown = function (e) {
    items.filter((item) => {
      if (item.attributes.name === document.getElementById("searchBar").value) {
        if (e.key === "Enter") {
          console.log(item.id);
          navigate(`/item/${item.id}`);
        }
      }
    });
  };

  return (
    <Autocomplete
      disablePortal
      id="searchBar"
      options={optionsName}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="こちらから商品検索" />
      )}
      onKeyDown={handleKeyDown}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
