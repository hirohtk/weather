import React from 'react';
import "./extendedForecast.css"
// import { PromiseProvider } from 'mongoose';
import { colorLogic } from "./logic/colorLogic";
import { iconLogic } from "./logic/iconLogic";

// Component is stateful yet receives props from App.js  

// React provides a way to get references to DOM nodes by using React.createRef(). 
// It’s really just an equivalent of this all-too-familiar snippet of JavaScript:
// document.getElementById('foo-id');

// state and handlers taken from https://medium.com/@eymaslive/scrolling-by-dragging-react-js-reusable-component-2b79e936b41c

class ExtendedForecast extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.locationRefsHourly = [];
        this.locationRefsExtended = [];
        this.state = {
            isScrolling: false,
            clientX: 0,
            scrollX: 0,
            forecastChosen: ""
        }
    }

    onMouseDown = e => {
        this.setState({
            ...this.state, isScrolling: true,
            clientX: e.clientX
        });
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
        this.setState({ ...this.state, isScrolling: false });
    }

    styles = (probability) => {
        let math = (probability).toString() + "px";
        let bottom = { bottom: math }
        return bottom;
    }

    changeForecast = (event) => {

        if (event.target.dataset.name === "hourly") {
            console.log("changing forecast to hourly")
            this.setState({ forecastChosen: "hourly" }, ()  => this.getPointCoords("hourly"));
        }
        else if (event.target.dataset.name === "fiveDay") {
            console.log("changing forecast to extended")
            this.setState({ forecastChosen: "extended" }, ()  => this.getPointCoords("extended"));
        }
        
    }

    getPointCoords = (which) => {
        let references;
        if (which === "hourly") {
            references = this.locationRefsHourly;
        }
        else {
            references = this.locationRefsExtended;
        }
        // 1.  use of refs are set by following this https://stackoverflow.com/questions/54314945/reactjs-how-to-use-ref-inside-map-function
        // Q? What is the ref param in the function actually representing?  
        // 2.. next step use the ref to identify each element so I can do this https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
        // 3.  last, with the coordinates of each element, map some lines using this https://stackoverflow.com/questions/19382872/how-to-connect-html-divs-with-lines
        console.log(`this.locationrefs is ${references}`)
        console.log(references.length);
        console.log(`this should be a loop giving me a bunch of coordinates`)
        for (let i = 0; i < references.length; i++) {
            console.log(`i is ${i}`);
            let rect = references[i].getBoundingClientRect();
            console.log(rect.top, rect.right, rect.bottom, rect.left);
            // WHAT THIS RETURNS IS (see diagram): https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect    
        }
    }

    componentDidUpdate() {

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
                                    <div className={props.hovered === "hourly" ? "hover forecastButton" : "forecastButton"} data-name="hourly" onClick={this.changeForecast}
                                        onMouseEnter={props.handleHover}
                                        onMouseLeave={props.handleHover}>
                                        Hourly
                                </div>
                                </div>
                                <div className="col l6">
                                    <div className={props.hovered === "fiveDay" ? "hover forecastButton" : "forecastButton"} data-name="fiveDay" onClick={this.changeForecast}
                                        onMouseEnter={props.handleHover}
                                        onMouseLeave={props.handleHover}>
                                        4 Day
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div id={this.state.forecastChosen === "hourly" ? "forecastResults" : ""} className="whiteText"
                                ref={this.ref}
                                onMouseDown={this.onMouseDown}
                                onMouseUp={this.onMouseUp}
                                onMouseMove={this.onMouseMove}
                                onMouseLeave={this.onMouseLeave}
                            >
                                {this.state.forecastChosen === "hourly" ?
                                    props.hourlyResults.map((each, index) => (
                                        <div className="forecastDayHourly" style={colorLogic(each.dayOfWeek)} >
                                            <h5 className="pClassNewFont">{each.dayOfWeek}, {each.time}</h5>
                                            <p className="pNewFontSize">{each.date}</p>
                                            <p className="pNewFontSize">Temperature: {each.tempF}F</p>
                                            <p className="pNewFontSize">{each.condition}</p>
                                            <span>{iconLogic(each.condition)}</span>
                                            <div className="tempGraphBox">
                                                <div className="temperatureDot" style={this.styles(each.rainProbability)}
                                                    ref={ref => this.locationRefsHourly[index] = ref}>'</div>
                                            </div>
                                            <p>Rain: {each.rainProbability}%</p>
                                        </div>
                                    ))
                                    : this.state.forecastChosen === "extended" ?
                                        props.forecastResults.map((each, index) => (
                                            <div className="col l3 forecastDayExtended" style={colorLogic(each.dayOfWeek)}>
                                                <h5 className="pClassNewFont">{each.dayOfWeek}, {each.date}</h5>
                                                <p className="pNewFontSize">Average Temperature: {each.avgTempF}F</p>
                                                <p className="pNewFontSize">{each.condition}</p>
                                                <span>{iconLogic(each.condition)}</span>
                                                <div className="tempGraphBox">
                                                    <div className="temperatureDot" style={this.styles(each.rainProbability)}
                                                        ref={ref => this.locationRefsExtended[index] = ref}>'</div>
                                                </div>
                                                <p>Rain: {each.rainProbability}%</p>
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