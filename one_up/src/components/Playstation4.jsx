import { useState, useEffect } from "react";
import NavGames from "./NavGames";
import Playstation5 from "./Playstation5";
import NintendoSwitch from "./Nintendo";
import XBOX1 from "./XBOX1";
import XBOXS from "./XBOXS";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import "../styles/ps4.css";


const Playstation4 = () => {

    const[games, setGames] = useState([]);

    useEffect(() => {
        const PS4_games = async () => {
            try{
                const response = await axios.get("http://localhost:8000/api/ps4");
                setGames(response.data);
                console.log(games);
            }catch(error){
                console.log(error);
            }
        };
        PS4_games();
    }, []);

    return(
        <>
            <NavGames/>
            <Routes>
                <Route path="/home/play5" element={<Playstation5/>}/>
                <Route path="/home/xbox_s" element={<XBOXS/>}/>
                <Route path="/home/xbox_one" element={<XBOX1/>}/>
                <Route path="/home/nintendo_switch" element={<NintendoSwitch/>}/>
                <Route path="/home/login" element={<Login/>}/>
                <Route path="/home/register" element={<Register/>}/>
            </Routes>
            <h1>Playstation 4 component</h1>
            <table id="ps4-games">
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Category</td>
                        <td>Quantity</td>
                    </tr>

                    {games.map((game, index) => {
                        return(
                            <tr key={index}>
                                <td>{game.title}</td>
                                <td>{game.price}</td>
                                <td>{game.gameTag}</td>
                                <td>{game.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
};

export default Playstation4;