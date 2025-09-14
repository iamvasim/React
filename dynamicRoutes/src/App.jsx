import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./UserList";
import UserDetail from "./UserDetail";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", background: "#f0f0f0" }}>
        <Link to="/users" style={{ marginRight: "10px" }}>Users</Link>
      </nav>

      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id?" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
