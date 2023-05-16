/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";
import NavGames from "./NavGames";
import {Routes, Route} from "react-router-dom";
import Playstation4 from "./Playstation4";
import XBOX1 from "./XBOX1";
import XBOXS from "./XBOXS";
import NintendoSwitch from "./Nintendo";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";


const Playstation5 = () => {

    const[games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try{
                const response = await axios.get("http://localhost:8000/api/ps5");
                setGames(response.data);
                console.log(games);
            }catch(error){
                console.log(error);
            }
        };
        fetchGames();
    }, [])

    return(
        <>
            <NavGames/>
            <Routes>
                
                <Route path="/home/play5" element={<Playstation5/>}/>
                <Route path="/home/play4" element={<Playstation4/>}/>
                <Route path="/home/xbox_s" element={<XBOXS/>}/>
                <Route path="/home/xbox_one" element={<XBOX1/>}/>
                <Route path="/home/nintendo_switch" element={<NintendoSwitch/>}/>
                <Route path="/home/login" element={<Login/>}/>
                <Route path="/home/register" element={<Register/>}/>
            </Routes>
            <h1>Playstation 5 component</h1>
            <table id="ps5-games">
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

export default Playstation5;