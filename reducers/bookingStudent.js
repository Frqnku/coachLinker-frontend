import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {token: null, bookings: []}
};

export const bookingStudentSlice = createSlice({
  name: 'bookingStudent',
  initialState,
  reducers: {
    addBooking: (state, action) => { 
        // console.log('reçu', action.payload)
        state.value.token = action.payload.token
        state.value.bookings = action.payload.bookings
    }
  },
});

export const { addBooking } = bookingStudentSlice.actions;
export default bookingStudentSlice.reducer;