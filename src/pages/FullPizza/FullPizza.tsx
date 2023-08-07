import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./FullPizza.module.scss";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number[];
    description: string;
    types: {
      sizes: number[];
      prices: number[];
    }[];
  }>();

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
  console.log(pizza.price);
  console.log(pizza.types);
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.image}>
          <img src={pizza.imageUrl} alt="" />
        </div>
        <div className={styles.price}>Цена : {pizza.types[0].prices[0]} ₽</div>
      </div>
      <div className={styles.descriptionBlock}>
        <h2 className={styles.title}>{pizza.title}</h2>
        <div className={styles.description}>{pizza.description}</div>
      </div>
    </div>
  );
};

export default FullPizza;
