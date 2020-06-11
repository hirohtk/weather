import React from 'react';
import moment from "moment";
import "./clock.css";

class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      now: ""
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({now: moment().format('h:mm:ss a')});
    }, 1000);
  }

  render() {
    return (
      <>
      <div className="timeDiv">
        <h5 className="timeNow">{this.state.now}</h5>
      </div>
      </>
    )
  }
}

export default Clock;