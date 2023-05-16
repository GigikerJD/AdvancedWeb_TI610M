import Conversation from "./Conversation";
import MessageForm from "./MessageForm";
import {useState, useEffect} from "react-router-dom";


const ConversationList = ({user}) => {

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [otherUser, setOtherUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/conversations/${user}")
            .then((response) => response.json())
            .then((data) => setConversations(data))
            .catch((error) => console.log(error));
    }, [user]);

    const handleConversationSelect = (conversation) => {
        setSelectedConversation(conversation);
        setOtherUser(conversation.useer1 === user ? conversation.user2 : conversation.user1);
    }

    return(
        <>
            <h2>Conversations</h2>
            <ul>
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <button onClick={() => handleConversationSelect(conversation)}>
                    Conversation avec {conversation.user1 === user ? conversation.user2 : conversation.user1}
                  </button>
                </li>
              ))}
            </ul>
            {selectedConversation && (
              <div>
                <h2>Conversation with {otherUser}</h2>
                <Conversation sender={user} receiver={otherUser} />
                <MessageForm sender={user} receiver={otherUser} />
              </div>
            )}
        </>
    )
}

export default ConversationList;