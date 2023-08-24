import {ReactElement} from "react";
import {AlertColor} from "@mui/material";

export interface SnackbarComponent {
    displaySnackbar: (content:ReactElement) => void
}

export interface userData {
    prename: string,
    name: string,
    plate: string,
    brand: string,
    model: string | null,
    company: string,
    email: string,
    telephone: string
}

export type sensorData = {
    id: number,
    name: string,
    status: boolean,
    bookable: boolean

}
export type customDateObject = {
    day: string,
    month: string,
    year: string,
    minute: string,
    hour: string
}
export interface parkingOverview {
    parking_lots: Array<sensorData>
}
export type ResponseObject = {
    message: string,
    worked: boolean
}
export interface ParkingTicket {

    name: string,
    bookingId: number,
    startDate: Date,
    endDate: Date,
    plate: string
}
export type BookingResponse = ResponseObject & {
    parkingTicket: ParkingTicket
}
export type BookingListResponse = ResponseObject & {
    bookingList: Array<Booking>
}
export type FullSensorDataResponse = ResponseObject & {

    sensors: Array<sensorData> | null
}
export interface Booking {
    id:number,
    startDate:number | Date,
    endDate:number | Date,
    plate:string
}
export interface BookingRequest {
    startDateInMilliseconds: number,
    endDateInMilliseconds: number,
    userData: userData,
    sensorId: number

}