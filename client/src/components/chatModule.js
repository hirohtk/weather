import React from 'react';
import "./friendsmodule.css";
import axios from "axios";
import io from "socket.io-client";

class ChatModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myMessage: "",
            messages: [],
        }
        this.socket = io('localhost:3001');

        this.socket.on('newMessage', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
        };

    }

    textInputHandler = (event) => this.setState({ myMessage: event.target.value });

    sendMessage = () => {
        // axios.get(`/api/testchat/${this.props.currentUser[1]}`).then(
            
        // );
        this.socket.emit('message', {
            author: this.props.currentUser[0],
            message: this.state.myMessage
        }, () => this.setState({myMessage: ''}))
    };

    joinChatRoom = () => {
        this.socket.emit("join", this.props.chatroomID);
    }

    render() {
        const props = this.props
        return (
            <div className="chatBox">
                <h5>{props.currentUser[0]} chatting with {props.chattingWith}</h5>
                <div id="messageArea">{this.state.messages.map((each) => (
                    <p>{each.author}: {each.message}</p>
                ))}</div>
                <textarea id="typeSpace" onChange={this.textInputHandler}></textarea>
                <span><button onClick={this.sendMessage}>Send</button>
                    <button onClick={() => props.closeBox("close")}>Close</button></span>
            </div>
        )
    }

}
export default ChatModule;