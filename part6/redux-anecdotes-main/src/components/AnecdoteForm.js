import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationTime } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createNew = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotificationTime("New anecdote created!", 5));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
