import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const anecdoteVoteMutation = useMutation(updateAnecdote, {
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({
        type: "SHOW",
        payload: `you voted: '${anecdote.content}'`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "REMOVE" });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    anecdoteVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery("anecdotes", getAnecdotes);
  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
