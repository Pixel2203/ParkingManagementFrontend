import {ReactElement, useEffect, useRef} from "react";
import styles from "./BookingForm.module.css"
import {customDateObject, parkData, parkingOverview} from "@/custom_types/types";
import {Button} from "@mui/material";
import {set} from "zod";
import {min} from "@popperjs/core/lib/utils/math";
export default function ({parkingLotData,setShowBookingWindow} : {parkingLotData: parkData,setShowBookingWindow: (show: boolean) => void }):ReactElement {
    console.log(parkingLotData)
    useEffect(() => {

    } )
    const clickCancel = () => {
        setShowBookingWindow(false);
    }

    const calcFutureDate = (timeDiffInMinutes: any): Date => {
        console.log(timeDiffInMinutes)
        const hours = parseInt((timeDiffInMinutes / 60).toString().slice(0,1));
        const minutes = timeDiffInMinutes % 60;

        const futureTime = time;
        futureTime.setHours(time.getHours() + hours);
        futureTime.setMinutes(time.getMinutes() + minutes);
        return futureTime;
    }


    const getFullDate = (currentTime: Date):customDateObject => {

        let year:string = currentTime.getFullYear().toString();


        let day:string = currentTime.getDate().toString();
        let month:string = currentTime.getMonth().toString();
        let hour:string = currentTime.getHours().toString();
        let minute:string = currentTime.getMinutes().toString();
        if(day.length == 1){
            day = "0" + day;
        }
        if(month.length == 1){
            month = "0" + month;
        }
        if(hour.length == 1){
            hour = "0" + hour;
        }
        if(minute.length == 1){
            minute = "0" + minute;
        }
        return {
            day: day,
            month: month,
            year: year,
            hour: hour,
            minute:minute
        }
    }
    const time = new Date();
    const futureTime = useRef(getFullDate(calcFutureDate(60)));
    const currentDate = getFullDate(time);
    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <h1>{parkingLotData.name}</h1>
                <div>
                    <span>Dauer der Buchung</span>
                    <select onChange={(event) => {calcFutureDate(event.target.value)}}>
                        <option value={30}>30 Minuten</option>
                        <option value={60}>1 Stunde</option>
                        <option value={90}>1 Stunde 30 Minuten</option>
                        <option value={120}>2 Stunden</option>
                        <option value={150}>2 Stunden 30 Minuten</option>
                        <option value={180}>3 Stunden</option>
                        <option value={210}>3 Stunden 30 Minuten</option>
                        <option value={240}>4 Stunden</option>
                    </select>
                </div>

                <div className={styles.showTimeAndDate}>
                    <div className={styles.dateBox}>
                        {
                            currentDate.day + "." + currentDate.month + "." + currentDate.year
                        }
                        <br/>
                        {
                            currentDate.hour + ":" + currentDate.minute
                        }
                    </div>
                    <div className={styles.dateBox}>
                        {
                            futureTime.current.day + "." + futureTime.current.month + "." + futureTime.current.year
                        }
                        <br/>
                        {
                            futureTime.current.hour + ":" + futureTime.current.minute
                        }
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button variant={"contained"} disabled={parkingLotData.used}>Buchen</Button>
                    <Button variant={"outlined"} onClick={clickCancel}>Abbrechen</Button>
                </div>

            </div>

        </div>
    )
}