import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      name: null,
      firstname: null,
      image: null,
      dateOfBirth: null,
      myDescritpion: null,
      favoriteSport: [],
      Id_user: null
    },
  };

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    updateStudent: (state, action) => {
        const { name, firstname, image, dateOfBirth, myDescritpion, favoriteSport, Id_user } = action.payload;
        state.value = {
          name,
          firstname,
          image,
          dateOfBirth,
          myDescritpion,
          favoriteSport: [...state.value.favoriteSport, ...favoriteSport], // Ajoute les sports favoris sans écraser ceux déjà présents
          Id_user,
        };
      },
    },
  });

export const { updateStudent } = studentSlice.actions;
export default studentSlice.reducer;