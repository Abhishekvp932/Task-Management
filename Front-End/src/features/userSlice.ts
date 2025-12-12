import { createSlice } from "@reduxjs/toolkit";
interface UserTypes {
    _id:string,
    name:string,
    email:string,
}
interface UserState {
  user: UserTypes | null;
}

const initialState: UserState = {
  user: null,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
