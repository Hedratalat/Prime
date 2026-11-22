import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Splash from "./pages/Splash";

function App() {
  return (
    <>
      <Splash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App;
