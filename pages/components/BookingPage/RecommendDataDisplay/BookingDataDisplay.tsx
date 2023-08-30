import {CSSProperties, ReactElement, useEffect} from "react";
import {BookingFilterObject, RecommendationTicket} from "@/utils/types";
import {getTimeAsString} from "@/utils/TimeDateHandler";
import styles from "./BookingDataDisplay.module.css"
export default function ({mydata,barWidth,filterData} : {mydata:Record<number,Array<RecommendationTicket>>, barWidth?:number, filterData:BookingFilterObject}):ReactElement {
    //const [calculatedTimes]
    // Styling

    const balkenWidth = barWidth ?? 800;
    const keys = Object.keys(mydata);
    const minuteWidth = balkenWidth/(23*60 + 59) *2;

    // Styling END

    // Highest and Lowest allowed Time
    const highestDate = new Date(filterData.dateFilter.selectedDate.getTime());
    highestDate.setHours(23,59);
    const lowestDate = new Date(filterData.dateFilter.selectedDate.getTime());
    lowestDate.setHours(0,0);


    const calculateBlockedTimes = (sensorId:number):Array<RecommendationTicket> => {
        console.log("RECHNE AUS!!!")
        const availableTimes:Array<RecommendationTicket> = mydata[sensorId];
        const blockers: Array<RecommendationTicket> = []
        for(let i = 0; i < availableTimes.length; i++){
            const isEarliestEntry = i==0;
            const isLast:boolean = (i+1==availableTimes.length);
            if(!isLast && availableTimes[i].endDate < availableTimes[i+1].startDate){
                // Push a blocker entry
                console.log("EINTRAG " + i + " von " + availableTimes.length)
                blockers.push({
                    startDate: availableTimes[i].endDate,
                    endDate: availableTimes[i+1].startDate,
                    bookingId: 9999,
                    plate: null,
                    name: availableTimes[i].name
                })
                console.log("HABE BLOCKER HINZUGEFÜGT:")
                console.log(getTimeAsString(new Date(availableTimes[i].endDate)) + " bis " + getTimeAsString(new Date(availableTimes[i+1].startDate)))
            }
        }
        return blockers;
    }
    useEffect(() => {
        let block= calculateBlockedTimes(0);
        console.log(block)
        mydata[0].push(...block)
        console.log(mydata)
    },[mydata])
    return (
        <>
            <div className={styles.contentWrapper}>
                <table className={styles.dataTable}>
                    <tr>
                        <th>SensorId</th><th>Balken</th>
                    </tr>

                {
                    keys.map(key => (
                        <tr>
                            <td>{key}</td>
                            <td>
                                <div className={styles.dataBar} style={{width: balkenWidth + "px"}}>
                                    {
                                        mydata[Number(key)].map(ticket => (
                                            <section style={{
                                                width: (ticket.endDate - ticket.startDate)/1000/60 / 2 * minuteWidth,
                                                marginLeft: (ticket.startDate - lowestDate.getTime()) / 1000/ 60 / 2 * minuteWidth,
                                                backgroundColor: ticket.bookingId==9999? "blue" : "green",
                                                border: "1px solid red"
                                            }}>
                                                {getTimeAsString(
                                                    new Date(ticket.startDate)
                                                )}
                                                -
                                                {getTimeAsString(
                                                    new Date(ticket.endDate)
                                                )}
                                            </section>
                                        ))
                                    }
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </table>
            </div>
        </>
    )
}