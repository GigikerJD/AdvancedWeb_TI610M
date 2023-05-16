import { useState } from "react";
import NavGames from "./NavGames";

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
    }, [])

    return(
        <>
            <NavGames/>
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