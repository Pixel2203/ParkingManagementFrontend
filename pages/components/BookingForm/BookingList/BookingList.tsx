import {ReactElement} from "react";
import {Booking} from "@/utils/types";
import {getDateAsString, getTimeAsString} from "@/utils/TimeDateHandler";
import styles from "./BookingList.module.css"
import {RemoveCircle} from "@mui/icons-material";
export default function ({bookingList} : {bookingList: Array<Booking>}):ReactElement {
    bookingList.map(booking => {
        booking.endDate = new Date(booking.endDate);
        booking.startDate = new Date(booking.startDate);
    });
    return (
        <ul className={styles.bookingList}>
            {
                bookingList.map(booking => (
                    <li className={styles.bookingListEntry}>
                        <RemoveCircle/>
                        <p>{getTimeAsString(booking.startDate as Date)} - {getTimeAsString(booking.endDate as Date)}</p>

                    </li>
                ))
            }
        </ul>
    )
}