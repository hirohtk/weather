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

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
        };

    }

    textInputHandler = (event) => this.setState({ myMessage: event.target.value });

    sendMessage = () => {
        this.socket.emit('SEND_MESSAGE', {
                author: this.props.currentUser[0],
                message: this.state.myMessage
            }, () => this.setState({myMessage: ''}));
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