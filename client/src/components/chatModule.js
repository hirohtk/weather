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
        }
        // this.socket = io('https://immense-cove-75264.herokuapp.com/' && 'localhost:3001');

        // props.socket.on('newMessage', function (data) {
        //     console.log(`got a new message - this is from ChatModule`)
        //     addMessage(data);
        // });

        this.reference = React.createRef();

        // const addMessage = data => {
        //     console.log(data);
        //     this.setState({ messages: [...this.state.messages, data]});
        // };
    }

    UNSAFE_componentWillReceiveProps() {

    }

    componentWillUnmount() {
        // this.setState({ messages: [] });
    }

    componentDidUpdate() {
        this.reference.current.scrollIntoView({ behavior: 'smooth' })
    }

    textInputHandler = (event) => {
        event.preventDefault();
        this.setState({ myMessage: event.target.value })
    };

    sendMessage = (event) => {
        // SOCKET IS HANDLING MONGOOSE AND DB INTERACTION IN sockets.js, DON'T USE AXIOS 
        event.preventDefault();
        this.props.socket.emit('message', {
            chatroomName: this.props.chatroomName,
            author: this.props.currentUser[1],
            message: this.state.myMessage,
            chatroomID: this.props.chatroomID
        });
        this.setState({ myMessage: '' })
    };

    render() {
        const props = this.props
        return (
            <div className="chatBox">
                <h5>{props.currentUser[0]} chatting with {props.chattingWith}</h5>
                <div id="messageArea" >{this.props.messages != undefined ? this.props.messages.map((each, index) => (
                    <p>{each.author.username}: {each.message}</p>
                ))
                    :
                    <></>}<div ref={this.reference}></div></div>
                <form>
                    <input type="text" id="typeSpace" value={this.state.myMessage} onChange={this.textInputHandler}></input>
                    <span>
                        <button onClick={this.sendMessage} type="submit">Send</button>
                        <button onClick={() => props.closeBox("close")}>Close</button>
                    </span>
                </form>
            </div>
        )
    }
}
export default ChatModule;