import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            {user.name} {user.blogs.length}
          </Link>
        </div>
      ))}
    </>
  )
}

export default Users
