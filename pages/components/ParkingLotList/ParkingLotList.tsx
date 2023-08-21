import {ReactElement, useEffect, useRef, useState} from "react";
import {parkData, parkingOverview, parkingRequestResponse} from "@/custom_types/types";
import styles from "./ParkingLotList.module.css"
import BookingForm from "@/pages/components/BookingForm/BookingForm";
export default function ():ReactElement {
    const [parkingData, setParkingData] = useState<parkingOverview>();
    const [showBookingWindow, setShowBookingWindow] = useState(false);
    useEffect(() => {
        console.log("lets go")
        fetch("/api/requestParkData").then(res => res.json()).then((result:parkingOverview) => {
            console.log("gesetzt!")
            setParkingData(result);
        })
    }, [])
    let selectedParkingLot = useRef<parkData>();
    const clickParkingLot = (parkId:number) => {
        if(parkingData){
            parkingData?.parking_lots.map(parkingLot => {
                if(parkingLot.id == parkId){
                    selectedParkingLot.current = parkingLot;
                    return;
                }
            })
        }


        setShowBookingWindow(true);
    }
    return (
        <>
            {
                parkingData &&
                    <>
                        <ul className={styles.parkList}>
                            {
                                parkingData.parking_lots.map(parkingLot => (
                                    <li onClick={() => clickParkingLot(parkingLot.id)} className={parkingLot.used ? styles.usedLot : styles.freeLot} key={parkingLot.id}>{parkingLot.name}</li>
                                ))
                            }
                        </ul>
                        {
                            showBookingWindow && selectedParkingLot.current &&
                            <BookingForm parkingLotData={selectedParkingLot.current} setShowBookingWindow={setShowBookingWindow}/>
                        }


                    </>
            }
        </>
    )
}