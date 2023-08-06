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
      <Wrapper>
        <div className={styles.homeContent}>
          <div className={styles.homeContentDescription}>
            <p>
              STEP INTO A WORLD OF EXCITEMENT AND CAMARADERIE AT OUR BOARD GAME
              CAFE. UNWIND WITH A CUP OF AROMATIC COFEE WHILE ENGAGING IN
              THRILLING BOARD GAME ADVENTURES WITH FRIENDS AND FELLOW
              ENTHUSIASTS
            </p>
            <Link to="/reservations" className={styles.button}>
              BOOK A TABLE <MySvgIcon />
            </Link>
          </div>
          <div className={styles.container}>
            <svg viewBox="0 0 120 20" className={styles.svg}>
              <text
                x="0"
                y="16"
                font-family="'LogoFont'"
                textLength="100%"
                lengthAdjust="spacingAndGlyphs"
              >
                GAME ON CAFE
              </text>
            </svg>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
export default Home;
