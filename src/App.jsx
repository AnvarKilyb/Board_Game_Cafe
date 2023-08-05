import Header from "./components/header/Header";
import Wrapper from "./UI/Wrapper";
import Home from "./components/pages/home/Home";
import Events from "./components/pages/events/Events";
import Reservations from "./components/pages/reservations/Reservations";
import AboutUs from "./components/pages/about/AboutUs";
import NotFound from "./components/pages/NotFound";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <Routes>
          {/*Pages availiable at: components->pages*/}
          {/*If you want to configure navbar (Add or remove page),
            Add <Route> with needed path below this comment and 
            Add <CustomLink> with the same path inside <ul> 
            inside Header component, AND DON'T FORGET to create component
            in the pages folder
            */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Wrapper>
    </>
  );
}
export default App;
