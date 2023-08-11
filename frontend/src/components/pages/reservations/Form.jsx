import styles from "./Form.module.css";

const Form = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <div className={styles.formFirstLine}>
          <div className={styles.formFirstLineOne}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className={styles.name}
              placeholder="Enter your name"
            />
          </div>
          <div className={styles.formFirstLineTwo}>
            <label htmlFor="number" className={styles.numberLabel}>
              Telephone
            </label>
            <input
              id="number"
              type="tel"
              className={styles.number}
              placeholder="Enter your telephone"
            />
          </div>
        </div>
        <div className={styles.formSecondLine}>
          <div className={styles.formSecondLineOne}>
            <label htmlFor="date">Date</label>
            <input id="date" type="date" className={styles.date} />
          </div>
          <div className={styles.formSecondLineTwo}>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              min="1"
              placeholder="2"
              className={styles.amount}
            />
          </div>
        </div>
        <div className={styles.timeAndAdvice}>
          <div className={styles.timeCells}>
            <span className={styles.timeCell}>16:00</span>
            <span className={styles.timeCell}>16:30</span>
            <span className={styles.timeCell}>17:00</span>
            <span className={styles.timeCell}>17:30</span>
            <span className={styles.timeCell}>18:00</span>
            <span className={styles.timeCell}>18:30</span>
            <span className={styles.timeCell}>19:00</span>
            <span className={styles.timeCell}>19:30</span>
            <span className={styles.timeCell}>20:00</span>
            <span className={styles.timeCell}>20:30</span>
            <span className={styles.timeCell}>21:00</span>
            <span className={styles.timeCell}>21:30</span>
            <span className={styles.timeCell}>22:00</span>
            <span className={styles.timeCell}>22:30</span>
            <span className={styles.timeCell}>23:00</span>
            <span className={styles.timeCell}>23:30</span>
          </div>
          <input
            type="text"
            className={styles.advice}
            placeholder="Any booking requests"
          />
        </div>
        <button className={styles.button}>SUBMIT</button>
      </form>
    </div>
  );
};
export default Form;
