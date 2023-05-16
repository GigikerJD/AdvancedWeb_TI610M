import { useState, useEffect } from "react";
import axios from "axios";
import {Routes, Route} from "react-router-dom";
import Playstation4 from "./Playstation4";
import Playstation5 from "./Playstation5";
import XBOX1 from "./XBOX1";
import Register from "./Register";
import Login from "./Login";
import NintendoSwitch from "./Nintendo";
import NavGames from "./NavGames";

const XBOXS = () => {

    const[games, setGames] = useState([]);

    useEffect(() => {
        const XBOXS_games = async () => {
            try{
                const response = await axios.get("http://localhost:8000/api/xboxs");
                setGames(response.data);
                console.log(games);
            }catch(error){
                console.log(error);
            }
        };
        XBOXS_games();
    }, [])

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
            <h1>XBoxS component</h1>
            <table id="xboxs-games">
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

export default XBOXS;