import {CSSProperties, ReactElement, useEffect, useState} from "react";
import {
    BookingFilterObject,
    BookingHandlerConfig,
    RecommendationTicket,
    Sensordata,
    SnackbarComponent,
    User
} from "@/utils/types";
import {getTimeAsString, putIntoDateCorrectDateFormat} from "@/utils/TimeDateHandler";
import styles from "./BookingDataDisplay.module.css"
import ParkingLotInfo from "@/pages/components/ParkingLotInfo/ParkingLotInfo";
import {ERROR_NO_DATA_ALERT, ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT, NO_SERVER_FOUND_ALERT} from "@/utils/fields";
import {getBookingRecommendations} from "@/utils/RequestHandler";
export type BookingDataDisplayData = {
    startDate: Date,
    duration: number,
    filterData:BookingFilterObject,
}
interface BookingDataDisplayProperties {
    data: BookingDataDisplayData
    tableWidth?:number,

    snackbar:SnackbarComponent,
    userData:User
}

export default function ({data,tableWidth, snackbar, userData} : BookingDataDisplayProperties):ReactElement {
    const [displayData, setDisplayData] = useState<Record<number, Array<RecommendationTicket>>>()
    const [showBookingWindow,setShowBookingWindow] = useState<boolean>(false);
    const [parkingLotData,setParkingLotData] = useState<Sensordata>()
    const [config,setConfig] = useState<BookingHandlerConfig>();
    const {filterData} = data;
    tableWidth = tableWidth ? tableWidth : 1200
    // Styling
    const balkenWidth = tableWidth ? tableWidth-50 : 800;
    const minuteWidth = balkenWidth/(23*60 + 59)*2;
    const tableProperties:CSSProperties = {
        maxWidth:tableWidth ? tableWidth + "px" : "800px",

    }
    const tableMetadataProperties:CSSProperties = {
        width: "50px",
        maxWidth: "50px",
        minWidth: "50px"

    }
    const timeDisplay:CSSProperties = {
        maxWidth: "0px",
        textAlign:"left",
    }
    // Styling END

    // Highest and Lowest allowed Time
    const highestDate = new Date(filterData.dateFilter.selectedDate.getTime());
    highestDate.setHours(23,59);
    const lowestDate = new Date(filterData.dateFilter.selectedDate.getTime());
    lowestDate.setHours(0,0);
    // FILTER

// mydata:Record<number,Array<RecommendationTicket>>,

    const calculateBlockedTimes = (availableTimes:Array<RecommendationTicket>):Array<RecommendationTicket> => {
        const blockers: Array<RecommendationTicket> = []
        for(let i = 0; i < availableTimes.length; i++){
            const isEarliestEntry = i==0;
            const isLast:boolean = (i+1==availableTimes.length);
            if(isEarliestEntry){
                if(availableTimes[i].startDate > lowestDate.getTime()){
                    blockers.push({
                        startDate: lowestDate.getTime(),
                        name: availableTimes[i].name,
                        plate: null,
                        endDate: availableTimes[i].startDate,
                        bookingId: 9999
                    })
                }
            }
            // Zwischendrin
            if(!isLast && availableTimes[i].endDate < availableTimes[i+1].startDate){
                // Push a blocker entry
                blockers.push({
                    startDate: availableTimes[i].endDate,
                    endDate: availableTimes[i+1].startDate,
                    bookingId: 9999,
                    plate: null,
                    name: availableTimes[i].name
                })
                continue;
            }

        }
        return blockers;
    }
    useEffect(() => {
        getBookingRecommendations(data.startDate, data.duration).then(result => {
            console.log(result)
            if (!result) {
                snackbar.displaySnackbar(NO_SERVER_FOUND_ALERT)
                return;
            }
            if (!result.worked) {
                snackbar.displaySnackbar(ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT)
                return;
            }
            let blockDaten: Record<number,Array<RecommendationTicket>> = {};
            const keyset = Object.keys(result.tickets);
            for(let i = 0; i < keyset.length; i++){
                const sensorId = Number(keyset[i]);
                let blocks = calculateBlockedTimes(result.tickets[sensorId]);
                blocks.push(...result.tickets[sensorId])
                blockDaten[sensorId] =  blocks;
            }
            setDisplayData(blockDaten)

        })


    },[showBookingWindow,data])
    const clickSection = (ticket:RecommendationTicket, sensorId:number) => {
        if(!displayData){
            snackbar.displaySnackbar(ERROR_NO_DATA_ALERT)
            return
        }
        if(ticket.bookingId == 9999){
            return;
        }
        setConfig({
            timeConfig: {
                startDate: new Date(ticket.startDate),
                endDate: new Date(ticket.startDate + data.duration * 60 * 1000)

            },
            options: {
                enableDatePicker: false,
                allowPastTimes: false,
                disableBookingHandler: false
            }
        })
        setParkingLotData(
            {
                name: ticket.name,
                status: false,
                bookable: true,
                id: sensorId
            }
        )
        setShowBookingWindow(true);
    }

    console.log("RERENDER")
    return (
        <>
            <div className={styles.contentWrapper}>
                <table className={styles.dataTable} style={tableProperties}>
                    <tr>
                        <th style={tableMetadataProperties}>ID</th>
                        <th style={timeDisplay}>00:00</th>
                        <th style={timeDisplay}>01:00</th>
                        <th style={timeDisplay}>02:00</th>
                        <th style={timeDisplay}>03:00</th>
                        <th style={timeDisplay}>04:00</th>
                        <th style={timeDisplay}>05:00</th>
                        <th style={timeDisplay}>06:00</th>
                        <th style={timeDisplay}>07:00</th>
                        <th style={timeDisplay}>08:00</th>
                        <th style={timeDisplay}>09:00</th>
                        <th style={timeDisplay}>10:00</th>
                        <th style={timeDisplay}>11:00</th>
                        <th style={timeDisplay}>12:00</th>
                        <th style={timeDisplay}>13:00</th>
                        <th style={timeDisplay}>14:00</th>
                        <th style={timeDisplay}>15:00</th>
                        <th style={timeDisplay}>16:00</th>
                        <th style={timeDisplay}>17:00</th>
                        <th style={timeDisplay}>18:00</th>
                        <th style={timeDisplay}>19:00</th>
                        <th style={timeDisplay}>20:00</th>
                        <th style={timeDisplay}>21:00</th>
                        <th style={timeDisplay}>22:00</th>
                        <th style={timeDisplay}>23:00</th>
                    </tr>



                { displayData && 1==1 &&
                    Object.keys(displayData).map(key => (
                        <tr>
                            <td style={tableMetadataProperties}>{key}</td>
                            <td colSpan={24}>
                                <div className={styles.dataBar} style={{width: balkenWidth + "px"}}>
                                    {
                                        displayData[Number(key)].map(ticket => (
                                            <>
                                                <section style={{
                                                    width: (ticket.endDate - ticket.startDate)/1000/60 / 2 * minuteWidth,
                                                    marginLeft: (ticket.startDate - lowestDate.getTime()) / 1000/ 60 / 2 * minuteWidth,
                                                    background: ticket.bookingId==9999? "red" : "#6beb34"
                                                }} onClick={() => clickSection(ticket, Number(key))}>

                                                </section>
                                            </>

                                        ))
                                    }
                                </div>
                            </td>
                        </tr>
                    ))
                }


                </table>
                {
                    showBookingWindow && parkingLotData && userData &&
                    <ParkingLotInfo config={config} snackbar={snackbar} parkingLotData={parkingLotData} setShowBookingWindow={setShowBookingWindow} userData={userData}/>
                }
            </div>
        </>
    )
}