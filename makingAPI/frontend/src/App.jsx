import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true); // start loading
    const url = "http://localhost:3001/users";
    let response = await fetch(url);
    response = await response.json();
    console.log(response);
    setUserData(response);
    setLoading(false); // stop loading
  };

  return (
    <>
      <h1>Integrate JSON Server API and loader!</h1>
      <ul className="user-list">
        {
          loading 
            ? <h1>Data loading....</h1> 
            : userData.map((user) => (
                <li key={user.id} className="user-card">
                  <h2>{user.firstName} {user.lastName}</h2>
                  <p>ID: {user.id}</p>
                </li>
              ))
        }
      </ul> 
    </>
  );
}

export default App;
