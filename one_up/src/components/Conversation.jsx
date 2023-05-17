import { useEffect, useState } from "react";



const Conversation = ({sender, receiver}) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/messages/${sender}/${receiver}`)
            .then((response) => response.json())
            .then((data) => setMessages(data));
    }, [messages]);

    const handleAcceptOffer = (offer) => {
        window.location.href = "/achat?offer=${offer}";
    }


    return(
        <>
            {messages.map((message) => (
            <div key={message.id} style={{ backgroundColor: message.sender === 'Yael' ? '#DDDDDD' : '#FFFFFF' }}>
                {message.offer !== null ? (
                <div>
                    <p>New offer: {message.offer}€</p>
                    {message.receiver === sender ? (
                    <button onClick={() => handleAcceptOffer(message.offer)}>Accept</button>
                    ) : null}
                </div>
                ) : (
                <div>
                    <p>{message.sender}: {message.message}</p>
                    <p>{new Date(message.sent_at).toISOString().slice(0,10)}</p>
                </div>
                )}
            </div>
            ))}
        </>
    )
} 

export default Conversation;