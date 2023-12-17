/*
Author: Pavlo Kornieiev, xkorni03
*/
import styles from "./Popup.module.css";

const Popup = (props) => {
  const submitButtonHandler = async () => {
    const reservationData = {
      name: props.data.enteredName,
      mobileNumber: props.data.enteredTel,
      date: props.data.enteredDate,
      people: props.data.enteredPeople,
      time: props.data.lastClickedCell,
      note: props.data.note,
    };
    try {
      const response = await fetch(
        "http://localhost:1337/api/reservations?populate=*",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: reservationData,
          }),
        }
      );

      if (!response.ok) {
        // Handle non-successful responses (e.g., 404 Not Found, 500 Internal Server Error)
        throw new Error(
          `Error submitting reservation: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Handle the response from the server if needed
      console.log("Reservation successful:", data);

      // Reset form inputs and close the popup
      props.onConfirm(true);
      props.reset.setLastClickedCell("");
      props.reset.resetNameInput();
      props.reset.resetTelInput();
      props.reset.resetDateInput();
      props.reset.resetPeopleInput();
      props.reset.setNote("");
      props.onEdit(false);
    } catch (error) {
      console.error("Error submitting reservation:", error.message);
      // Handle the error if needed
    }
  };

  const editButtonHandler = () => {
    props.onEdit(false);
  };
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorPopup}>
        <h2>Reservation Details:</h2>
        <p>Name: {props.data.enteredName}</p>
        <p>Telephone: {props.data.enteredTel}</p>
        <p>Date: {props.data.enteredDate}</p>
        <p>Time: {props.data.lastClickedCell}</p>
        <p>People: {props.data.enteredPeople}</p>
        <p>Note: {props.data.note}</p>
        <div className={styles.buttons}>
          <button onClick={editButtonHandler}>EDIT</button>
          <button onClick={submitButtonHandler}>CONFIRM</button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
