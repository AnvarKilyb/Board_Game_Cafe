import Header from "./components/header/Header";
import Wrapper from "./UI/Wrapper";
import Home from "./components/pages/Home";
import Events from "./components/pages/Events";
import Reservations from "./components/pages/Reservations";
import AboutUs from "./components/pages/AboutUs";
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
        </Routes>
      </Wrapper>
    </>
  );
}
export default App;
