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
      signUp: {
        // infos communes
        email: '',
        password: '',
        name: '',
        firstname: '', 
        image: '', 
        myDescription: '',
        // infos coach
        teachedSport: [], 
        proCard: '', 
        siret: '', 
        iban: '', 
        bic: '',
        price: '', 
        notes: [], 
        city: '', 
        coachingPlaces: [],
        isCoach: false,
        // infos student
        dateOfBirth: '',
        favoriteSport: []
      },

      token: null
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
    addProcard: (state, action) => {
      state.value.signUp.proCard = action.payload;
    },
    signUp: (state, action) => {
      state.value.signUp = {
        ...state.value.signUp, // Copie toutes les propriétés actuelles
        ...action.payload, // Remplace les propriétés avec celles de l'action
      };
      console.log('signUp', state.value.signUp)
      },
    addToken: (state, action) => {
        state.value.token = action.payload
      },
     logout: (state) => {
        state.value.token = null;
        state.value.email = null;
      },
  },
});

export const { updateCurrentLocation, updateSearchLocation, updateStatus, addPhoto, signUp, addToken,logout,addProcard } = userSlice.actions;
export default userSlice.reducer;