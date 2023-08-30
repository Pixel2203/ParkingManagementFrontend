import {
    BookingRequest,
    FullSensorDataResponse,
    userData,
    BookingResponse,
    BookingListResponse,
    ParkingRecommendationResponse
} from "../../utils/types";


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
export function getFutureBookingsByPlate(plate:string):Promise<BookingListResponse> {
    return fetch("http://localhost:8080/futurebookings?plate=" + plate).then(res => res.json());
}
export function getBookingHistoryByPlate(plate:string):Promise<BookingListResponse> {
    return fetch("http://localhost:8080/bookinghistory?plate=" + plate).then(res => res.json());
}
export function getBookingRecommendations(startDate: Date, duration:number):Promise<ParkingRecommendationResponse> {
    return fetch("http://localhost:8080/recommendations?startDate=" + startDate.getTime() + "&duration=" + duration).then(res => res.json());
}