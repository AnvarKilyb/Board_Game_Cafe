/*
Author: Pavlo Kornieiev, xkorni03
*/
import React from "react";
import styles from "./AdminReservations.module.css";
import { useState, useEffect, useCallback } from "react";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  const getReservations = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/reservations?populate=*`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch reservations: ${response.statusText}`);
      }

      const data = await response.json();
      const formattedData = data.data.map((elem) => {
        return {
          id: elem.id,
          name: elem.attributes.name,
          date: elem.attributes.date,
          mobileNumber: elem.attributes.mobileNumber,
          time: elem.attributes.time,
          people: elem.attributes.people,
          note: elem.attributes.note,
        };
      });
      setReservations(formattedData);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  }, [setReservations]);

  const deleteReservation = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/reservations/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete reservation: ${response.statusText}`);
      }

      // Update the reservations state after successful deletion
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  useEffect(() => {
    getReservations();
  }, [getReservations]);
  return (
    <div className={styles.reservationsWrapper}>
      <h1 className={styles.h1}>Reservations:</h1>
      <div>
        <ul className={styles.list}>
          {reservations.length == 0 && (
            <p>Currently there are no reservations</p>
          )}
          {reservations.map((elem) => {
            return (
              <li key={elem.id} className={styles.listElem}>
                <div className={styles.listElemDescription}>
                  <div>
                    <span style={{ fontSize: "1.5rem" }}>{elem.name}</span>,{" "}
                    {elem.mobileNumber}
                  </div>
                  <div>
                    {elem.date} {elem.time}
                  </div>
                  {elem.note}
                </div>

                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteReservation(elem.id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminReservations;
