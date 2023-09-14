import {Alert} from "@mui/material";
import {ReactElement} from "react";

export const NO_SERVER_FOUND_TEXT:string = "Konnte Server nicht finden!"
export const ERROR_NOT_WORKED_RECOMMENDATIONS_TEXT:string = "Konnte keine Empfehlungen laden!"
export const ERROR_NO_DATA:string = "Konnte Daten nicht laden!";
export const SUCCESS_LOGGED_IN:string = "Erfolgreich angemeldet!";
export const ERROR_ACCOUNT_SUSPENDED:string = "Dieser Account wurde gesperrt!";
export const ERROR_PROCESSING_DATA:string = "Daten konnten nicht verarbeitet werden";


export const NO_SERVER_FOUND_ALERT:ReactElement = <Alert severity={"error"} variant={"filled"}>{NO_SERVER_FOUND_TEXT}</Alert>
export const ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT:ReactElement = <Alert>{ERROR_NOT_WORKED_RECOMMENDATIONS_TEXT}</Alert>
export const ERROR_NO_DATA_ALERT:ReactElement = <Alert severity={"error"}>{ERROR_NO_DATA}</Alert>
export const SUCCESS_LOGGED_IN_ALERT:ReactElement = <Alert severity={"success"}>{SUCCESS_LOGGED_IN}</Alert>
export const ERROR_ACCOUNT_SUSPENDED_ALERT:ReactElement = <Alert severity={"warning"}>{ERROR_ACCOUNT_SUSPENDED}</Alert>;
export const ERROR_PROCESSING_DATA_ALERT:ReactElement = <Alert severity={"error"}>{ERROR_PROCESSING_DATA}</Alert>;