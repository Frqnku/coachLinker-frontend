import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      currentLocation: {
        latitude: 48.8877611,
        longitude: 2.3036914
      },
      searchLocation: {
        name: 'Autour de moi',
        latitude: 48.8877611,
        longitude: 2.3036914
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
    updateSearchLocation: (state, action) => {
        state.value.searchLocation = action.payload;
    },
    updateStatus: (state, action) => {
        state.value.statusGranted = action.payload
    }
  },
});

export const { updateCurrentLocation, updateSearchLocation, updateStatus } = userSlice.actions;
export default userSlice.reducer;