import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id, newObj) => {
  return async (dispatch) => {
    await anecdoteService.vote(id, newObj);
    dispatch(addVote(id));
  };
};

export default anecdoteSlice.reducer;
export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;
