import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({
        type: "SHOW",
        payload: `you created: '${newAnecdote.content}'`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "REMOVE" });
      }, 5000);
    },
    onError: (newAnecdote) => {
      notificationDispatch({
        type: "SHOW",
        data: `an error occurred while creating '${newAnecdote.content}', use at least 5 characters for`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "REMOVE" });
      }, 5000);
    },
  });

  const notificationDispatch = useNotificationDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
