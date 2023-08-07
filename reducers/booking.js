import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {token: null, bookings: []}
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking: (state, action) => { 
        // console.log('reçu', action.payload)
        state.value.token = action.payload.token
        state.value.bookings = action.payload.bookings
    }
  },
});

export const { addBooking } = bookingSlice.actions;
export default bookingSlice.reducer;