import { Filter } from "@/global-interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  filter: {
    type: "search", // default filter type
    value: "", // default filter value
  },
  newUser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter.type = action.payload.type;
      state.filter.value = action.payload.value;
    },
    setNewUser: (state, action: PayloadAction<{ newUser: any }>) => {
      // console.log("object 2", action.payload.newUser);
      state.newUser = action.payload.newUser;
    },
  },
});

export const { setFilter, setNewUser } = userSlice.actions;
export default userSlice.reducer;
