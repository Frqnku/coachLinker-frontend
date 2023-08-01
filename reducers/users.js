import { createSlice } from '@reduxjs/toolkit';

// problème avec value dans initialState à chercher.

const initialState = {
  // value: {
  //   currentLocation: {
  //       latitude: 0,
  //       longitude: 0
  //     },
  //     statusGranted: true
  // }

  currentLocation: {
    latitude: 0,
    longitude: 0
  },
  statusGranted: true
      
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateCurrentLocation: (state, action) => {
        // state.value.currentLocation = action.payload; 
        state.currentLocation = action.payload;
    },
    updateStatus: (state, action) => {
        // state.value.statusGranted = action.payload
        state.statusGranted = action.payload;
    }
  },
});

export const { updateCurrentLocation, updateStatus, addPhoto } = userSlice.actions;
export default userSlice.reducer;