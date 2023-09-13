import {
    BookingRequest,
    FullSensorDataResponse,
    userData,
    BookingResponse,
    BookingListResponse,
    ParkingRecommendationResponse, FullUserResponse, UserRequest
} from "./types";


export function getAllSensorData():Promise<FullSensorDataResponse | undefined> {
    return fetch("http://localhost:8080/sensors").then(response => response.json()).catch(reason => {
        return undefined;
    });

}
export function sendBookingRequest(currentDate: Date,futureDate:Date, userData:userData, sensorId:number):Promise<BookingResponse> {
    const requestData: BookingRequest = {
        startDateInMilliseconds: currentDate.getTime(),
        endDateInMilliseconds: futureDate.getTime(),
        user: userData,
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

export function getBookingsBySensorAndDate(sensorId:number, date:Date):Promise<BookingListResponse | null> {
    return fetch("http://localhost:8080/bookings?sensorId=" + sensorId + "&dateInMilliseconds=" + date.getTime()).then(response => response.json()).catch(reason => {
        return undefined;
    });
}
export function getFutureBookingsByPlate(plate:string):Promise<BookingListResponse | null> {
    return fetch("http://localhost:8080/futurebookings?plate=" + plate).then(res => res.json()).catch(reason => {
        return undefined;
    });
}
export function getBookingHistoryByPlate(plate:string):Promise<BookingListResponse | null> {
    return fetch("http://localhost:8080/bookinghistory?plate=" + plate).then(res => res.json()).catch(reason => {
        return undefined;
    });
}
export function getBookingRecommendations(startDate: Date, duration:number):Promise<ParkingRecommendationResponse | null> {
    return fetch("http://localhost:8080/recommendations?startDate=" + startDate.getTime() + "&duration=" + duration).then(res => res.json()).catch(reason => {
        return undefined;
    });
}
export function checkUserService(user:userData):Promise<FullUserResponse | null> {
    const request:UserRequest = {
        user: user
    }
    return fetch("http://localhost:8080/connect", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    }).then(res => res.json());
}