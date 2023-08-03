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
      photo: '../assets/utilisateur.png',
      statusGranted: null,

      email : '',
      password : '',
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
    updateSearchLocation: (state, action) => {
        state.value.searchLocation = action.payload;
    },
    updateStatus: (state, action) => {
        state.value.statusGranted = action.payload
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
    },
    Signup: (state, action) => {
      console.log('addUserRecu',action.payload)
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
  },
});

export const { updateCurrentLocation, updateSearchLocation, updateStatus, addPhoto, Signup, Signin } = userSlice.actions;
export default userSlice.reducer;