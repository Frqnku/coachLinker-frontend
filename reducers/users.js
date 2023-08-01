import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      currentLocation: {
        latitude: 0,
        longitude: 0
      },
      photo: '../assets/utilisateur.png',
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
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
    },
  },
});

export const { updateCurrentLocation, updateStatus, addPhoto } = userSlice.actions;
export default userSlice.reducer;