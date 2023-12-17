/*
Author: Pavlo Kornieiev, xkorni03
*/

import React from "react";
import styles from "./AdminMenu.module.css";
import { useState, useCallback, useEffect } from "react";

const AdminMenu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [filter, setFilter] = useState("");
  const [inputErr, setInputErr] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedCategory && dishName && dishDescription && dishPrice) {
      setInputErr(false);

      try {
        // First POST request to create a new menu item
        const response = await fetch(
          "http://localhost:1337/api/menus?populate=*",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                dishName: dishName,
                dishDescription: dishDescription,
                price: dishPrice,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error creating menu item: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const idOfCreatedItem = data.data.id;

        // Second PUT request to update the category
        const arrayOfId = (
          categories.find((el) => el.id == selectedCategory)?.items || []
        ).map((el) => {
          return { id: el.id };
        });

        const response2 = await fetch(
          `http://localhost:1337/api/categories/${selectedCategory}/?populate=*`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                dishes: [...arrayOfId, { id: idOfCreatedItem }],
              },
            }),
          }
        );

        if (!response2.ok) {
          throw new Error(
            `Error updating category: ${response2.status} ${response2.statusText}`
          );
        }

        const data2 = await response2.json();
        setSelectedCategory("");
        setDishDescription("");
        setDishName("");
        setDishPrice("");
        console.log("Menu item was added successfully:", data2);
        fetchDataHandler();
      } catch (error) {
        console.error("Error submitting form:", error.message);
      }
    } else {
      setInputErr(true);
    }
  };
  const handleDelete = async (itemId) => {
    try {
      // Send a DELETE request to the appropriate API endpoint
      const response = await fetch(
        `http://localhost:1337/api/menus/${itemId}/?populate=*`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error deleting menu item: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Menu item was deleted successfully:", data);

      // After deleting, update the category data
      fetchDataHandler();
    } catch (error) {
      console.error("Error deleting menu item:", error.message);
    }
  };
  return (
    <div className={styles.menuWrapper}>
      <h1 className={styles.h1}>Add Menu Items:</h1>
      <form className={styles.form}>
        <select
          name="dishes"
          id="dishes"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="" disabled hidden>
            Select a category...
          </option>
          {categories.map((elem) => (
            <option key={elem.id} value={elem.id}>
              {elem.categoryName}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Name of the dish"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description of the dish"
          value={dishDescription}
          onChange={(e) => setDishDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price of the dish"
          value={dishPrice}
          onChange={(e) => setDishPrice(e.target.value)}
        />
        {inputErr && (
          <p style={{ padding: 0, color: "red" }}>PLEASE FILL UP THE FORM</p>
        )}
        <button onClick={handleSubmit}>Add</button>
      </form>
      <div className={styles.menu}>
        <select
          name="dishes"
          id="dishes"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="" disabled hidden>
            Select a category...
          </option>
          {categories.map((elem) => (
            <option key={elem.id} value={elem.id}>
              {elem.categoryName}
            </option>
          ))}
        </select>
        {categories
          .filter((el) => el.id == filter)
          .map((elem, index) => {
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
                        <div className={styles.priceAndDelete}>
                          <span>{el.price}$</span>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(el.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </div>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default AdminMenu;
