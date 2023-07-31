import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
    currentLocation: {},
    status: false
}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentLocation: (state, action) => {
        state.value.currentLocation = action.payload;
    },
    statusChange: (state) => {
        state.value.status = !state.value.status
    }
  },
});

export const { updateCurrentLocation, statusChange } = userSlice.actions;
export default userSlice.reducer;