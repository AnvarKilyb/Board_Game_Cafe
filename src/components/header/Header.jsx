import styles from "./Header.module.css";
import Wrapper from "../../UI/Wrapper";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            LOGO
          </Link>
          <ul className={styles.ul}>
            {/*HERE ADDING LINKS(pages) TO THE NAVBAR*/}
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/events">Events</CustomLink>
            <CustomLink to="/reservations">Reservations</CustomLink>
            <CustomLink to="/about">About Us</CustomLink>
          </ul>
        </div>
      </Wrapper>
    </header>
  );
};
const CustomLink = ({ to, children, ...props }) => {
  return (
    <li className={styles.li}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
export default Header;
