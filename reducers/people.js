import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, email: null }
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.email = null;
    },
  },
});

export const { login, logout } = peopleSlice.actions;
export default peopleSlice.reducer;