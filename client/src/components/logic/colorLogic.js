export function colorLogic(dayOfWeek) {

    const colorDayArray = ["yellow", "pink", "green", "orange", "blue", "indigo", "purple"]

        switch (dayOfWeek) {
            case "Monday": 
            return {borderColor: colorDayArray[0]};
            case "Tuesday": 
            return {borderColor: colorDayArray[1]};
            case "Wednesday": 
            return {borderColor: colorDayArray[2]};
            case "Thursday": 
            return {borderColor: colorDayArray[3]};
            case "Friday": 
            return {borderColor: colorDayArray[4]};
            case "Saturday": 
            return {borderColor: colorDayArray[5]};
            case "Sunday": 
            return {borderColor: colorDayArray[6]};
            default: return "white"
        }
}