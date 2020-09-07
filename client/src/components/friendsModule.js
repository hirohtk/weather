import React from 'react';
import "./friendsmodule.css";
import axios from "axios";
import ChatModule from "./chatModule";
// import io from "socket.io-client";

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
            unread: [],
            messages: [],
            loggedInFriends: [],
            loggedInRooms: [],
            searching: false,
            offlineSenders: []
        }

        // props.socket = io('https://immense-cove-75264.herokuapp.com/' && 'localhost:3001');

        props.socket.on('newMessage', function (data) {
            // FORK HERE - if new message isn't from the person you're chatting with, push to unread.  else, push to current messages
            // console.log(`*** NEW MESSAGE - THIS CAME FROM ${data.chatroomID}`);
            notifyOrAdd(data)
        });

        props.socket.on('roomJoined', function (data) {
            let room = data.room;
            // console.log(`${data.who} joined room which is: ${data.room}`);
            // console.log(`these are the people who are in this room:  ${JSON.stringify(data.connected)}`);
            // from https://stackoverflow.com/questions/5223/length-of-a-javascript-object, this is similar .length for arrays, but for objects
            let numConnected = Object.keys(data.connected).length;
            // console.log(`the number of people in this room are ${numConnected}`)
            // if there is more than one person connected to this room
            if (numConnected > 1) {
                if (data.who != defineProps()) {
                    // If someone connected while you're online, make sure the user who connected to this room isn't you
                    // then add this person's ID to those who are loggedIn
                    friendLoginManager(data.who, true, room)
                }
                else {
                    // If you are the one that connected, but your friend is already connected...  
                    // (NOT SO SLEEK, BUT THIS IS DOING THE TRICK FOR NOW - ACCESS DB TO FIND OUT WHO THE OTHER PERSON IS THAT IS NOT YOU:
                    axios.get(`/api/peopleinroom/${data.room}`).then(response => {
                        let index;
                        for (let i = 0; i < response.data.people.length; i++) {
                            if (response.data.people[i]._id === defineProps()) {
                                if (i == 0) {
                                    index = 1;
                                }
                                else {
                                    index = 0;
                                }
                            }
                        }
                        let who = response.data.people[index]._id;
                        friendLoginManager(who, true, room);
                    })
                }
            }
        })

        props.socket.on('leftRoom', function (data) {
            // console.log(`someone disconnected, and their id is ${data}`);
            friendLoginManager(data, false)
        })

        const defineProps = () => {
            return this.props.currentUser[1]
        }

        const friendLoginManager = (who, login, room) => {
            if (login) {
                // Log in this friend in your view
                // association of which room belongs to who is here
                this.setState(
                    {
                        loggedInFriends: [...this.state.loggedInFriends, who],
                        loggedInRooms: [...this.state.loggedInRooms, { room: room, who: who }]
                    }, () => console.log(`loggedInfriends are now ${this.state.loggedInFriends}`));
            }
            else {
                // Log out this friend in your view
                if (who != null) {
                    // not mutating state directly, but rather creating a clone then filtering out the person who logged out, returning a new array
                    let cloneForLoggedInFriends = this.state.loggedInFriends;
                    let a = cloneForLoggedInFriends.indexOf(who);
                    cloneForLoggedInFriends.splice(a, 1);

                    // since the loggedInRooms has a room number and a "who", make new array just containing the who so I can find where to splice
                    let cloneForLoggedInRooms = this.state.loggedInRooms;
                    let arr = [];
                    for (let i = 0; i < cloneForLoggedInRooms.length; i++) {
                        arr.push(cloneForLoggedInRooms[i].who);
                    }
                    let b = arr.indexOf(who);
                    cloneForLoggedInRooms.splice(b, 1);

                    this.setState({ loggedInFriends: cloneForLoggedInFriends, loggedInRooms: cloneForLoggedInRooms });
                }
            }
        }

        const notifyOrAdd = (data) => {
            // console.log(`NEW MESSAGE CAME IN from ${data.author.username}, I am chatting with ${this.state.chattingWith}`);
            // console.log(`I am ${this.props.currentUser[0]}`);
            // We're in the same room, and whether or not you or I send a message, socket broadcasts it.  
            // therefore if the author was you or I, add to ongoing messages.  
            if (this.state.chattingWith === data.author.username || this.props.currentUser[0] === data.author.username) {
                addMessage(data)
            }
            else {
                // otherwise, add it to unread messages
                // console.log(`Adding to unread messages`)
                doNotify(data);
            }
        }

        const doNotify = (data) => {
            // console.log(`NOTIFYING MESSAGES ${data}`);
            // You're not chatting with anyone but you got a new message
            this.setState({ unread: [...this.state.unread, { author: data.author.username, message: data.message }] }, () => {
                // console.log(`unread messages are ${this.state.unread}`)

                // X - If the socket is offline, this won't even run
                // If the user is offline, set database field to unread
                // Even if they are online, still do this
                // When the user comes back online and clicks on you, dismiss the unread 
                // axios.put(`/api/hasunread/${data.author.id}`, {unreadFrom: data.author.id}).then(response => console.log(response))

                // Maybe handle from the socket side?  If sending to a room where there aren't two sockets?
            });

        }

        const addMessage = data => {
            // console.log(`ADDING MESSAGES, JSON STRINGIFYING.  NOTE YOU HAVE TO USE THIS IN CHATMODULE ${JSON.stringify(data)}`);
            this.setState({ messages: [...this.state.messages, data] });
        };
    }

    joinRoomsForSocket = () => {
        // THIS FUNCTION IS NECESSARY SUCH THAT USERS CAN START TO RECEIVE NOTIFICATIONS FROM ALL OF THEIR FRIENDS EVEN IF THEY HAVEN'T STARTED 
        // CHATTING WITH THEM.  JOINING THE ROOM ALLOWS FOR THE NOTIFCATIONS via this.socket.on('newMessage), etc.

        for (let i = 0; i < this.state.friendsList.length; i++) {
            // FOR EACH OF YOUR FRIENDS, RUN THIS ROUTE WHICH RETURNS THE ID OF THE CHATROOM BETWEEN YOU AND YOUR FRIEND
            axios.put(`/api/getroom/${this.state.friendsList[i]._id}`, { user: this.props.currentUser[1] }).then(response => {
                // THEN JOIN EACH CHAT ROOM SO YOU CAN RECEIVE MESSAGES RIGHT OFF THE BAT
                let test = { id: this.props.currentUser[1] }
                this.props.socket.emit("join", response.data._id, test);
                // console.log(`you are ${this.props.currentUser[1]}. response here should include offlineUnread (and you) ${JSON.stringify(response.data)}`)
                if (response.data.offlineUnread.includes(this.props.currentUser[1])) {
                    // console.log(`response.data.offlineUnread includes this person`)
                    let whoSentWhileYouWereOffline;
                    let peopleInRoom = [];
                    peopleInRoom = response.data.people;
                    // console.log(`people in room are ${peopleInRoom}`);
                    let ind = peopleInRoom.indexOf(this.props.currentUser[1]);
                    peopleInRoom.splice(ind, 1);
                    whoSentWhileYouWereOffline = peopleInRoom.toString()
                    // console.log(`this is who sent to you while you were offline ${whoSentWhileYouWereOffline}`)
                    this.setState({ offlineSenders: [...this.state.offlineSenders, whoSentWhileYouWereOffline] }, () => {
                        console.log(this.state.friendsList);
                    });
                }
            })
        }
    }

    searchInputHandler = (event) => this.setState({ searchTerm: event.target.value })

    searchHandler = () => {

        if (this.state.searchTerm.length === 0) {
            this.setState({ friendResults: [{ username: "No results- input is blank.", id: null }], searching: true, searchTerm: "" })
        }
        else if (this.state.searchTerm === this.props.currentUser[0]) {
            this.setState({ friendResults: [{ username: "Can't add yourself.", id: null }], searching: true, searchTerm: "" })
        }
        else if (this.state.friendsList.filter((each) => each.username === this.state.searchTerm).some(each => each.username === this.state.searchTerm)) {
            this.setState({ friendResults: [{ username: "Friend already added!", id: null }], searching: true, searchTerm: "" })
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
        // console.log(`loading friends for: ${this.props.currentUser[1]}`);
        axios.get(`/api/loadfriends/${this.props.currentUser[1]}`).then(response => {
            // if a new user, the response.data array will have zero length, preventing access of data.  conditional below handles that
            if (response.data.length === 0) {
                return;
            }
            else {
                // console.log(`querying for friends returns ${response.data[0].friends}`);
                this.setState({ friendsList: response.data[0].friends, friendsLoaded: true }, () => {
                    // console.log(`friendslist in state is ${this.state.friendsList}`)
                    this.clearResults();
                    this.joinRoomsForSocket();
                });
            }
        })
    }

    addFriend = (id) => {
        console.log(`*** BUG SHOULD BE HERE- ADDING FRIEND with ID of ${id}`);
        console.log(`*** right here, it seems that this.props.currentUser[1] is my password ${this.props.currentUser[1]}`)
        axios.put(`/api/addusers/${id}`, { userID: this.props.currentUser[1] }).then(response => {
            console.log(`*** ROUTE WORKED, ADDED USER, RESPONSE IS ${JSON.stringify(response)}`);
            this.loadFriends();
        });
    };

    componentDidMount = () => {
        // I think I can extend this usage for componentdidupdate for when people log on and off (hopefully server broadcasts to this component
        // causing a rerender?)
        if (this.props.loggedIn) {
            this.loadFriends();
        }
        window.addEventListener('beforeunload', this.hardDisconnect());
    }

    componentDidUpdate = () => {
        if (this.props.loggedIn === false && this.state.friendsLoaded === true) {
            this.setState({ friendsLoaded: false, chat: false }, () => {
            });
        }
        if (this.props.loggedIn === true && this.state.friendsLoaded === false) {
            this.loadFriends();
        }
    }

    componentWillUnmount = () => {
        // basically, componentWillUnmount functions as I expect it to only when the stackoverflow post is followed
        this.hardDisconnect();
        // https://stackoverflow.com/questions/39084924/componentwillunmount-not-being-called-when-refreshing-the-current-page
        window.removeEventListener('beforeunload', this.hardDisconnect())
    }

    hardDisconnect = () => {
        this.props.socket.emit(`leaveRoom`, this.props.currentUser[1])
        // do not need hard disconnect (socket.disconnect) here- already have it in app.js
    }
    loadChatHistory = (chatroom) => {
        axios.get(`/api/chathistory/${chatroom}`).then(response => {
            this.setState({ messages: response.data.messages });
        });
    }

    openFriend = (action, username, id) => {
        if (action === "open" && !this.state.chat) {
            this.setState({ chat: true, chattingWith: username, chattingWithID: id, messages: [] }, () => {
                this.props.provideFriendInfo(username, id);
                // console.log(`I am now chatting with ${this.state.chattingWith}`);
                // console.log(`friendsModule.js: we are trying to make a new chatroom and your friend's id is ${id}, *** AND I AM ${this.props.currentUser[1]}`)
                // 7/14/2020 with implementation of joinRoomsForSocket, may not need to call api again but use data locally if I decide to store it.
                axios.put(`/api/getroom/${id}`, { user: this.props.currentUser[1] }).then(response => {
                    // response from backend should give a mongo id of the chatroom.  what was fed into this route though
                    // are both yours and your friends' ID's which get sorted into a unified string 
                    // console.log(`*** friendsModule.js: the chatroom response is ${response}, the id is ${response.data._id}`);
                    this.setState({ chatroomID: response.data._id, chatroomName: response.data.name, chatReady: true }, () => {
                        this.loadChatHistory(response.data._id);
                    });
                    // this filters the unread array and returns an array with other people who you haven't read yet.
                    this.setState(state => ({ unread: state.unread.filter(each => each.author != username) }))
                    if (this.state.offlineSenders.includes(id)) {
                        console.log(`route for clearing the offline unread triggered`)
                        this.setState(state => ({ offlineSenders: state.offlineSenders.filter(each => each != id) }), () => {
                            // no req.body below because I'm simply clearing the offlineSender in the route
                            axios.put(`/api/clearofflineunread/${response.data._id}`).then(response => console.log(response.data));
                        })
                    }
                })
            });
        }
        else if (action === "open" && this.state.chat) {
            this.setState({ chat: false, chattingWith: "", chattingWithID: "", chatroomID: "", messages: [] }, () => {
                this.openFriend("open", username, id)
            });
        }
        else {
            this.setState({ chat: false, chattingWith: "", chattingWithID: "", chatroomID: "", messages: [] }, () => {
                this.props.closeFriend();
            });
        }
    }

    render() {
        const props = this.props
        return (
            <>
                {props.loggedIn === true ?
                    <>
                        <div className="friendsOverlord">
                            {this.state.chat && this.state.chatReady ?
                                <ChatModule
                                    chattingWith={this.state.chattingWith}
                                    chattingWithID={this.state.chattingWithID}
                                    closeBox={this.openFriend}
                                    currentUser={this.props.currentUser}
                                    chatroomID={this.state.chatroomID}
                                    chatroomName={this.state.chatroomName}
                                    socket={this.props.socket}
                                    messages={this.state.messages}
                                    loggedInRooms={this.state.loggedInRooms}
                                    mobile={this.props.mobile}
                                    loadFriends={this.loadFriends}
                                >
                                </ChatModule>
                                :
                                <></>}
                            <div className="containerForFriends" style={this.state.chat && this.props.mobile ? {width: "40%"} : {width: "90%"}}>
                            {props.currentUser.length === 0 ? <></> :
                            <>
                                <span className="welcome">Welcome, {props.currentUser[0]}!</span>
                                <hr></hr>
                                </>
                            }
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
                                                <>
                                                <p className="theFriends" onClick={() => this.openFriend("open", each.username, each._id)}>
                                                    <i class={this.state.loggedInFriends.includes(each._id) ? "material-icons online" : "material-icons offline"}>lens</i>{each.username}
                                                    {/* unread is an array, filter it down to an array where author names are present.
                                            if this array includes username, and if this array includes username, render message icon */}
                                                    {this.state.unread.filter((name) => name.author === each.username).some((ehhh) => ehhh.author === each.username) ? <i class="material-icons" style={{ color: "white" }}>message</i> : <></>}
                                                    {this.state.offlineSenders.filter((who) => who === each._id).some((heh) => heh === each._id) ? <i class="material-icons" style={{ color: "white" }}>markunread</i> : <></>}

                                                    <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/partyparrot.gif"></img>
                                                    </p></>
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
                                                    <>
                                                    <p className="whiteText">{each.username}</p>
                                                    <p>{each.id != null ? <button class="addButtons" onClick={() => this.addFriend(each.id)}>Add</button> : <></>}
                                                    <button class="addButtons"  onClick={this.clearResults}>Clear</button></p>
                                                    </>)}
                                            </>}
                                        </> : <></>}
                                </div>
                            </div>
                        </div></> : <></>}
            </>
        )
    }
}

export default Friends;