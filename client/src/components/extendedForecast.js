import React from 'react';
import "./extendedForecast.css"
// import { PromiseProvider } from 'mongoose';
import {colorLogic} from "./logic/colorLogic";
import {iconLogic} from "./logic/iconLogic";

// Component is stateful yet receives props from App.js  

// React provides a way to get references to DOM nodes by using React.createRef(). 
// It’s really just an equivalent of this all-too-familiar snippet of JavaScript:
// document.getElementById('foo-id');

// state and handlers taken from https://medium.com/@eymaslive/scrolling-by-dragging-react-js-reusable-component-2b79e936b41c

class ExtendedForecast extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef()
        this.state = {
            isScrolling: false,
            clientX: 0,
            scrollX: 0,
        }
    }

    onMouseDown = e => {
        this.setState({ ...this.state, isScrolling: true, 
         clientX: e.clientX });
      };
    
      onMouseUp = () => {
        this.setState({ ...this.state, isScrolling: false });
      };
    
      onMouseMove = e => {
        const { clientX, scrollX } = this.state;
        if (this.state.isScrolling) {
          this.ref.current.scrollLeft = scrollX - e.clientX + clientX;
          this.state.scrollX = scrollX - e.clientX + clientX;
          this.state.clientX = e.clientX;
        }
      };

      onMouseLeave = e => {
          this.setState({...this.state, isScrolling: false});
      }

    render() {
        const props = this.props;
        return (
<>
            <div className="outerForecastBox">
                <h5 className="whiteText">Extended Forecast</h5>
                <div className="forecastBox">
                    <div className="row">
                        <div id="forecastOptions" className="whiteText">
                            <div className="col l6">
                                <div className={props.hovered === "hourly" ? "hover forecastButton" : "forecastButton"} data-name="hourly" onClick={props.changeForecast}
                                    onMouseEnter={props.handleHover}
                                    onMouseLeave={props.handleHover}>
                                    Hourly
                                </div>
                            </div>
                            <div className="col l6">
                                <div className={props.hovered === "fiveDay" ? "hover forecastButton" : "forecastButton"} data-name="fiveDay" onClick={props.changeForecast}
                                    onMouseEnter={props.handleHover}
                                    onMouseLeave={props.handleHover}>
                                    4 Day
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div id={props.forecastChosen === "hourly" ? "forecastResults" : ""} className="whiteText"
                        ref={this.ref}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        onMouseMove={this.onMouseMove}
                        onMouseLeave={this.onMouseLeave}
                        >
                            {props.forecastChosen === "hourly" ?
                                props.hourlyResults.map((each) => ( 
                                    <div className="forecastDayHourly" style={colorLogic(each.dayOfWeek)} >
                                        <h5>{each.dayOfWeek}, {each.time}</h5>
                                        <p>{each.date}</p>
                                        <p>Temperature: {each.tempF}F</p>
                                        <p>Rain Probability: {each.rainProbability}%</p>
                                        <p>{each.condition}</p>
                                        <span>{iconLogic(each.condition)}</span>
                                    </div>
                                ))
                                : props.forecastChosen === "extended" ?
                                    props.forecastResults.map((each) => (
                                        <div className="col l3 forecastDayExtended" style={colorLogic(each.dayOfWeek)}>
                                            <h5>{each.dayOfWeek}, {each.date}</h5>
                                            <p>Average Temperature: {each.avgTempF}F</p>
                                            <p>Rain Probability: {each.rainProbability}%</p>
                                            <p>{each.condition}</p>
                                            <span>{iconLogic(each.condition)}</span>
                                        </div>
                                    )) : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

// function ExtendedForecast(props) {

//     return (
//         <>
//             <div className="outerForecastBox">
//                 <h5 className="whiteText">Extended Forecast</h5>
//                 <div className="forecastBox">
//                     <div className="row">
//                         <div id="forecastOptions" className="whiteText">
//                             <div className="col l6">
//                                 <div className={props.hovered === "hourly" ? "hover forecastButton" : "forecastButton"} data-name="hourly" onClick={props.changeForecast}
//                                     onMouseEnter={props.handleHover}
//                                     onMouseLeave={props.handleHover}>
//                                     Hourly
//                                 </div>
//                             </div>
//                             <div className="col l6">
//                                 <div className={props.hovered === "fiveDay" ? "hover forecastButton" : "forecastButton"} data-name="fiveDay" onClick={props.changeForecast}
//                                     onMouseEnter={props.handleHover}
//                                     onMouseLeave={props.handleHover}>
//                                     4 Day
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div id={props.forecastChosen === "hourly" ? "forecastResults" : ""} className="whiteText">
//                             {props.forecastChosen === "hourly" ?
//                                 props.hourlyResults.map((each) => ( 
//                                     <div className="forecastDayHourly" style={colorLogic(each.dayOfWeek)}>
//                                         <h5>{each.dayOfWeek}, {each.time}</h5>
//                                         <p>{each.date}</p>
//                                         <p>Temperature: {each.tempF}F</p>
//                                         <p>Rain Probability: {each.rainProbability}%</p>
//                                         <p>{each.condition}</p>
//                                         <span>{iconLogic(each.condition)}</span>
//                                     </div>
//                                 ))
//                                 : props.forecastChosen === "extended" ?
//                                     props.forecastResults.map((each) => (
//                                         <div className="col l3 forecastDayExtended" style={colorLogic(each.dayOfWeek)}>
//                                             <h5>{each.dayOfWeek}, {each.date}</h5>
//                                             <p>Average Temperature: {each.avgTempF}F</p>
//                                             <p>Rain Probability: {each.rainProbability}%</p>
//                                             <p>{each.condition}</p>
//                                             <span>{iconLogic(each.condition)}</span>
//                                         </div>
//                                     )) : ""
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

export default ExtendedForecast;