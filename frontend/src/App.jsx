import Header from "./components/header/Header";
import Wrapper from "./UI/Wrapper";
import Home from "./components/pages/home/Home";
import Events from "./components/pages/events/Events";
import Games from "./components/pages/games/Games";
import Game from "./components/pages/games/Game"
import Reservations from "./components/pages/reservations/Reservations";
import AboutUs from "./components/pages/about/AboutUs";
import NotFound from "./components/pages/NotFound";
import { Route, Routes } from "react-router-dom";
import { createContext, useContext, useState } from "react";

export const CartContext = createContext("");

function App() {
  const [cart, setCart] = useState(false);
  const cartTrue = () => {
    setCart(true);
  };
  const cartFalse = () => {
    setCart(false);
  };
  return (
    <>
      <Header func={cartFalse} cartState={cart}/>

      <CartContext.Provider value={{cart, cartTrue}}>
        <Routes>
          {/*Pages availiable at: components->pages*/}
          {/*If you want to configure navbar (Add or remove page),
              Add <Route> with needed path below this comment and 
              Add <CustomLink> with the same path inside <ul> 
              inside Header component, AND DON'T FORGET to create component
              in the pages folder
              */}
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/games/:id" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
}
export default App;
