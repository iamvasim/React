import React, { useState, useEffect, lazy, Suspense } from 'react';

// ✅ Lazy load the User component
const User = lazy(() => import('./User'));

function App() {
  const [loading, setLoading] = useState(false);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowUser(true);
        setLoading(false); // stop showing loading screen
      }, 5000);

      return () => clearTimeout(timer); // cleanup if unmounted
    }
  }, [loading]);

  return (
    <>
      <h1>Lazy Loading</h1>

      {loading && <h3>Data is loading ....</h3>}

      {showUser && (
        <Suspense fallback={<h3>Data is loading ....</h3>}>
          <User />
        </Suspense>
      )}

      {!loading && !showUser && (
        <button onClick={() => setLoading(true)}>Load user</button>
      )}
    </>
  );
}

export default App;
