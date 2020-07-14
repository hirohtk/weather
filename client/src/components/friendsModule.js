import React from 'react';
import "./friendsmodule.css";
import axios from "axios";
import ChatModule from "./chatModule";
import io from "socket.io-client";

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            friendResults: [],
            friendsList: [],
            friendsLoaded: false,
            chat: false,
            chattingWith: "",
            chattingWithID: "",
            chatroomID: "",
            notification: false,
            unread: []
        }
        this.socket = io('https://immense-cove-75264.herokuapp.com/' && 'localhost:3001');

        this.socket.on('newMessage', function (data) {
            console.log(`got a new message - this is from FriendsModule`)
            doNotify(data);
        });

        const doNotify = (data) => {
            if (!this.state.chat) {
                console.log(`You're not chatting with anyone but you got a new message`)
                this.setState({notification: true, unread: [...this.state.unread, {author: data.author.username, message: data.message}]}, () => {
                    console.log(`if returns true on "test", then good.  RETURNS: ${this.state.unread.filter((name) => name.author === "test").some((each) => each.author === "test")}`);
                    ;
                });
                console.log(`unread messages in state are ${JSON.stringify(this.state.unread)}`);
            }
            else {
                console.log(`You are chatting with someone and got a new message`)
            }
        }
    }

    test = () => {}

    searchInputHandler = (event) => this.setState({ searchTerm: event.target.value })

    searchHandler = () => {
        if (this.state.searchTerm.length === 0) {
            this.setState({friendResults: [{username: "No results- input is blank.", id: null}]})
        }
        else {
            axios.get(`/api/allusers/${this.state.searchTerm}`).then(response => {
                console.log(response.data);
                if (response.data.length === 0) {
                    this.setState({ friendResults: [] });
                }
                else {
                    this.setState({ friendResults: [{ username: response.data[0].username, id: response.data[0]._id }] });
                }
                this.setState({ searching: true, searchTerm: "" });
            })
        }
    }

    clearResults = () => this.setState({ friendResults: [], searching: false });

    loadFriends = () => {
        console.log(`loading friends for: ${this.props.currentUser[1]}`);
        axios.get(`/api/loadfriends/${this.props.currentUser[1]}`).then(response => {
            // if a new user, the response.data array will have zero length, preventing access of data.  conditional below handles that
            if (response.data.length === 0) {
                return;
            }
            else {
                // console.log(`querying for friends returns ${response.data[0].friends}`);
                this.setState({ friendsList: response.data[0].friends, friendsLoaded: true }, () => {
                    // console.log(`friendslist in state is ${this.state.friendsList}`)
                    this.clearResults()
                });
            }
        })
    }

    addFriend = (id) => {
        axios.put(`/api/addusers/${id}`, { userID: this.props.currentUser[1] }).then(response => {
            this.loadFriends();
        });
    };

    componentDidMount = () => {
        // I think I can extend this usage for componentdidupdate for when people log on and off (hopefully server broadcasts to this component
        // causing a rerender?)
        if (this.props.loggedIn) {
            this.loadFriends();
        }
    }

    componentDidUpdate = () => {
        if (this.props.loggedIn === false && this.state.friendsLoaded === true) {
            this.setState({ friendsLoaded: false });
        }
        if (this.props.loggedIn === true && this.state.friendsLoaded === false) {
            this.loadFriends();
        }
    }

    openFriend = (action, username, id) => {
        if (action === "open" && !this.state.chat) {
            this.setState({ chat: true, chattingWith: username, chattingWithID: id }, () => {
                this.props.provideFriendInfo(username, id);
                console.log(`friendsModule.js: we are trying to make a new chatroom and your friend's id is ${id}, *** AND I AM ${this.props.currentUser[1]}`)
                axios.put(`/api/getroom/${id}`, { user: this.props.currentUser[1] }).then(response => {
                    // response from backend should give a mongo id of the chatroom.  what was fed into this route though
                    // are both yours and your friends' ID's which get sorted into a unified string 
                    console.log(`*** friendsModule.js: the chatroom response is ${response}, the id is ${response.data._id}`);
                    this.setState({ chatroomID: response.data._id, chatroomName: response.data.name, chatReady: true });
                    this.chatNotification(false);
                })
            });
        }
        else if (action === "open" && this.state.chat) {
            this.setState({ chat: false, chattingWith: "", chattingWithID: "", chatroomID:""}, () => {
                this.openFriend("open", username, id)
            });
        }
        else {
            this.setState({ chat: false, chattingWith: "", chattingWithID: "", chatroomID:""}, () => {
                this.props.closeFriend();
            });
        }
    }

    chatNotification = (unread) => {
        if (unread) {
            console.log("HAVE UNREAD MESSAGES, SETTING NOTIFICATION TO TRUE")
            this.setState({notification: true});
        }
        else {
            console.log("UNREAD MESSAGES ARE READ, SETTING NOTIFICATION TO FALSE")
            this.setState({notification: false});
        }
    }

    render() {
        const props = this.props
        return (
            <>
                {props.loggedIn === true ? <div className="friendsOverlord">
                    {this.state.chat && this.state.chatReady ?
                        <ChatModule
                            chattingWith={this.state.chattingWith}
                            closeBox={this.openFriend}
                            currentUser={this.props.currentUser}
                            chatroomID={this.state.chatroomID}
                            chatroomName={this.state.chatroomName}
                            chatNotification={this.chatNotification}
                            isChatting={this.state.chat}
                            socket={this.socket}
                        >
                        </ChatModule>
                        :
                        <></>}
                    <div className="containerForFriends">
                        <div className="friends-gradient"></div>
                        {/* Will become a .map to list friends here */}
                        <div className="theActualList">
                            {this.state.friendsList === undefined ? <>Friends list is undefined</> : this.state.friendsList.length === 0 ?
                                <>
                                    <h5>No friends yet!</h5>
                                </>
                                :
                                <>
                                    
                                    {this.state.friendsList.map((each, index) => (
                                        <p className="theFriends" onClick={() => this.openFriend("open", each.username, each._id)}>
                                            <i class="material-icons offline">lens</i>{each.username}
                                            {/* unread is an array, filter it down to an array where author names are present.
                                            if this array includes username, and if this array includes username, render message icon */}
                                            {this.state.notification && this.state.unread.filter((name) => name.author === each.username).some((ehhh) => ehhh.author === each.username) ? <i class="material-icons" style={{color: "white"}}>message</i> : <></>}
                                            <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/partyparrot.gif"></img></p>
                                    ))}
                                </>}
                        </div>
                        {/* <p className="theFriends"><i class="material-icons offline">lens</i>Friend 1 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/sleepingparrot.gif"></img> </p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 2 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/partyparrot.gif"></img></p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 3 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/shuffleparrot.gif"></img></p> */}
                        <div className="searchForFriends">
                            <input placeholder="Search for a user!" name="searchTerm" value={this.state.searchTerm} maxLength="16" onChange={this.searchInputHandler} className="whiteText"></input>
                            <button id="loginSubmit" onClick={this.searchHandler}>Go!</button>
                            {this.state.searching ?
                                <>{this.state.friendResults.length === 0 ?
                                    <><h5 className="whiteText">Search Results</h5>
                                        <p className="whiteText">None, try again!</p>
                                    </> :
                                    <> <h5 className="whiteText">Search Results</h5>
                                        {this.state.friendResults.map((each, index) =>
                                            // NEED ARROW FUNCTION TO INVOKE this.addFriend()
                                        <p className="whiteText">{each.username}{each.username != "No results- input is blank." ? <button onClick={() => this.addFriend(each.id)}>Add</button> : <></>}</p>)}
                                        <button onClick={this.clearResults}>Clear</button>
                                    </>}
                                </> : <></>}
                        </div>
                    </div>

                </div> : <></>}
            </>
        )
    }
}

export default Friends;