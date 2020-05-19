import React from "react";
import Sun from "../icons/sun.js";
import Clouds from "../icons/clouds.js"
import Flurries from "../icons/flurries.js"
import Rainie from "../icons/rainie.js"
import Sunrain from "../icons/sunrain.js"
import Thunder from "../icons/thunder.js"

export function iconLogic(condition) {

    const conditions = {
        sunny: <Sun></Sun>,
        cloudy: <Clouds></Clouds>,
        snowy: <Flurries></Flurries>,
        rainy: <Rainie></Rainie>,
        mixed: <Sunrain></Sunrain>,
        thunder: <Thunder></Thunder>
    }
    // This "pooler" function pools together the many weather conditions that the API has.  As a basic and first example, if there is rain anywhere
    // in the condition, going to return Rainy to the switch that returns the rainy icon.  Function is necessary because there are more
    // API weather conditions than icons at the moment.

    let pooler = (condition) => {
        if (condition.includes("rain")) {
            return "Rainy";
        }
        else {
            return "";
        }
        
    }

    switch (pooler(condition)) {
        case "Sunny":
        return conditions.sunny;
        case "Cloudy":
        return conditions.cloudy;
        case "Snowing":
        return conditions.snowy;
        case "Rainy":
        return conditions.rainy;
        case "Partly cloudy":
        return conditions.mixed;
        case "Thunderstorm":
        return conditions.thunder;
        default: return <p>No icon</p>
    }
}