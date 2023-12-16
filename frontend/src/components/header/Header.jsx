import styles from "./Header.module.css";
import Wrapper from "../../UI/Wrapper";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import useFetch from "../../../hooks/useFetch"

const headers = { "Content-Type": "application/json" };

const Header = (props) => {
  const cartFalse = props.func;
  const cartState = props.cartState;
  const navRef = useRef();
  const [ showcart, setShowcart ] = useState(false);
  const { loading, error, data, updateData } = useFetch('http://localhost:1337/api/carts?filters[user][username][$eq]=Ivan Golikov&populate[games][populate][0]=photo')    

  let cartC = 0;
  try {
    cartC = data.data[0].attributes.games.data.length;
  } catch {

  }

  const showNavbar = () => {
    navRef.current.classList.toggle(styles.responsiveNav);
  };

  const showCart = () => {
    setShowcart(!showcart);
  };

  const refreshCart = async (data) => {
    try {
      const response = await fetch('http://localhost:1337/api/carts?filters[user][username][$eq]=Ivan Golikov&populate[games][populate][0]=photo', {
        headers,
        method: "GET",
        body: null,
      });
  
      if(response.ok){
        const data = await response.json();
        updateData(data);
      }
  
    } catch(error){
        console.error('event creation error', error);
    }
  }

  if (cartState) {
    console.log("header before", cartState);
    refreshCart();
    cartFalse();
    console.log("header after", cartState);
  }

  const buyGames = async (data) => {
    try {

      const response = await fetch('http://localhost:1337/api/carts/1?populate=*', {
        headers,
        method: "GET",
        body: null,
      });

      if(response.ok){
        const res = await response.json();

        let ids = [];
        res.data.attributes.games.data.map( game => (
          ids.push(game.id)
        ));

        await fetch('http://localhost:1337/api/carts/1', {
          headers, 
          method: "PUT",
          body: JSON.stringify({
              data: {
                  games: {
                      disconnect: ids
                  },
                  totalprice: 0
              }
          })
        });

        refreshCart();
      }
    } catch(error){
        console.error('event creation error', error);
    }
  }

  const deleteGame = async (data) => {
    try {
      const response = await fetch('http://localhost:1337/api/carts/1', {
        headers,
        method: "GET",
        body: null,
      });
      const dataR = await response.json();

      await fetch('http://localhost:1337/api/carts/1', {
        headers, 
        method: "PUT",
        body: JSON.stringify({
            data: {
                games: {
                    disconnect: [data.target.name]
                },
                totalprice: parseInt(dataR.data.attributes.totalprice)-parseInt(data.target.value)
            }
        })
      });
  
      refreshCart();
    } catch(error){
        console.error('event creation error', error);
    }
  }

  const handlerDays = async (data) => {
    let newDays;
    if (data.target.id === "gt") {
      newDays = parseInt(data.target.value)+1;
    } else {
      newDays = parseInt(data.target.value)-1;
    }

    if (newDays > 0) {
      try {
        await fetch('http://localhost:1337/api/carts/1', {
        headers, 
        method: "PUT",
        body: JSON.stringify({
            data: {
                days: newDays
            }
          })
        });

        refreshCart();
      } catch(error) {
        console.error('event creation error', error);
      }
    }

    console.log(data);

  }
  
  const Cart = (props) => {
    const id = props.attr.id;
    const attr = props.attr.attributes;
  
    return (
      <div className={styles.row}>
        <div>
          {attr.photo.data ? (
              <img className={styles.img} src={'http://localhost:1337' + attr.photo.data.attributes.formats.thumbnail.url}/>
          ) : (
              <div>No Image Available</div>
          )}
        </div>
        
        <div className={styles.txt}>
          {attr.title}
        </div>

        <div className={styles.txt}>
          {attr.price} CZK
        </div>
  
        <div> 
          <button className={styles.btn} id={id} value={attr.price} onClick={deleteGame} name={id}>Remove</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className={styles.header}>
        <Wrapper>
          <div className={styles.headerContent}>
            <Link to="/" className={styles.logo}>
              <span>G</span>Cafe
            </Link>
            <div className={styles.headerC}>
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
              <div>
                <div>
                  <button className={styles.cart} onClick={showCart}> <LuShoppingCart /> </button>
                  <label className={styles.cartCount}>{cartC}</label>
                </div>
                  {showcart &&
                    <div className={styles.cartInner}>
                      <div className={styles.carthead}>
                        Your Cart:
                      </div>

                      {data.data[0].attributes.games.data.map(game => (
                        <Cart key={game.id} attr={game}/>
                      ))}

                      <div className={styles.totalPrice}>
                        Total price for 
                        <div className={styles.days}>
                          <button id="lt" value={data.data[0].attributes.days} className={styles.daysBtn} onClick={handlerDays}>&lt;</button> 
                            {data.data[0].attributes.days} 
                          <button id="gt" value={data.data[0].attributes.days} className={styles.daysBtn} onClick={handlerDays}>&gt;</button> 
                        </div>
                        days: {data.data[0].attributes.totalprice*data.data[0].attributes.days} CZK
                        <button onClick={buyGames} className={styles.buyBtn}>Buy</button>
                      </div>

                    </div>}
                </div>
            </div>
          </div>
        </Wrapper>
      </header>
      <div className={styles.emptySpace}></div>
    </>
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
