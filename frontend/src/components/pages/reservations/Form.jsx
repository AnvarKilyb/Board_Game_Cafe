/*
Author: Pavlo Kornieiev, xkorni03
*/
import styles from "./Form.module.css";
import Popup from "./Popup";
import { useState, useEffect } from "react";
import useInput from "../../../hooks/useInput";
import Confirmation from "./Confirmation";
import { motion } from "framer-motion";
const Form = () => {
  const [lastClickedCell, setLastClickedCell] = useState("");
  const [showData, setShowData] = useState(false);
  const [timeHasError, setTimeHasError] = useState(false);
  const [showBookingConfirm, setShowBookingConfirm] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    if (lastClickedCell !== "") {
      setTimeHasError(false);
    }
  }, [lastClickedCell]);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
    setIsTouched: setNameIsTouched,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredTel,
    isValid: enteredTelIsValid,
    hasError: telHasError,
    valueChangeHandler: telChangeHandler,
    inputBlurHandler: telBlurHandler,
    reset: resetTelInput,
    setIsTouched: setTelIsTouched,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: resetDateInput,
    setIsTouched: setDateIsTouched,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredPeople,
    isValid: enteredPeopleIsValid,
    hasError: peopleHasError,
    valueChangeHandler: peopleChangeHandler,
    inputBlurHandler: peopleBlurHandler,
    reset: resetPeopleInput,
    setIsTouched: setPeopleIsTouched,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredTelIsValid &&
    enteredDateIsValid &&
    enteredPeopleIsValid &&
    lastClickedCell !== ""
  ) {
    formIsValid = true;
  }

  const handleTimeCellClick = (value) => {
    setLastClickedCell(value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      setNameIsTouched(true);
      setTelIsTouched(true);
      setDateIsTouched(true);
      setPeopleIsTouched(true);
      if (lastClickedCell === "") setTimeHasError(true);
      return;
    }
    setShowData(true);
  };

  return (
    <div className={styles.formWrapper}>
      {showData && (
        <Popup
          onEdit={setShowData}
          data={{
            enteredName,
            enteredTel,
            enteredDate,
            enteredPeople,
            note,
            lastClickedCell,
          }}
          reset={{
            resetNameInput,
            resetTelInput,
            resetDateInput,
            resetPeopleInput,
            setNote,
            setLastClickedCell,
          }}
          onConfirm={setShowBookingConfirm}
        />
      )}
      {showBookingConfirm && <Confirmation onClose={setShowBookingConfirm} />}
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.formFirstLine}
        >
          <div className={styles.formFirstLineOne}>
            <label htmlFor="name"></label>
            <input
              id="name"
              type="text"
              className={
                nameHasError ? `${styles.name} ${styles.err}` : styles.name
              }
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
              placeholder="Enter your name"
            />
          </div>
          <div className={styles.formFirstLineTwo}>
            <label htmlFor="number" className={styles.numberLabel}></label>
            <input
              id="number"
              type="tel"
              className={
                telHasError ? `${styles.number} ${styles.err}` : styles.number
              }
              onChange={telChangeHandler}
              onBlur={telBlurHandler}
              value={enteredTel}
              placeholder="Enter your telephone"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.formSecondLine}
        >
          <div className={styles.formSecondLineOne}>
            <label htmlFor="date"></label>
            <input
              id="date"
              type="date"
              className={
                dateHasError ? `${styles.date} ${styles.err}` : styles.date
              }
              onChange={dateChangeHandler}
              onBlur={dateBlurHandler}
              value={enteredDate}
            />
          </div>
          <div className={styles.formSecondLineTwo}>
            <label htmlFor="amount"></label>
            <input
              id="amount"
              type="number"
              min="1"
              placeholder="2 person"
              onChange={peopleChangeHandler}
              onBlur={peopleBlurHandler}
              value={enteredPeople}
              className={
                peopleHasError
                  ? `${styles.amount} ${styles.err}`
                  : styles.amount
              }
            />
          </div>
        </motion.div>
        <div className={styles.timeAndAdvice}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            animate="visible"
            className={styles.timeCells}
          >
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
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.8 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  key={formattedTime}
                  className={cellClasses}
                  onClick={() => handleTimeCellClick(formattedTime)}
                >
                  {formattedTime}
                </motion.span>
              );
            })}
          </motion.div>
          {timeHasError && (
            <p className={styles.errText}>Please choose a time!</p>
          )}
          <motion.input
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            type="text"
            className={styles.advice}
            placeholder="Any booking requests"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.button}
          type="submit"
        >
          SUBMIT
        </motion.button>
      </form>
    </div>
  );
};
export default Form;
