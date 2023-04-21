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
import Home from "./components/hOME";


function App() {
  return (
    <>
      <Home/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/play5" element={<Playstation5/>}/>
        <Route path="/home/play4" element={<Playstation4/>}/>
        <Route path="/home/xbox_s" element={<XBOXS/>}/>
        <Route path="/home/xbox_one" element={<XBOX1/>}/>
        <Route path="/home/nintendo_switch" element={<NintendoSwitch/>}/>
        <Route path="/home/login" element={<Login/>}/>
        <Route path="/home/register" element={<Register/>}/>
      </Routes>
    </>
  );

}

export default App;