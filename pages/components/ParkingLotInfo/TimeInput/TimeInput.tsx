import {ReactElement, useEffect, useState} from "react";
import {CustomDateObject} from "@/utils/types";
import {Simulate} from "react-dom/test-utils";
import timeUpdate = Simulate.timeUpdate;
import {getTimeAsString} from "@/utils/TimeDateHandler";

export default function ({timeComponent} : {timeComponent: any}) :ReactElement {
    const handleTimeChange = (event: any) => {
            const inputValue = event.target.value;
            if(timeComponent.isToday){

                const [minHours,minMinutes] = getTimeAsString(new Date()).split(":");
                const minSum = Number(minHours) * 60 + Number(minMinutes);
                const [inputHours,inputMinutes] = inputValue.split(":");
                const currentSum = Number(inputHours) * 60 + inputMinutes;
                if(minSum < currentSum){
                    timeComponent.setStartTime(inputValue)
                    return;
                }
            }
            timeComponent.setStartTime(inputValue)


    }
    useEffect(() => {
        timeComponent.setStartTime(timeComponent.updatedValue)
    }, [])

    return (
        <>
            <input type={"time"}  onChange={handleTimeChange} placeholder={"HH:MM"} defaultValue={timeComponent.updatedValue}/>
        </>
    )
}