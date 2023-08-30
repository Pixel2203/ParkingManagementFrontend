import {ReactElement} from "react";
import {Booking} from "@/utils/types";
import {getDateAsString, getTimeAsString} from "@/utils/TimeDateHandler";
import styles from "./BookingList.module.css"
import {Book, Info, RemoveCircle} from "@mui/icons-material";
export default function ({bookingList, className} : {bookingList: Array<Booking>, className? : string | undefined}):ReactElement {
    bookingList.map(booking => {
        booking.endDate = new Date(booking.endDate);
        booking.startDate = new Date(booking.startDate);
    });
    return (
        <div className={className}>
            <ul className={styles.bookingList}>
                {
                    bookingList.map(booking => (
                        <li className={styles.bookingListEntry}>
                            <Info/>
                            <div>
                                <p>{getDateAsString(booking.startDate as Date)}</p>
                                <span>{getTimeAsString(booking.startDate as Date)} - {getTimeAsString(booking.endDate as Date)}</span>

                            </div>

                        </li>
                    ))
                }
            </ul>
        </div>

    )
}