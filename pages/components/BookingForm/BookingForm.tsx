import {ReactElement} from "react";
import styles from "./BookingForm.module.css"
import {customDateObject, parkData, parkingOverview} from "@/custom_types/types";
import {Button} from "@mui/material";
import {set} from "zod";
export default function ({parkingLotData,setShowBookingWindow} : {parkingLotData: parkData,setShowBookingWindow: (show: boolean) => void }):ReactElement {
    console.log(parkingLotData)
    const clickCancel = () => {
        setShowBookingWindow(false);
    }
    const getFullDate = ():customDateObject => {
        const currentTime = new Date();
        return {
            day: currentTime.getDate(),
            month: currentTime.getMonth(),
            year: currentTime.getFullYear(),
            hour: currentTime.getHours(),
            minute: currentTime.getMinutes()
        }
    }
    const currentDate = getFullDate();
    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <h1>{parkingLotData.name}</h1>
                <div>
                    <span>Dauer der Buchung</span>
                    <select>
                        <option>30 Minuten</option>
                        <option>1 Stunde</option>
                        <option>30 Minuten</option>
                        <option>2 Stunden</option>
                        <option>2 Stunden 30 Minuten</option>
                        <option>3 Stunden</option>
                        <option>3 Stunden 30 Minuten</option>
                        <option>4 Stunden</option>
                    </select>
                </div>

                <div className={styles.showTimeAndDate}>
                    {
                        `${currentDate.day}.${currentDate.month}.${currentDate.year}` +
                        `${currentDate.hour}:${currentDate.minute}`
                    }
                </div>
                <div className={styles.buttonWrapper}>
                    <Button variant={"contained"} disabled={parkingLotData.used}>Buchen</Button>
                    <Button variant={"outlined"} onClick={clickCancel}>Abbrechen</Button>
                </div>

            </div>

        </div>
    )
}