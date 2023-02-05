import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isWishOpen: false,
  wish: [],
  items: [],
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToWish: (state, action) => {
      if (state.wish.filter((item) => item.id !== action.payload.id)) {
        state.wish = [...state.wish, action.payload.item];
      }

      // console.log("hi");
    },

    removeFromWish: (state, action) => {
      state.wish = state.wish.filter((item) => item.id !== action.payload.id);
    },

    increaseWishCount: (state, action) => {
      state.wish = state.wish.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseWishCount: (state, action) => {
      state.wish = state.wish.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsWishOpen: (state) => {
      state.isWishOpen = !state.isWishOpen;
    },
  },
});

export const {
  setItems,
  addToWish,
  removeFromWish,
  increaseWishCount,
  decreaseWishCount,
  setIsWishOpen,
} = wishSlice.actions;

export default wishSlice.reducer;
