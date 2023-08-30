import {MutableRefObject, ReactElement, useEffect, useRef, useState} from "react";
import styles from "./ParkingLotInfo.module.css"
import {
    customDateObject,
    sensorData,
    userData,
    BookingResponse, SnackbarComponent, Booking, BookingHandlerDTO
} from "@/utils/types";
import {Accordion, AccordionSummary, Alert, Button} from "@mui/material";
import {getBookingsBySensorAndDate, sendBookingRequest} from "@/pages/components/RequestHandler";
import {
    getDateAsString,
} from "@/utils/TimeDateHandler";
import {start} from "@popperjs/core";
import BookingList from "@/pages/components/ParkingLotInfo/BookingList/BookingList";
import BookingAccordion from "@/pages/components/Accordion/Accordion";
import BookingHandler from "@/pages/components/ParkingLotInfo/BookingHandler/BookingHandler";
import {Clear, PlaylistAdd} from "@mui/icons-material";
export default function ({parkingLotData,setShowBookingWindow,userData,snackbar} : {parkingLotData: sensorData,setShowBookingWindow: (show: boolean) => void , userData:userData,snackbar:SnackbarComponent}):ReactElement {
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
        onLoadTodaysBookings();
    }, [currentDateObject]);
    const clickCancel = async () => {
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
                        <BookingAccordion  title={"Buchung"} className={styles.accordion}>
                            <BookingHandler handlerDTO={bookingHandlerDTO}/>
                        </BookingAccordion>
                        {
                            bookingList &&
                            <BookingAccordion className={styles.accordion} title={"Zeitplan - " + getDateAsString(currentDateObject)}>
                            <section className={styles.dataDisplay}>
                        {
                            bookingList &&
                            <BookingList bookingList={bookingList}/>
                        }
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