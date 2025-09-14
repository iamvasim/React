import { Link } from "react-router-dom";

const users = [
  { id: 1, name: "Wasim" },
  { id: 2, name: "John" },
  { id: 3, name: "Ali" },
];

export default function UserList() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
