import styles from "./Confirmation.module.css";
import { useState } from "react";
const Confirmation = (props) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div
      className={styles.confirmWrapper}
      onClick={() => {
        props.onClose(false);
      }}
    >
      <div
        className={styles.confirmPopup}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h2>Reservation Confirmed!</h2>
        <p>
          Thank you for choosing us! If you need to cancel or modify your
          reservation, you can do so by contacting us directly.
        </p>
        <button
          onClick={() => {
            props.onClose(false);
          }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};
export default Confirmation;
