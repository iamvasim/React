import React, { useState, useEffect } from 'react';

const FetchDataEffect = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPost(data);
    };
    fetchdata();
  }, []); // ✅ run only once after component mounts

  return (
    <div>
      <h1>First post title:</h1>
      {posts.length > 0 ? <h2>{posts[0].title}</h2> : <p>Loading...</p>}
    </div>
  );
};

export default FetchDataEffect;
