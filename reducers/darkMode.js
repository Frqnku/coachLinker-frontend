import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    switchMode: (state) => {
      state.value = !state.value
    }
  },
});

export const { switchMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
