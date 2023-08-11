import Header from "./components/header/Header";
import Home from "./components/pages/home/Home";
import Events from "./components/pages/events/Events";
import Games from "./components/pages/games/Games";
import Reservations from "./components/pages/reservations/Reservations";
import Contacts from "./components/pages/contacts/Contacts";
import Menu from "./components/pages/menu/Menu";
import NotFound from "./components/pages/NotFound";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Header />

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
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;
