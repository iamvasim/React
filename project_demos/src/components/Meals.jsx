import { useState, useEffect } from "react";
import "../style.css";

function Meals() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
      .then((res) => res.json())
      .then((data) => setItems(data.meals))
      .catch((err) => console.error("API Error:", err));
  }, []);

  const itemsList = items?.map(({ strMeal, strMealThumb, idMeal }) => (
    <section className="card" key={idMeal}>
      <img src={strMealThumb} alt={strMeal} />
      <section className="content">
        <p>{strMeal}</p>
        <p>#{idMeal}</p>
      </section>
    </section>
  ));

  return <div className="items-container">{itemsList}</div>;
}

export default Meals;
