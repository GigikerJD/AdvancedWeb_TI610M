import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playstation4 from "./components/Playstation4";
import Playstation5 from "./components/Playstation5";
import XBOX1 from "./components/XBOX1";
import XBOXS from "./components/XBOXS";
import NintendoSwitch from "./components/Nintendo";
import "../src/App.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/DisplayPage";



function App() {
  return (
    <>
      <NavBar/>
      <HomePage/>
      <Routes>
        <Route path="/play5" element={<Playstation5/>}/>
        <Route path="/play4" element={<Playstation4/>}/>
        <Route path="/xbox_s" element={<XBOXS/>}/>
        <Route path="/xbox_one" element={<XBOX1/>}/>
        <Route path="/nintendo_switch" element={<NintendoSwitch/>}/>
        <Route path="/home/login" element={<Login/>}/>
        <Route path="home/register" element={<Register/>}/>
      </Routes>
      <Footer/>
    </>
  );

}

export default App;