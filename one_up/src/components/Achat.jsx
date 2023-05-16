import { useLocation } from "react-router-dom"

const Achat = () => {
    const [nomAcheteur, setNomAcheteur] = useState('');
    const [adresseLivraison, setAdresseLivraison] = useState('');
    const [numeroCarteBleue, setNumeroCarteBleue] = useState('');
    const [dateExpiration, setDateExpiration] = useState('');
    const [cvv, setCvv] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const offer = searchParams.get('offer');


    const handleItem = (event) => {
        event.preventDefault();
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <p>purchase price : {offer}€</p>
                <label>
                    Nom de l'acheteur :
                    <input type="text" value={nomAcheteur} onChange={(event) => setNomAcheteur(event.target.value)} />
                </label>
                <br />
                <label>
                    Adresse de livraison :
                    <input type="text" value={adresseLivraison} onChange={(event) => setAdresseLivraison(event.target.value)} />
                </label>
                <br />
                <label>
                    Numéro de carte bleue :
                    <input type="text" value={numeroCarteBleue} onChange={(event) => setNumeroCarteBleue(event.target.value)} />
                </label>
                <br />
                <label>
                    Date d'expiration (MM/AA) :
                    <input type="text" value={dateExpiration} onChange={(event) => setDateExpiration(event.target.value)} />
                </label>
                <br />
                <label>
                    Code de vérification (CVV) :
                    <input type="text" value={cvv} onChange={(event) => setCvv(event.target.value)} />
                </label>
                <br />
                <button type="submit">Acheter</button>
            </form>
        </>
    )
}

export default Achat;