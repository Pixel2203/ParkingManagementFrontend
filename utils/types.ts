import {Dispatch, ReactElement, SetStateAction} from "react";
import {AlertColor} from "@mui/material";
import {getTimeAsString} from "@/utils/TimeDateHandler";



// Datatypes
type Timestamp = {
    startDate:number,
    endDate:number,
}
type Schedule = {
    id: number,
    plate:string
}
export type User = {
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
export type Sensordata = {
    id: number,
    name: string,
    status: boolean,
    bookable: boolean

}
export type CustomDateObject = {
    day: string,
    month: string,
    year: string,
    minute: string,
    hour: string
}
export type ParkingOverview = {
    parking_lots: Array<Sensordata>
}
export type ParkingTicket = Schedule & {
    name: string
    startDate: Date,
    endDate: Date,
}
export type RecommendationTicket = Timestamp & {
    bookingId: 0 | 9999,
    plate: null,
    name: string,
    sensorId:number
}
export type Booking = Timestamp & Schedule & {
    name: string
}



// Backend Requests
export interface UserRequest {
    user: User
}
export type BookingRequest = Timestamp & {
    user: User,
    sensorId: number

}


// Backend Responses
type ResponseObject = {
    message: string,
    worked: boolean
}
export type FullScheduleDataResponse = ResponseObject & {
    tickets:Record<number, Array<RecommendationTicket>>
}
export type FullBookingResponse = ResponseObject & {
    parkingTicket: ParkingTicket
}
export type FullBookingListResponse = ResponseObject & {
    bookingList: Array<Booking>
}
export type FullSensorDataResponse = ResponseObject & {

    sensors: Array<Sensordata> | null
}
export type FullUserResponse = ResponseObject & {
    user: User
}
export type FullRecommendationResponse = ResponseObject & {
    tickets: Array<RecommendationTicket>
}



// Components
export interface SnackbarComponent {
    displaySnackbar: (content:ReactElement) => void
}
export interface BookingHandlerDTO {
    setCurrentDateObject: Dispatch<SetStateAction<Date | undefined>>,
    currentDateObject: Date | undefined
    setFutureDateObject: Dispatch<SetStateAction<Date | undefined>>,
    futureDateObject: Date |undefined,
    setShowUnallowed: (allowed: boolean) => void
}
export interface BookingHandlerConfig {
    timeConfig?: {
        startDate: Date,
        endDate: Date
    },
    options? : {
        enableDatePicker: boolean
        allowPastTimes: boolean
        disableBookingHandler: boolean,
        disableSchedule: boolean
    }
}
export interface TimeInputComponent  {
    setStartTime: (time:number) => void,
    updatedValue: string,
    isToday: boolean
}
export interface BookingFilterObject {
    dateFilter : {
        selectedDate: Date
    }
}






