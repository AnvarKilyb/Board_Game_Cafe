import styles from "./Popup.module.css";

const Popup = (props) => {
  const submitButtonHandler = () => {
    //HERE SENT DATA TO THE BACKEND
    props.dispatch({ type: "RESET" });
    props.setCell("");
    props.onEdit(false);
  };
  const editButtonHandler = () => {
    props.onEdit(false);
  };
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorPopup}>
        <p>Name: {props.data.name}</p>
        <p>Telephone: {props.data.telNumber}</p>
        <p>Date: {props.data.date}</p>
        <p>Time: {props.data.time}</p>
        <p>People: {props.data.peopleAmount}</p>
        <div className={styles.buttons}>
          <button onClick={editButtonHandler}>EDIT</button>
          <button onClick={submitButtonHandler}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
};
export default Popup;
