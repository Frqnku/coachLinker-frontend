import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      coachsAround: []
    }
};

export const coachSlice = createSlice({
  name: 'coachs',
  initialState,
  reducers: {
    updateCoachsAround: (state, action) => {
        state.value.coachsAround = action.payload;
    }
  },
});

export const { updateCoachsAround } = coachSlice.actions;
export default coachSlice.reducer;