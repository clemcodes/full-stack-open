import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdatedAuthor />
    </div>
  );
};

const UpdatedAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...");

    updateAuthor({ variables: { name, born } });

    setName("");
    setBorn("");
  };

  return (
    <form onSubmit={submit}>
      <div>
        name
        <input value={name} onChange={({ target }) => setName(target.value)} />
      </div>
      <div>
        born
        <input
          value={born}
          onChange={({ target }) => setBorn(Number(target.value))}
        />
      </div>
      <button type="submit">update author</button>
    </form>
  );
};

export default Authors;
