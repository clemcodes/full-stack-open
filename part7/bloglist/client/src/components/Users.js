const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} {user.blogs.length}
        </div>
      ))}
    </>
  )
}

export default Users
