import { useState, useEffect } from "react";
import axios from "axios";

const Playstation5 = () => {

    const[games, setGames] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            try{
                const response = await axios.get("api/ps5");
                setGames(response.data);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchData();
    }, [])

    return(
        <>
            <h1>Playstation 5 component</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.title}</li>
                ))}
            </ul>
        </>
    )
};

export default Playstation5;