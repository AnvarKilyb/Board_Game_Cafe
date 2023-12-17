/*
Author: Pavlo Kornieiev, xkorni03
*/
import React, { useState } from "react";
import styles from "./Admin.module.css";
import Wrapper from "../../../UI/Wrapper";
import AdminReservations from "./AdminReservations";
import AdminMenu from "./AdminMenu";

const Admin = () => {
  const [selectedFilter, setSelectedFilter] = useState("reservations");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <Wrapper>
      <div className={styles.filterButtons}>
        <button
          onClick={() => handleFilterChange("reservations")}
          className={selectedFilter == "reservations" ? styles.chosenBtn : ""}
        >
          Reservations panel
        </button>
        <button
          onClick={() => handleFilterChange("menu")}
          className={selectedFilter == "menu" ? styles.chosenBtn : ""}
        >
          Menu panel
        </button>
      </div>

      {selectedFilter === "reservations" && <AdminReservations />}
      {selectedFilter === "menu" && <AdminMenu />}
    </Wrapper>
  );
};

export default Admin;
