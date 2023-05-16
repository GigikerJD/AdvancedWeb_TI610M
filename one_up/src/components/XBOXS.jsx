import { useState } from "react";
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