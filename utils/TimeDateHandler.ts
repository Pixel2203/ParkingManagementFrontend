import {CustomDateObject} from "@/utils/types";

export const getDateAsString = (date:Date | undefined):string => {
    if(!date){
        return "";
    }
    const customDate:CustomDateObject = getFullDate(date);
    return `${customDate.day}.${customDate.month}.${customDate.year}`
}
export const getTimeAsString = (date:Date | undefined):string => {
    if(!date){
        return "";
    }
    const customDate:CustomDateObject = getFullDate(date);
    return `${customDate.hour}:${customDate.minute}`;
}
export const getFullDate = (currentTime: Date):CustomDateObject => {

    let year:string = currentTime.getFullYear().toString();


    let day:string = currentTime.getDate().toString();
    let month:string = (currentTime.getMonth()+1).toString();
    let hour:string = currentTime.getHours().toString();
    let minute:string = currentTime.getMinutes().toString();
    if(day.length == 1){
        day = "0" + day;
    }
    if(month.length == 1){
        month = "0" + month;
    }
    if(hour.length == 1){
        hour = "0" + hour;
    }
    if(minute.length == 1){
        minute = "0" + minute;
    }
    return {
        day: day,
        month: month,
        year: year,
        hour: hour,
        minute:minute
    }
}

export const putIntoDateCorrectDateFormat = (date:Date):string => {
    const myDate = getFullDate(date);
    const returnString = myDate.year+"-"+myDate.month+"-"+myDate.day;
    return  returnString;
}
export const getFutureDate = (currentTime:Date, timeDiffInMinutes: any):Date => {
    const hours = parseInt((timeDiffInMinutes / 60).toString().slice(0,1));
    const minutes = timeDiffInMinutes % 60;

    const futureTime = new Date(currentTime.getTime());
    futureTime.setHours(currentTime.getHours() + hours);
    futureTime.setMinutes(currentTime.getMinutes() + minutes);
    return futureTime;
}