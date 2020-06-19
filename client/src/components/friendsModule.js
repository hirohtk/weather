import React from 'react';
import "./friendsmodule.css";
import axios from "axios";

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            friendResults: [],
            searching: false,
        }
    }

    searchInputHandler = (event) => this.setState({ searchTerm: event.target.value })

    clearResults = () => this.setState({ friendResults: [], searching: false });

    addFriend = (id) => {
        console.log(`adding friend, their id is ${id}`);
        console.log(`my id is ${this.props.user[1]}`);
        axios.put(`/api/addusers/${id}`, {userID: this.props.user[1]}).then(response => {
            console.log(`I need at least the username from this response to set in state ${response}`);
        });
    };

    searchHandler = () => {
        axios.get(`/api/allusers/${this.state.searchTerm}`).then(response => {
            console.log(response.data);
            if (response.data.length === 0) {
                this.setState({ friendResults: [] });
            }
            else {
                this.setState({ friendResults: [{username: response.data[0].username, id: response.data[0]._id}] });
            }
            this.setState({ searching: true });
        })
    }

    componentDidMount = () => {
        
    }

    render() {
        const props = this.props
        return (
            <>
                {props.loggedIn === true ? <div className="friendsOverlord">
                    <div className="containerForFriends">
                    <div className="friends-gradient"></div>
                        {/* Will become a .map to list friends here */}
                        {}
                        <p className="theFriends"><i class="material-icons offline">lens</i>Friend 1 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/sleepingparrot.gif"></img> </p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 2 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/partyparrot.gif"></img></p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 3 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/shuffleparrot.gif"></img></p>
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
                                            <p className="whiteText">{each.username}<button onClick={this.addFriend(each.id)}>Add</button></p>)}
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