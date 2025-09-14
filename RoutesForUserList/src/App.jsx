import UserAdd from './UserAdd';
import Userlist from './Userlist';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Links */}
      <ul className='nav-list'>
        <li>
          <NavLink to='/'>List</NavLink>
          <NavLink to='/users' style={{ marginLeft: '10px' }}>Add user</NavLink>
        </li>
      </ul>

      <h1>Make Routes and pages for Add user and user list UI !</h1>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Userlist />} />
        <Route path="/users" element={<UserAdd />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
