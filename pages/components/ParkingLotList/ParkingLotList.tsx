import {ReactElement, useEffect, useRef, useState} from "react";
import {FullSensorDataResponse, sensorData, parkingOverview, userData, SnackbarComponent} from "@/utils/types";
import styles from "./ParkingLotList.module.css"
import BookingForm from "@/pages/components/ParkingLotInfo/ParkingLotInfo";
import {getAllSensorData} from "@/pages/components/RequestHandler";
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
export default function ({uData,snackbar}: {uData:userData,snackbar:SnackbarComponent}):ReactElement {
    const [parkingData, setParkingData] = useState<parkingOverview>();
    const [showBookingWindow, setShowBookingWindow] = useState(false);
    useEffect(() => {
        getAllSensorData().then((result: FullSensorDataResponse) => {
            if(result.worked && result.sensors){
                const overview: parkingOverview = {
                    parking_lots: result.sensors
                }
                setParkingData(overview);
            }
        })
    }, [])
    let selectedParkingLot = useRef<sensorData>();
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
                        <ul className={styles.cardList}>
                            {
                                parkingData.parking_lots.map(parkingLot => (
                                    <li >
                                        <Card className={styles.sensorCard}>
                                            <CardHeader title={
                                                <div className={styles.cardHeaderContent}>
                                                    <p>Parkplatz</p>
                                                    <Avatar className={styles.cardHeaderAvatar}><span>{parkingLot.id}</span></Avatar>
                                                </div>

                                            } className={styles.cardHeader}>

                                            </CardHeader>
                                            <CardContent className={styles.cardContent}>
                                                <div className={styles.availabilityContainer}>
                                                    <p>Status</p>
                                                    <div className={styles.availabilityIndicator} style={{backgroundColor: parkingLot.bookable? parkingLot.status? "orange" : "green" :"red"}}></div>
                                                </div>
                                                <p>Typ E-Ladesäule</p>
                                            </CardContent>

                                            <CardActions>
                                                <Button size="small" onClick={() => clickParkingLot(parkingLot.id)}>Details</Button>
                                            </CardActions>
                                        </Card>
                                    </li>
                                ))

                            }
                        </ul>
                        {
                            showBookingWindow && selectedParkingLot.current &&
                            <BookingForm snackbar={snackbar} parkingLotData={selectedParkingLot.current} setShowBookingWindow={setShowBookingWindow} userData={uData}/>
                        }


                    </>
            }
        </>
    )
}