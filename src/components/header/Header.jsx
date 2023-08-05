import styles from "./Header.module.css";
import Wrapper from "../../UI/Wrapper";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
const Header = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle(styles.responsiveNav);
  };

  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            LOGO
          </Link>
          <nav ref={navRef}>
            <ul className={styles.ul}>
              {/*HERE ADDING LINKS(pages) TO THE NAVBAR*/}
              <CustomLink to="/">Home</CustomLink>
              <CustomLink to="/games">Games</CustomLink>
              <CustomLink to="/events">Events</CustomLink>
              <CustomLink to="/reservations">Reservations</CustomLink>
              <CustomLink to="/about">About Us</CustomLink>
              <button
                className={`${styles.navBtn} ${styles.navCloseBtn}`}
                onClick={showNavbar}
              >
                <FaTimes />
              </button>
            </ul>
          </nav>
          <button className={styles.navBtn} onClick={showNavbar}>
            <FaBars />
          </button>
        </div>
      </Wrapper>
    </header>
  );
};
const CustomLink = ({ to, children, ...props }) => {
  const closeNavbar = () => {
    navRef.current.classList.remove(styles.responsiveNav);
  };
  return (
    <li className={styles.li}>
      <Link to={to} {...props} onClick={closeNavbar}>
        {children}
      </Link>
    </li>
  );
};
export default Header;
