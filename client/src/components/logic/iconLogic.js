import Sun from "./icons/sun.js";
import Clouds from "./icons/clouds.js"
import Flurries from "./icons/flurries.js"
import Rainie from "./icons/rainie.js"
import Sunrain from "./icons/sunrain.js"
import Thunder from "./icons/thunder.js"

export function iconLogic(condition) {

    const conditions = {
        sunny: <Sun></Sun>,
        cloudy: <Clouds></Clouds>,
        snowy: <Flurries></Flurries>,
        rainy: <Rainie></Rainie>,
        mixed: <Sunrain></Sunrain>,
        thunder: <Thunder></Thunder>
    }

    switch (condition) {
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
    }
}