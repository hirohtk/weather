import React from 'react';
import "./friendsmodule.css"

class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    

    render() {
        const props = this.props
        return (
            <>
                {props.loggedIn === "true" ? <div className="friendsOverlord">
                    <div className="containerForFriends">
                    <div className="friends-gradient"></div>
                        {/* Will become a .map to list friends here */}
                        <p className="theFriends"><i class="material-icons offline">lens</i>Friend 1 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/sleepingparrot.gif"></img> </p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 2 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/partyparrot.gif"></img></p>
                        <p className="theFriends"><i class="material-icons online">lens</i>Friend 3 <img className="tinyFriendPic" src="https://cultofthepartyparrot.com/parrots/hd/shuffleparrot.gif"></img></p>
                    </div>
                </div> : <></>}
            </>
        )
    }
}

export default Friends;