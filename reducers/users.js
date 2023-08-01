import { createSlice } from '@reduxjs/toolkit';

// problème avec value dans initialState à chercher.

const initialState = {
<<<<<<< HEAD
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
      
=======
    value: {
      currentLocation: {
        latitude: 0,
        longitude: 0
      },
      photo: '../assets/utilisateur.png',
      statusGranted: true
}
>>>>>>> f591de83ac5b5834c920f11abf4322b97d1d3d4f
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
<<<<<<< HEAD
        // state.value.statusGranted = action.payload
        state.statusGranted = action.payload;
    }
=======
        state.value.statusGranted = action.payload
    },
    addPhoto: (state, action) => {
      state.value.photo = action.payload;
    },
>>>>>>> f591de83ac5b5834c920f11abf4322b97d1d3d4f
  },
});

export const { updateCurrentLocation, updateStatus, addPhoto } = userSlice.actions;
export default userSlice.reducer;