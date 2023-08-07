import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
      coachsAround: [],
      planning: {
        Lundi: {
          day: 'Lundi',
          start: '',
          end: '',
        },
        Mardi: {
          day: 'Mardi',
          start: '',
          end: '',
        },
        Mercredi: {
          day: 'Mercredi',
          start: '',
          end: '',
        },
        Jeudi: {
          day: 'Jeudi',
          start: '',
          end: '',
        },
        Vendredi: {
          day: 'Vendredi',
          start: '',
          end: '',
        },
        Samedi: {
          day: 'Samedi',
          start: '',
          end: '',
        },
        Dimanche: {
          day: 'Dimanche',
          start: '',
          end: '',
        },
      }
    }
};

export const coachSlice = createSlice({
  name: 'coachs',
  initialState,
  reducers: {
    updateCoachsAround: (state, action) => {
      state.value.coachsAround = action.payload;
    },
    updatePlanning: (state, action) => {
      const { day, start, end } = action.payload;

      if (state.value.planning[day]) {
        state.value.planning[day].start = start;
        state.value.planning[day].end = end;
      }
    }
  },
});

export const { updateCoachsAround, updatePlanning } = coachSlice.actions;
export default coachSlice.reducer;