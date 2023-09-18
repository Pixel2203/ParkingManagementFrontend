import {MutableRefObject, ReactElement, useEffect, useRef, useState} from "react";
import styles from "./ParkingLotInfo.module.css"
import {
    CustomDateObject,
    Sensordata,
    User,
    FullBookingResponse, SnackbarComponent, Booking, BookingHandlerDTO, BookingHandlerConfig
} from "@/utils/types";
import {Accordion, AccordionSummary, Alert, Button} from "@mui/material";
import {getBookingsBySensorAndDate, sendBookingRequest} from "@/utils/RequestHandler";
import {
    getDateAsString,
} from "@/utils/TimeDateHandler";
import {start} from "@popperjs/core";
import BookingList from "@/pages/components/ParkingLotInfo/BookingList/BookingList";
import BookingAccordion from "@/pages/components/Accordion/Accordion";
import BookingHandler from "@/pages/components/ParkingLotInfo/BookingHandler/BookingHandler";
import {Clear, PlaylistAdd} from "@mui/icons-material";
import {ERROR_FUTURE_TOO_FAR_ALERT, NO_SERVER_FOUND_ALERT} from "@/utils/fields";
import Configuration from "@/config/config.json"
export default function ({parkingLotData,setShowBookingWindow,userData,snackbar, config} : {parkingLotData: Sensordata,setShowBookingWindow: (show: boolean) => void , userData:User,snackbar:SnackbarComponent, config?:BookingHandlerConfig }):ReactElement {
    const [bookingList, setBookingList] = useState<Array<Booking>>();
    const [currentDateObject,setCurrentDateObject] = useState<Date>();
    const [futureDateObject,setFutureDateObject] = useState<Date>();
    const bookingHandlerDTO:BookingHandlerDTO = {
        setCurrentDateObject: setCurrentDateObject,
        setFutureDateObject: setFutureDateObject,
        futureDateObject: futureDateObject,
        currentDateObject: currentDateObject
    }

    useEffect(() => {
        /*
        console.log("ÄNDERUNG AUF")
        console.log(currentDateObject)
        if(config && config.timeConfig) {
            setCurrentDateObject(config.timeConfig.startDate)
            setFutureDateObject(config.timeConfig.endDate)
        }

         */

        onLoadTodaysBookings();
    }, [currentDateObject]);
    const clickCancel = async () => {
        setShowBookingWindow(false);
    }
    const clickBook = () => {
        if(!futureDateObject || !currentDateObject){
            return;
        }
        // Calculate Difference so you cant book 10 years in the future
        let differenceInHours = futureDateObject.getTime() - new Date().getTime()
        differenceInHours = differenceInHours / 1000/60/60;
        if(differenceInHours > Configuration.maxTimeAheadInHours ){
            snackbar.displaySnackbar(ERROR_FUTURE_TOO_FAR_ALERT);
            return;
        }
        sendBookingRequest(currentDateObject,futureDateObject,userData,parkingLotData.id).then((result: FullBookingResponse | undefined) => {
            if(!result){
                snackbar.displaySnackbar(NO_SERVER_FOUND_ALERT);
                return;
            }
            if(!result.worked){
                snackbar.displaySnackbar(<Alert severity={"error"}>{result.message}</Alert>)
                return;
            }
            snackbar.displaySnackbar(<Alert severity={result.worked ? "success" : "error"}>{result.message}</Alert>)
            setShowBookingWindow(false);
        })
    }



    const onLoadTodaysBookings = () =>{
        const sensorId = parkingLotData.id;
        if(!currentDateObject){
           return;
        }
        getBookingsBySensorAndDate(sensorId,currentDateObject).then(result => {
            if(!result){
                snackbar.displaySnackbar(NO_SERVER_FOUND_ALERT)
                return;
            }
            if(result.worked){
                setBookingList(result.bookingList)
            }

        })
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
                            <section className={styles.details}>
                                <p><b>Status:</b> <span style={{backgroundColor: parkingLotData.bookable? parkingLotData.status? "orange":"#00b400" : "red"}} className={styles.statusDisplay}>{parkingLotData.bookable? parkingLotData.status? "BLOCKIERT":"FREI" : "GEBUCHT"}</span></p>
                                <p><b>Typ:</b> <span>E-Ladesäule</span></p>

                                <p><b>Bezeichnung:</b> <span>{parkingLotData.name}</span></p>
                                <p><b>Sensornummer:</b> <span>{parkingLotData.id}</span></p>



                            </section>
                        </BookingAccordion>



                        {
                            (!config || !config.timeConfig ||!config.options || !config.options.disableBookingHandler) &&
                            <BookingAccordion  title={"Buchung"} className={styles.accordion}>
                                <BookingHandler handlerDTO={bookingHandlerDTO} config={config}/>
                            </BookingAccordion>
                        }



                        {
                            bookingList && ((config && config.options && !config.options.disableSchedule) || (!config || !config.options)) &&
                            <BookingAccordion className={styles.accordion} title={"Zeitplan - " + getDateAsString(currentDateObject)}>
                            <section className={styles.dataDisplay}>
                                <BookingList bookingList={bookingList}/>
                            </section>
                            </BookingAccordion>
                        }


                    </section>

                </div>
                <div className={styles.footer}>
                    <Button variant={"contained"} onClick={clickBook} disabled={parkingLotData.status} className={styles.infoButton}>
                        <PlaylistAdd/>
                        <span>Buchen</span>

                    </Button>
                    <Button variant={"outlined"} onClick={clickCancel} className={styles.infoButton}>
                        <span>Zurück</span>
                        <Clear/>
                    </Button>
                </div>
            </div>

        </div>
    )
}