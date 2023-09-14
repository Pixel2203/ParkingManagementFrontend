import {ReactElement} from "react";
import {Booking} from "@/utils/types";
import * as TimeHandler from "@/utils/TimeDateHandler";
import styles from "./BookingList.module.css"
import {Book, Info, RemoveCircle} from "@mui/icons-material";
type BookingObject = {
    startTime: string,
    endTime: string,
    startDate: string,
    endDate: string
}
export default function ({bookingList, className} : {bookingList: Array<Booking>, className? : string | undefined}):ReactElement {
    const bookings:Array<BookingObject> = [];

    bookingList.map(booking => {
        const bookingObj:BookingObject = {
            startDate:  TimeHandler.getDateAsString(new Date(booking.startDate)),
            endDate:    TimeHandler.getDateAsString(new Date(booking.endDate)),
            startTime:  TimeHandler.getTimeAsString(new Date(booking.startDate)),
            endTime:    TimeHandler.getTimeAsString(new Date(booking.endDate))
        }
        bookings.push(bookingObj)
    });
    return (
        <div className={className}>
            <ul className={styles.bookingList}>
                {
                    bookings.map(booking => (
                        <li className={styles.bookingListEntry}>
                            <Info/>
                            <div>
                                <p>{booking.startDate}</p>
                                <span>{booking.startTime} - {booking.endTime}</span>
                            </div>

                        </li>
                    ))
                }
            </ul>
        </div>

    )
}