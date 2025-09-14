import React from "react";

const Prps = () => {
  return <User name="Wasim" age={21} />;
};

const User = (props) => {
  console.log(props); // This will show {name: "Wasim"} in the console
  return (
    <section>
      <h2>Hello, {props.name} 👋</h2>
      <h2>{props.age}</h2>
    </section>
  );
}; 

export default Prps;
