import Textconfig from "@/config/de.json"
import {Alert} from "@mui/material";
import {ReactElement} from "react";

const NO_SERVER_FOUND_TEXT:string = Textconfig.NO_SERVER_FOUND_TEXT
const ERROR_NOT_WORKED_RECOMMENDATIONS_TEXT:string = Textconfig.ERROR_NOT_WORKED_RECOMMENDATIONS_TEXT
const ERROR_NO_DATA:string = Textconfig.ERROR_NO_DATA
const SUCCESS_LOGGED_IN:string = Textconfig.SUCCESS_LOGGED_IN
const ERROR_ACCOUNT_SUSPENDED:string = Textconfig.ERROR_ACCOUNT_SUSPENDED
const ERROR_PROCESSING_DATA:string =  Textconfig.ERROR_PROCESSING_DATA
const ERROR_FUTURE_TOO_FAR:string =  Textconfig.ERROR_FUTURE_TOO_FAR


export const NO_SERVER_FOUND_ALERT:ReactElement = <Alert severity={"error"} variant={"filled"}>{NO_SERVER_FOUND_TEXT}</Alert>
export const ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT:ReactElement = <Alert>{ERROR_NOT_WORKED_RECOMMENDATIONS_TEXT}</Alert>
export const ERROR_NO_DATA_ALERT:ReactElement = <Alert severity={"error"}>{ERROR_NO_DATA}</Alert>
export const SUCCESS_LOGGED_IN_ALERT:ReactElement = <Alert severity={"success"}>{SUCCESS_LOGGED_IN}</Alert>
export const ERROR_ACCOUNT_SUSPENDED_ALERT:ReactElement = <Alert severity={"warning"}>{ERROR_ACCOUNT_SUSPENDED}</Alert>;
export const ERROR_PROCESSING_DATA_ALERT:ReactElement = <Alert severity={"error"}>{ERROR_PROCESSING_DATA}</Alert>;
export const ERROR_FUTURE_TOO_FAR_ALERT:ReactElement = <Alert severity={"error"}>{ERROR_FUTURE_TOO_FAR}</Alert>;