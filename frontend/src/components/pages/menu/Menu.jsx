/*
Author: Pavlo Kornieiev, xkorni03
*/
import { useState, useEffect, useCallback } from "react";
import Wrapper from "../../../UI/Wrapper";
import styles from "./Menu.module.css";
const Menu = () => {
  const [categories, setCategories] = useState([]);

  const fetchDataHandler = useCallback(async () => {
    const response = await fetch(
      "http://localhost:1337/api/categories/?populate=*"
    );
    const data = await response.json();

    const transformedData = data.data.map((category) => {
      return {
        id: category.id,
        categoryName: category.attributes.categoryName,
        items: category.attributes.dishes.data.map((item) => {
          return {
            id: item.id,
            dishName: item.attributes.dishName,
            dishDescription: item.attributes.dishDescription,
            price: item.attributes.price,
          };
        }),
      };
    });
    setCategories(transformedData);
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <Wrapper>
      <div className={styles.menu}>
        {categories.map((elem, index) => {
          return (
            <ul className={styles.category} key={index}>
              <h2 className={styles.categoryName}>{elem.categoryName}</h2>
              <div className={styles.categoryContent}>
                {elem.items.map((el, index) => {
                  return (
                    <li className={styles.elem} key={index}>
                      <div>
                        <h4>{el.dishName}</h4>
                        <p>{el.dishDescription}</p>
                      </div>
                      <span>{el.price}$</span>
                    </li>
                  );
                })}
              </div>
            </ul>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default Menu;
