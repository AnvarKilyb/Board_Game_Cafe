import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Wrapper from "../../../UI/Wrapper";
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
      <Wrapper></Wrapper>
    </div>
  );
};
export default Home;
