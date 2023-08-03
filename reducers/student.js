import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      name: null,
      firstname: null,
      image: null,
      dateOfBirth: null,
      myDescription: null,
      favoriteSport: [],
      Id_user: null
    },
  };

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    updateStudent: (state, action) => {
      console.log('recu',action.payload)
        state.value =  action.payload;
      },
    },
  });

export const { updateStudent } = studentSlice.actions;
export default studentSlice.reducer;