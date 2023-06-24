import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote: (state, action) => {
      const id = action.payload;
      const anecdoteIndex = state.findIndex((a) => a.id === id);
      state[anecdoteIndex].votes += 1;
    },
    addAnecdote: (state, action) => {
      const newAnecdote = action.payload;
      state.push(newAnecdote);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export default anecdoteSlice.reducer;
export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;
