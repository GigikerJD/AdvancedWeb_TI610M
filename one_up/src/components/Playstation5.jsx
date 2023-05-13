/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState, useEffect } from "react";


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