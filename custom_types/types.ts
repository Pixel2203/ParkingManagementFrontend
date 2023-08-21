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
export interface parkingRequestResponse {
    message: string,
    severity: AlertColor
}

export type parkData = {
    id: number,
    name: string,
    used: boolean

}
export type customDateObject = {
    day: string,
    month: string,
    year: string,
    minute: string,
    hour: string
}
export interface parkingOverview {
    parking_lots: Array<parkData>
}