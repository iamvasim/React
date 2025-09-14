import { useParams, Link } from "react-router-dom";

const users = [
  { id: 1, name: "Wasim", email: "wasim@example.com" },
  { id: 2, name: "John", email: "john@example.com" },
  { id: 3, name: "Ali", email: "ali@example.com" },
];

export default function UserDetail() {
  const { id } = useParams(); // Get dynamic parameter
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return <h2>User Not Found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <Link to="/users">⬅ Back to Users</Link>
    </div>
  );
}
