import styles from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  const MySvgIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
    >
      <polygon points="7 7 15.586 7 5.293 17.293 6.707 18.707 17 8.414 17 17 19 17 19 5 7 5 7 7" />
    </svg>
  );
  return (
    <div className={styles.homePage}>
      <div className={styles.homeLeft}>
        <h1>Board games cafe</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className={styles.homeRight}>
        <Link to="/reservations" className={styles.linkToBook}>
          <p>Book A Table</p>
          <button>
            <MySvgIcon />
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Home;
