import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      currentLocation: {
        latitude: 0,
        longitude: 0
      },
      statusGranted: true
}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentLocation: (state, action) => {
        state.value.currentLocation = action.payload;
    },
    updateStatus: (state, action) => {
        state.value.statusGranted = action.payload
    }
  },
});

export const { updateCurrentLocation, updateStatus } = userSlice.actions;
export default userSlice.reducer;