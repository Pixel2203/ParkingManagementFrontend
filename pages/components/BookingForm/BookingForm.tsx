import {MutableRefObject, ReactElement, useEffect, useRef, useState} from "react";
import styles from "./BookingForm.module.css"
import {
    customDateObject,
    sensorData,
    userData,
    BookingResponse, SnackbarComponent, Booking
} from "@/utils/types";
import {Accordion, AccordionSummary, Alert, Button} from "@mui/material";
import {getBookingsBySensorAndDate, sendBookingRequest} from "@/pages/components/RequestHandler";
import {date} from "zod";
import TimeInput from "@/pages/components/BookingForm/TimeInput/TimeInput";
import {
    getDateAsString,
    getFullDate,
    getFutureDate,
    getTimeAsString,
    putIntoDateCorrectDateFormat
} from "@/utils/TimeDateHandler";
import {start} from "@popperjs/core";
import BookingList from "@/pages/components/BookingForm/BookingList/BookingList";
import BookingAccordion from "@/pages/components/BookingForm/BookingAccordion/BookingAccordion";
export default function ({parkingLotData,setShowBookingWindow,userData,snackbar} : {parkingLotData: sensorData,setShowBookingWindow: (show: boolean) => void , userData:userData,snackbar:SnackbarComponent}):ReactElement {
    const [futureMin,setFutureMin] = useState(30);
    const [currentDateObject,setCurrentDateObject] = useState<Date>();
    const [futureDateObject,setFutureDateObject] = useState<Date>();
    const [startTime ,setStartTime] = useState<string>()
    const [bookingList, setBookingList] = useState<Array<Booking>>();
    const datepickerRef:MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>() as any;



    useEffect(() => {
        updateTimeAndDateInput();
        onLoadTodaysBookings();
    }, [futureMin,startTime] )
    useEffect(() => {
        onLoadTodaysBookings();
    },[currentDateObject])
    const updateTimeAndDateInput = () => {
        const currentDate = new Date();
        if(datepickerRef.current && startTime){

            // UserInputDate wird dem des Formulars angepasst
            const userInputDate:Date = new Date(datepickerRef.current.value);
            const [inputHours,inputMinutes] = startTime.split(":");
            userInputDate.setHours(Number(inputHours));
            userInputDate.setMinutes(Number(inputMinutes))




            const dateTodayString:string = getDateAsString(currentDate);
            const dateSelectedString:string = getDateAsString(userInputDate)
            // Add hours to Date
            const selectedDateIsToday:boolean =  dateTodayString == dateSelectedString;
            if(userInputDate.getTime() < currentDate.getTime() && !selectedDateIsToday){
                return;
            }


            let beginTime;
            if(selectedDateIsToday){
                const currentHour = currentDate.getHours();
                const currentMinutes = currentDate.getMinutes();
                const currentSum = currentHour * 60 + currentMinutes;

                const inputSum = Number(inputHours) * 60 + Number(inputMinutes);
                if(inputSum > currentSum){
                    beginTime = userInputDate;
                    beginTime.setHours(Number(inputHours));
                    beginTime.setMinutes(Number(inputMinutes));
                }else{
                    beginTime = currentDate;
                }
             }else {
                beginTime = userInputDate;
                beginTime.setHours(Number(inputHours));
                beginTime.setMinutes(Number(inputMinutes));
            }
            const endTime = getFutureDate(beginTime,futureMin)
            setCurrentDateObject(beginTime)
            setFutureDateObject(endTime);
        }else {

            setCurrentDateObject(currentDate)
            const endTime = getFutureDate(currentDate,futureMin);
            setFutureDateObject(endTime)
        }
    }
    const clickCancel = () => {
        setShowBookingWindow(false);
    }
    const clickBook = () => {
        if(!futureDateObject || !currentDateObject){
            return;
        }

        sendBookingRequest(currentDateObject,futureDateObject,userData,parkingLotData.id).then((result: BookingResponse) => {
            snackbar.displaySnackbar(<Alert severity={result.worked ? "success" : "error"}>{result.message}</Alert>)
            if(result.worked){
                setShowBookingWindow(false);
            }
        })
    }



    const onLoadTodaysBookings = () =>{
        const sensorId = parkingLotData.id;
        if(!currentDateObject){
           return;
        }
        getBookingsBySensorAndDate(sensorId,currentDateObject).then(result => {
            if(result.worked){
                console.log("Gefundene Buchungen")
                console.log(result.bookingList);
                setBookingList(result.bookingList)
            }

        })
    }
    let selectedDateIsToday:boolean = false;
    if(datepickerRef.current)
    {
        const dateTodayString:string = getDateAsString(currentDateObject);
        const dateSelectedString:string = getDateAsString(new Date(datepickerRef.current.value))
        selectedDateIsToday =  dateTodayString == dateSelectedString;
    }




    const TimeInputComponent = {
        setStartTime: setStartTime,
        updatedValue: getTimeAsString(currentDateObject),
        isToday: selectedDateIsToday
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <section className={styles.header}>
                    <h1>E-PARKPLATZ</h1>
                </section>
                <div className={styles.contentWrapper}>

                    <section className={styles.bookingContent}>
                        <BookingAccordion title={"Details"} defaultOpen={true} >
                            <section>
                                <p>Bezeichnung: {parkingLotData.name}</p>
                                <p>Typ: E-Ladesäule</p>
                                <p>Sensornummer: {parkingLotData.id}</p>
                                <p>Status: {parkingLotData.bookable? parkingLotData.status? "blockiert":"frei" : "gebucht"}</p>
                            </section>
                        </BookingAccordion>
                        <BookingAccordion  title={"Buchung"} className={styles.accordion}>
                            <section className={styles.inputContainer}>
                                <section>
                                    <h4>Tag der Buchung</h4>
                                    <input ref={datepickerRef}
                                           onChange={updateTimeAndDateInput}
                                           type={"date"}
                                           defaultValue={putIntoDateCorrectDateFormat(new Date)}
                                           className={styles.datePicker}/>
                                </section>
                                <section>
                                    <h4>Zeit der Buchung</h4>
                                    {
                                        TimeInputComponent.updatedValue &&
                                        <TimeInput timeComponent={TimeInputComponent}/>
                                    }
                                </section>
                                <section >
                                    <h4>Dauer der Buchung</h4>
                                    <select onChange={(event) => {setFutureMin(event.target.value as any)}}>
                                        <option value={30}>30 Minuten</option>
                                        <option value={60}>1 Stunde</option>
                                        <option value={90}>1 Stunde 30 Minuten</option>
                                        <option value={120}>2 Stunden</option>
                                        <option value={150}>2 Stunden 30 Minuten</option>
                                        <option value={180}>3 Stunden</option>
                                        <option value={210}>3 Stunden 30 Minuten</option>
                                        <option value={240}>4 Stunden</option>
                                    </select>
                                </section>
                                <section>
                                    <h4>Ihre Buchung</h4>
                                    <div className={styles.showTimeAndDate}>
                                        <div className={styles.dateBox}>


                                            <p>{getDateAsString(currentDateObject)}</p>
                                            <span>{getTimeAsString(currentDateObject)}</span>

                                        </div>
                                        <h2>-</h2>
                                        <div className={styles.dateBox}>
                                            <p>{getDateAsString(futureDateObject)}</p>
                                            <span>{getTimeAsString(futureDateObject)}</span>
                                        </div>
                                    </div>
                                </section>
                            </section>
                        </BookingAccordion>
                        {
                            bookingList &&
                            <BookingAccordion className={styles.accordion} title={"Bevorstehende Buchungen am " + getDateAsString(currentDateObject)}>
                            <section className={styles.dataDisplay}>
                        {
                            bookingList &&
                            <BookingList bookingList={bookingList}/>
                        }
                            </section>
                            </BookingAccordion>
                        }

                        <div className={styles.buttonWrapper}>
                            <Button variant={"contained"} onClick={clickBook} disabled={parkingLotData.status}>Buchen</Button>
                            <Button variant={"outlined"} onClick={clickCancel}>Abbrechen</Button>
                        </div>
                    </section>

                </div>

            </div>

        </div>
    )
}