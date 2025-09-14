import { useState } from 'react'

function App() {
  const colors = JSON.parse(localStorage.getItem('color'))
  const [r, setR] = useState(colors?.r ?? 0);
  const [g, setG] = useState(colors?.g ?? 0);
  const [b, setB] = useState(colors?.b ?? 0);

  const save = () => {
    localStorage.setItem("color", JSON.stringify({ r, g, b }));
  }

  return (
    <>
      <h1>Color mixer !</h1>

      <div
        style={{
          backgroundColor: `rgb(${r}, ${g}, ${b})`,
          height: 200,
          width: 200,
          border: "2px solid black",
          marginBottom: "20px",
        }}
      ></div>

      <label>Red</label>
      <input value={r} onChange={(e) => setR(Number(e.target.value))} type="range" min={0} max={255} />
      <br /><br />

      <label>Green</label>
      <input value={g} onChange={(e) => setG(Number(e.target.value))} type="range" min={0} max={255} />
      <br /><br />

      <label>Blue</label>
      <input value={b} onChange={(e) => setB(Number(e.target.value))} type="range" min={0} max={255} />
      <br /><br />

      <button onClick={save}>Save color combination</button>
    </>
  )
}

export default App
