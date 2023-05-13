import { useEffect, useState } from "react";


const NintendoSwitch = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try{
                const response = await axios.get("http://localhost:8000/api/nintendo");
                setGames(response.data);
                console.log(games);
            }catch(error){
                console;log(error);
            }
        };
        fetchGames();
    }, [])

    return(
        <>
            <h1>Nintendo Switch component</h1>
            <table id="nintendo-games">
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

export default NintendoSwitch;