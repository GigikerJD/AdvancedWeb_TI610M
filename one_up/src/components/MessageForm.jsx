import { useStaten, useState, useEffect, useRef } from "react"


const MessageForm = ({sender, receiver}) => {

    const [message, setMessage] = useState("");
    const [user2, setUser2] = useState(null);
    const offerPriceRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://localhost:8000/messages", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                sender: sender,
                receiver: receiver,
                message: message,
            })
        })
            .then((response) => {
                if(response.ok) {
                    fetch('http://localhost:8000/conversation/${sender}/${receiver}')
                        .then((response) => response.json())
                        .then((data) => {
                            // If the conversation exists, update it
                            if(data.length > 0){
                                const conversationId = data[0].id;
                                console.log(conversationId);
                                fetch(`http://localhost:8000/conversation/${conversationId}`, {
                                    method: "PUT",
                                    headers: { "Content-Type": "application/json" },
                                    })
                                    .then((response) => response.json())
                                    .then((data) => console.log(data))
                                    .catch((error) => console.error(error));
                            }else{
                                fetch(`http://localhost:8000/conversation`, {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ user1: sender, user2: receiver}),
                                })
                                  .then((response) => response.json())
                                  .then((data) => console.log(data))
                                  .catch((error) => console.error(error));
                            }
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log(error));

        setMessage("");    
    }

    const handleNewOffer = (event) => {
        event.preventDefault();
        const offerPrice = offerPriceRef.current.value;
    
        // Send offer to server
        fetch('http://localhost:8000/offers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: sender,
            receiver: receiver,
            message: '',
            price: offerPrice,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetch(`http://localhost:8000/conversation/${sender}/${receiver}`)
          .then((response) => response.json())
          .then((data) => {
            setUser2(data[0].user2);
          })
          .catch((error) => console.error(error));
    }, [sender, receiver]);

    return(
        <>
            <form id="message-form" onSubmit={handleSubmit}>
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={`Type your message here...`}
                required
              />
              <button type="submit">Send</button>
            </form>
            {sender === user2 && (
              <form>
                <label htmlFor="offerPrice">Offer price:</label>
                <input type="number" name="offerPrice" id="offerPrice" ref={offerPriceRef} required/>
                <button type="button" onClick={handleNewOffer}>
                  Create New Offer
              </button>
            </form>
            )}
        </>
    )

}

export default MessageForm;