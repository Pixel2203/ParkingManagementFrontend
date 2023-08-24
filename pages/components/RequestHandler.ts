import {
    BookingRequest,
    customDateObject,
    FullSensorDataResponse,
    sensorData,
    ResponseObject, userData, BookingResponse, BookingListResponse
} from "../../utils/types";
import {min} from "@popperjs/core/lib/utils/math";
import {ReactElement} from "react";


export function getAllSensorData():Promise<FullSensorDataResponse> {
    return fetch("http://localhost:8080/sensors").then(response => response.json());
}
export function sendBookingRequest(currentDate: Date,futureDate:Date, userData:userData, sensorId:number):Promise<BookingResponse> {
    const requestData: BookingRequest = {
        startDateInMilliseconds: currentDate.getTime(),
        endDateInMilliseconds: futureDate.getTime(),
        userData: userData,
        sensorId: sensorId
    }
    return fetch("http://localhost:8080/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            requestData
        )
    }).then(result => result.json())
}

export function getBookingsBySensorAndDate(sensorId:number, date:Date):Promise<BookingListResponse> {
    return fetch("http://localhost:8080/bookings?sensorId=" + sensorId + "&dateInMilliseconds=" + date.getTime()).then(response => response.json());
}