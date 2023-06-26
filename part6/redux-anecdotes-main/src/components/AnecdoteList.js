import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotificationTime } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(state.filter);
      });
    }
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const updatedAnecdote = {
      id: anecdote.id,
      content: anecdote.content,
      votes: anecdote.votes + 1,
    };
    dispatch(voteAnecdote(anecdote.id, updatedAnecdote));
    dispatch(setNotificationTime(`you voted '${anecdote.content}'`, 5));
  };
  return (
    <>
      {anecdotes
        // .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};
