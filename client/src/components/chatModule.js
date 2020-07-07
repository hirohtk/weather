import React from 'react';
import "./friendsmodule.css";
import axios from "axios";
import io from "socket.io-client";
import "./chatModule.css";

class ChatModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myMessage: "",
            messages: [],
            joined: false,
        }
        this.socket = io('localhost:3001');

        this.socket.on('newMessage', function (data) {
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({ messages: [...this.state.messages, data] });
        };
    }

    // componentDidMount() {
    //     console.log(`*** CHAT COMPONENT MOUNTED, PROPS.chattingwith is ${this.props.chattingWith}`);
    //     // setTimeout(() => {
            
    //     // }, 1000);
    // }

    UNSAFE_componentWillReceiveProps() {
        this.joinChatRoom();
    }

    componentWillUnmount() {
        this.setState({messages: []});
    }

    textInputHandler = (event) => {
        event.preventDefault();
        this.setState({ myMessage: event.target.value })
    };

    sendMessage = (event) => {
        // SOCKET IS HANDLING MONGOOSE AND DB INTERACTION IN sockets.js, DON'T USE AXIOS 
        if (event.type === "click" || event.keyCode === 13) {
            this.socket.emit('message', {
                chatroomName: this.props.chatroomName,
                author: this.props.currentUser[1],
                message: this.state.myMessage
            });
            this.setState({ myMessage: '' })
        }
    };

    joinChatRoom = () => {
        this.socket.emit("join", this.props.chatroomID);
        // console.log(`***chatModule.js:  GETTING HISTORY FOR chatroom ${this.props.chatroomID}...`)
        axios.get(`/api/chathistory/${this.props.chatroomID}`).then(response => {
            // console.log(`***chatModule.js:  chatroom history response is ${JSON.stringify(response.data.messages)}`);
            this.setState({messages: response.data.messages});
        });
    }

    render() {
        const props = this.props
        return (
            <div className="chatBox">
                <h5>{props.currentUser[0]} chatting with {props.chattingWith}</h5>
                <div id="messageArea">{this.state.messages != undefined ? this.state.messages.map((each, index) => (
                    <p>{each.author.username}: {each.message}</p>
                )) 
                : 
                <></>}</div>
                <textarea id="typeSpace" value={this.state.myMessage} onChange={this.textInputHandler}></textarea>
                <span><button onClick={this.sendMessage} type="submit" onKeyUp={this.sendMessage}>Send</button>
                    <button onClick={() => props.closeBox("close")}>Close</button></span>
            </div>
        )
    }
}
export default ChatModule;