import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    const categories = [
      "Все",
      "Мясные",
      "С курицей",
      "Вегетаринская",
      "Острые",
      "Специальные",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, id) => (
            <li
              key={id}
              onClick={() => onChangeCategory(id)}
              className={value === id ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
