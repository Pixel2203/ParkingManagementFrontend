import {Dispatch, ReactElement, SetStateAction} from "react";
import {AlertColor} from "@mui/material";
import {getTimeAsString} from "@/utils/TimeDateHandler";


// Backend Requests
export interface UserRequest {
    user: userData
}
export interface BookingRequest {
    startDateInMilliseconds: number,
    endDateInMilliseconds: number,
    user: userData,
    sensorId: number

}
// Backend Responses
type ResponseObject = {
    message: string,
    worked: boolean
}
export type ParkingRecommendationResponse = ResponseObject & {
    tickets:Record<number, Array<RecommendationTicket>>
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
export type FullUserResponse = ResponseObject & {
    user: userData
}

// Components
export interface SnackbarComponent {
    displaySnackbar: (content:ReactElement) => void
}
export interface BookingHandlerDTO {
    setCurrentDateObject: Dispatch<SetStateAction<Date | undefined>>,
    currentDateObject: Date | undefined
    setFutureDateObject: Dispatch<SetStateAction<Date | undefined>>,
    futureDateObject: Date |undefined
}
export interface BookingHandlerConfig {
    timeConfig?: {
        startDateInMillis: number,
    },
    options? : {
        enableDatePicker: boolean
        allowPastTimes: boolean
    }
}
export interface TimeInputComponent  {
    setStartTime: (time:number) => void,
    updatedValue: string,
    isToday: boolean
}

// Datatypes
export type userData = {
    id?: number
    prename: string,
    name: string,
    plate: string,
    brand: string,
    model?: string | undefined,
    company: string,
    email: string,
    telephone: string,
    penalties?: number
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
export type parkingOverview = {
    parking_lots: Array<sensorData>
}
type Ticket = {
    name: string,

}
export type ParkingTicket = Ticket & {

    id: number,
    startDate: Date,
    endDate: Date,
    plate: string
}
export type RecommendationTicket = Ticket & {
    name: string,
    bookingId: 0 | 9999,
    startDate: number,
    endDate: number,
    plate: null
}




export interface Booking {
    id:number,
    startDate:number,
    endDate:number,
    plate:string
}


export interface BookingFilterObject {
    dateFilter : {
        selectedDate: Date
    }
}

