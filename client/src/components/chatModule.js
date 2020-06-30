import React from 'react';
import "./friendsmodule.css";
import axios from "axios";
import io from "socket.io-client";


class ChatModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myMessage = "",
            messages=[],
        }
        this.socket = io('localhost:3001');
    }

    render() {
        const props = this.props
        return (
            <div className="chatBox">
                <h5>Chatting with {props.chattingWith}</h5>
                <div id="messageArea">{props.currentUser}:</div>
                <textarea id="typeSpace"></textarea>
                <span><button onClick={() => console.log("message sent")}>Send</button>
                    <button onClick={() => props.openFriend("close")}>Close</button></span>
            </div>
        )
    }

}
export default ChatModule;