import React, { useState, useEffect } from 'react';

const CounterEffect = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `count = ${count}`;
  }, [count]); 

  return (
    <div>
      <p>This is use of counter</p>
      <h1>The count is: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
};

export default CounterEffect;
