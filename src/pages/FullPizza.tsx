import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://64aacef60c6d844abededb01.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (e) {
        alert(" Ошибка при получении пиццы!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>"Загрузка..."</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} ₽ </h3>
      <p>{pizza.description}</p>
    </div>
  );
};

export default FullPizza;
