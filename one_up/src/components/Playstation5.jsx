import { useState, useEffect } from "react";
import axios from "axios";

const Playstation5 = () => {

    const[games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch("/api/ps5");
                const data = await response.json();
                setGames(data);
            }catch(error){
                console.log(error);
            }
        }
    });

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