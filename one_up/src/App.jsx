import { Route, Routes } from "react-router-dom";
import Playstation4 from "./components/Playstation4";
import Playstation5 from "./components/Playstation5";
import XBOX1 from "./components/XBOX1";
import XBOXS from "./components/XBOXS";
import NintendoSwitch from "./components/Nintendo";
import "../src/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import NavGames from "./components/NavGames";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Contact from "./components/Contact";
import ConversationList from "./components/ConversationList";
import Achat from "./components/Achat";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/navgames" element={<NavGames/>}/>
        <Route path="/home/play5" element={<Playstation5/>}/>
        <Route path="/home/play4" element={<Playstation4/>}/>
        <Route path="/home/xbox_s" element={<XBOXS/>}/>
        <Route path="/home/xbox_one" element={<XBOX1/>}/>
        <Route path="/home/nintendo_switch" element={<NintendoSwitch/>}/>
        <Route path="/home/login" element={<Login/>}/>
        <Route path="/home/register" element={<Register/>}/>
        <Route path="/Edit-Profile" element={<Contact/>}></Route>
        <Route path="/Conversation" element={<ConversationList user="user1"/>}/>
        <Route path="/Achat" element={<Achat/>} />
      </Routes>

      <Footer/>
    </>
  );

}

export default App;