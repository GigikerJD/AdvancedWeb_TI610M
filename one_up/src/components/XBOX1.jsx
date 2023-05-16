import { useState } from "react";
import NavGames from "./NavGames";


const XBOX1 = () => {
    
    const [games, setGames] = useState([]);

    useEffect(() => {
        const XBOX1_games = async () => {
            try{
                const response = await axios.get("http://localhost:8000/api/xbox1");
                setGames(response.data);
                console.log(games);
            }catch(error){
                console.log(error);
            }
        };
        XBOX1_games();
    }, [])

    return(
        <>
            <NavGames/>
            <h1>XBox One component</h1>
            <table id="xbox1-games">
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

export default XBOX1;