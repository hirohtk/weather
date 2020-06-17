import React from 'react';
import "./friendsmodule.css";
import axios from "axios";

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        }
    }

    searchInputHandler = (event) => this.setState({searchTerm: event.target.value})

    searchHandler = () => {
        axios.get(`/api/allusers/${this.state.searchTerm}`).then(response => {
            console.log(response.data);
        })
    }

    render() {
        const props = this.props
        return (
            <>
                {props.loggedIn === true ? <div className="friendsOverlord">
                    <div className="containerForFriends">
                        {/* Will become a .map to list friends here */}
                        <p className="theFriends"><i class="material-icons offline">lens</i>Friend 1 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/sleepingparrot.gif"></img> </p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 2 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/partyparrot.gif"></img></p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 3 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/shuffleparrot.gif"></img></p>
                        <div className="searchForFriends">
                        <input placeholder="Search for a user!" name="searchTerm" value={this.state.searchTerm} maxLength="16" onChange={this.searchInputHandler}></input>
                        <button id="loginSubmit" onClick={this.searchHandler}>Go!</button>
                        </div>
                    </div>

                </div> : <></>}
            </>
        )
    }
}

export default Friends;