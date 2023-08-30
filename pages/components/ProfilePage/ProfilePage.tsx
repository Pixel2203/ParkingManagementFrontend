import {ReactElement, useState} from "react";
import styles from "./ProfilePage.module.css";
import {Button, ButtonGroup, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Booking, userData} from "@/utils/types";
import BookingList from "@/pages/components/ParkingLotInfo/BookingList/BookingList";
import {getBookingHistoryByPlate, getFutureBookingsByPlate} from "@/pages/components/RequestHandler";
export default function ({userData}: {userData:userData}):ReactElement {
    const [bookings,setBookings] = useState<Array<Booking>>()
    const [alignment, setAlignment] = useState('fb');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const requestFutureBookings = () => {
        getFutureBookingsByPlate(userData.plate).then(result => {
            if (result.worked) {
                const bookingList: Array<Booking> = result.bookingList;
                bookingList.forEach(booking => {
                    booking.startDate = new Date(booking.startDate)
                    booking.endDate = new Date(booking.endDate)
                })
                setBookings(result.bookingList);
            }
        })
    }
    const requestBookingHistory = () => {
        getBookingHistoryByPlate(userData.plate).then(result => {
            if(result.worked){
                const bookingList:Array<Booking> = result.bookingList;
                bookingList.forEach(booking => {
                    booking.startDate = new Date(booking.startDate)
                    booking.endDate = new Date(booking.endDate)
                })
                setBookings(result.bookingList);
            }
        })
    }

    return (
        <main className={styles.wrapper}>
            <h1>Ihr Profil</h1>
            <div className={styles.layoutWrapper}>
                <section className={styles.userData}>
                    <h2>Persönliche Daten</h2>
                    <ul>
                        <li>
                            <p>Email</p><span>{userData.email}</span>
                        </li>
                        <li>
                            <p>Telefon</p><span>{userData.telephone}</span>
                        </li>
                        <li>
                            <p>Gesellschaft</p><span>{userData.company}</span>
                        </li>

                    </ul>

                    <h2>Fahrzeugdaten</h2>
                    <ul className={styles.vehicleData}>
                        <li>
                            <p>Marke</p><span>{userData.brand}</span>
                        </li>

                        {
                            userData.model &&
                            <li>
                                <p>Modell</p><span>{userData.model}</span>
                            </li>
                        }

                        <li>
                            <p>Kennzeichen</p><span>{userData.plate}</span>
                        </li>
                    </ul>
                </section>
                <section className={styles.bookingContainer}>
                    <div className={styles.bookingHeader}>
                        <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            className={styles.btngrp}
                        >
                            <ToggleButton value="fb" onClick={requestFutureBookings}>Aktiv</ToggleButton>
                            <ToggleButton value="bh" onClick={requestBookingHistory}>Historie</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {
                        bookings && <BookingList className={styles.bookingList} bookingList={bookings}/>
                    }
                </section>
            </div>


        </main>
    )
}