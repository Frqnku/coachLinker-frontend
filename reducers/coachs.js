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
      },
      bookedCoach: {}
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
    },
    updateBookedCoach: (state, action) => {
      state.value.bookedCoach = action.payload;
    },
  },
});

export const { updateCoachsAround, updatePlanning, updateBookedCoach } = coachSlice.actions;
export default coachSlice.reducer;