import {ReactElement, useEffect, useRef, useState} from "react";
import {FullSensorDataResponse, Sensordata, ParkingOverview, User, SnackbarComponent} from "@/utils/types";
import styles from "./ParkingLotList.module.css"
import BookingForm from "@/pages/components/ParkingLotInfo/ParkingLotInfo";
import {getAllSensorData} from "@/utils/RequestHandler";
import {Alert, Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import {NO_SERVER_FOUND_ALERT} from "@/utils/fields";
export default function ({uData,snackbar}: {uData:User,snackbar:SnackbarComponent}):ReactElement {
    const [parkingData, setParkingData] = useState<ParkingOverview>();
    const [showBookingWindow, setShowBookingWindow] = useState(false);
    useEffect(() => {
        getAllSensorData().then((result: FullSensorDataResponse | undefined) => {
            if(!result){
                snackbar.displaySnackbar(NO_SERVER_FOUND_ALERT)
                return;
            }
            if(result.worked && result.sensors){
                const overview: ParkingOverview = {
                    parking_lots: result.sensors
                }
                setParkingData(overview);
            }
        })


    }, [])
    let selectedParkingLot = useRef<Sensordata>();
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
            {parkingData && (
                <>
                    <ul className={styles.cardList}>
                        {parkingData.parking_lots.map((parkingLot) => (
                            <li key={parkingLot.id}>
                                <Card className={styles.sensorCard}>
                                    <CardHeader
                                        title={
                                            <div className={styles.cardHeaderContent}>
                                                <p>Parkplatz</p>
                                                <Avatar className={styles.cardHeaderAvatar}>
                                                    <span>{parkingLot.id}</span>
                                                </Avatar>
                                            </div>
                                        }
                                        className={styles.cardHeader}
                                    />
                                    <CardContent className={styles.cardContent}>
                                        <div className={styles.availabilityContainer}>
                                            <p>Status</p>
                                            <div
                                                className={styles.availabilityIndicator}
                                                style={{
                                                    backgroundColor: parkingLot.bookable
                                                        ? parkingLot.status
                                                            ? "orange"
                                                            : "green"
                                                        : "red",
                                                }}
                                            ></div>
                                        </div>
                                        <p>Typ E-Ladesäule</p>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => clickParkingLot(parkingLot.id)}
                                        >
                                            Details
                                        </Button>
                                    </CardActions>
                                </Card>
                            </li>
                        ))}
                    </ul>
                    {showBookingWindow && selectedParkingLot.current && (
                        <BookingForm
                            snackbar={snackbar}
                            parkingLotData={selectedParkingLot.current}
                            setShowBookingWindow={setShowBookingWindow}
                            userData={uData}
                        />
                    )}
                </>
            )}
        </>
    );

}