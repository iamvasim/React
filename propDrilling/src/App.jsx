import React from "react";
import { createContext } from "react";
import ComponentA from "./components/ComponentA";


 export const data = createContext()
 export const data1=createContext();


function App() {
  const name = "Wasim";

  const age =21;
  return (
    <div>
            <h1>Prop Drilling solve Example:by context Api</h1>
      <data.Provider value={name}>
        <data1.Provider value={age}>

       <ComponentA  />
      </data1.Provider>

      </data.Provider>

     
     
    </div>
  );
}

export default App;
