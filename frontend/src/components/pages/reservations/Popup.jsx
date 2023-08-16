import styles from "./Popup.module.css";

const Popup = (props) => {
  const submitButtonHandler = () => {
    props.onConfirm(true);
    //HERE SENT DATA TO THE BACKEND
    props.reset.setLastClickedCell("");
    props.reset.resetNameInput();
    props.reset.resetTelInput();
    props.reset.resetDateInput();
    props.reset.resetPeopleInput();
    props.onEdit(false);
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
        <div className={styles.buttons}>
          <button onClick={editButtonHandler}>EDIT</button>
          <button onClick={submitButtonHandler}>CONFIRM</button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
