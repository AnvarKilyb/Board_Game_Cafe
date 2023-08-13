import styles from "./Form.module.css";
import Popup from "./Popup";
import { useState, useEffect } from "react";

const Form = (props) => {
  const [lastClickedCell, setLastClickedCell] = useState("");
  const [showData, setShowData] = useState(false);
  const [badInput, setBadInput] = useState({
    badName: false,
    badTelephone: false,
    badDate: false,
    badPeople: false,
    badTime: false,
  });

  useEffect(() => {
    if (props.data.name) setBadInputFunc("badName", false);
    if (props.data.telNumber) setBadInputFunc("badTelephone", false);
    if (props.data.date) setBadInputFunc("badDate", false);
    if (props.data.peopleAmount) setBadInputFunc("badPeople", false);
    if (props.data.time) setBadInputFunc("badTime", false);
  }, [props.data]);

  const handleTimeCellClick = (value) => {
    setLastClickedCell(value);
    props.dispatch({ type: "TIME_CHANGE", value: value });
  };
  const nameChangeHandler = (event) => {
    props.dispatch({ type: "NAME_CHANGE", value: event.target.value });
  };
  const telNumberChangeHandler = (event) => {
    props.dispatch({
      type: "MOBILE_CHANGE",
      value: event.target.value,
    });
  };
  const dateChangeHandler = (event) => {
    props.dispatch({ type: "DATE_CHANGE", value: event.target.value });
  };
  const peopleAmountChangeHandler = (event) => {
    props.dispatch({
      type: "PEOPLE_CHANGE",
      value: event.target.value,
    });
  };
  const noteChangeHandler = (event) => {
    props.dispatch({ type: "NOTE_CHANGE", value: event.target.value });
  };

  const setBadInputFunc = (prop, value) => {
    setBadInput((prevState) => {
      return {
        ...prevState,
        [prop]: value,
      };
    });
  };
  const validateInput = () => {
    if (props.data.name == "") {
      setBadInputFunc("badName", true);
    } else {
      setBadInputFunc("badName", false);
    }

    if (props.data.telNumber == "") {
      setBadInputFunc("badTelephone", true);
    } else {
      setBadInputFunc("badTelephone", false);
    }

    if (props.data.time == "") {
      setBadInputFunc("badTime", true);
    } else {
      setBadInputFunc("badTime", false);
    }

    if (props.data.peopleAmount == "") {
      setBadInputFunc("badPeople", true);
    } else {
      setBadInputFunc("badPeople", false);
    }

    if (props.data.date == "") {
      setBadInputFunc("badDate", true);
    } else {
      setBadInputFunc("badDate", false);
    }
  };

  const onSubmitHandler = (event) => {
    console.log(props.data);
    event.preventDefault();
    validateInput();
    if (
      props.data.name &&
      props.data.telNumber &&
      props.data.time &&
      props.data.peopleAmount &&
      props.data.date
    ) {
      setShowData(true);
    }
    //props.dispatch({ type: "RESET" });
    //setLastClickedCell("");
  };
  return (
    <div className={styles.formWrapper}>
      {showData && (
        <Popup
          data={props.data}
          onEdit={setShowData}
          dispatch={props.dispatch}
          setCell={setLastClickedCell}
        />
      )}
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <div className={styles.formFirstLine}>
          <div className={styles.formFirstLineOne}>
            <label htmlFor="name"></label>
            <input
              id="name"
              type="text"
              className={
                badInput.badName ? `${styles.name} ${styles.err}` : styles.name
              }
              placeholder="Enter your name"
              onChange={nameChangeHandler}
              value={props.data.name}
            />
          </div>
          <div className={styles.formFirstLineTwo}>
            <label htmlFor="number" className={styles.numberLabel}></label>
            <input
              id="number"
              type="tel"
              className={
                badInput.badTelephone
                  ? `${styles.number} ${styles.err}`
                  : styles.number
              }
              placeholder="Enter your telephone"
              onChange={telNumberChangeHandler}
              value={props.data.telNumber}
            />
          </div>
        </div>
        <div className={styles.formSecondLine}>
          <div className={styles.formSecondLineOne}>
            <label htmlFor="date"></label>
            <input
              id="date"
              type="date"
              className={
                badInput.badDate ? `${styles.date} ${styles.err}` : styles.date
              }
              onChange={dateChangeHandler}
              value={props.data.date}
            />
          </div>
          <div className={styles.formSecondLineTwo}>
            <label htmlFor="amount"></label>
            <input
              id="amount"
              type="number"
              min="1"
              placeholder="2 person"
              className={
                badInput.badPeople
                  ? `${styles.amount} ${styles.err}`
                  : styles.amount
              }
              onChange={peopleAmountChangeHandler}
              value={props.data.peopleAmount}
            />
          </div>
        </div>
        <div className={styles.timeAndAdvice}>
          <div className={styles.timeCells}>
            {[...Array(16)].map((_, index) => {
              const hours = Math.floor(index / 2) + 16;
              const minutes = (index % 2) * 30;
              const formattedTime = `${hours
                .toString()
                .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

              const cellClasses = `${styles.timeCell} ${
                lastClickedCell === formattedTime ? styles.clicked : ""
              }`;

              return (
                <span
                  key={formattedTime}
                  className={cellClasses}
                  onClick={() => handleTimeCellClick(formattedTime)}
                >
                  {formattedTime}
                </span>
              );
            })}
          </div>
          {badInput.badTime && (
            <p className={styles.errText}>Please choose a time!</p>
          )}
          <input
            type="text"
            className={styles.advice}
            placeholder="Any booking requests"
            onChange={noteChangeHandler}
            value={props.data.note}
          />
        </div>
        <button className={styles.button} type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};
export default Form;
