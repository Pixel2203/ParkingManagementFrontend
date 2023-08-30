import {ReactElement, useRef, useState} from "react";
import {Button} from "@mui/material";
import {BookingFilterObject, RecommendationTicket} from "@/utils/types";
import {getBookingRecommendations} from "@/pages/components/RequestHandler";
import RecommendDataDisplay from "@/pages/components/BookingPage/RecommendDataDisplay/BookingDataDisplay";

export default function ():ReactElement {
    const [recom, setRecom] = useState<Record<number,Array<RecommendationTicket>>>();
    const [filters,setFilters] = useState<BookingFilterObject>();
    const dateRef = useRef<HTMLInputElement>(null);
    const timeRef = useRef<HTMLInputElement>(null);
    const selectedDurationRef = useRef<HTMLSelectElement>(null);
    const handleRecommendClick = () => {
        if(dateRef.current && timeRef.current && selectedDurationRef.current){
             const date:Date = new Date(dateRef.current.value);
             const [hours,mins] = timeRef.current.value.split(":");
             date.setHours(0,0)
            setFilters({
                dateFilter: {
                    selectedDate: date
                },
                timeFilter: {
                    startHours: Number(hours),
                    startMinutes: Number(mins)
                }
            })
            console.log(date)
             getBookingRecommendations(date,Number(selectedDurationRef.current.value)).then(result => {
                 if(!result.worked){
                     console.log("Hat nicht geklappt!")
                     return;
                 }
                 setRecom(result.tickets)
                 console.log("Hat geklappt!")
             })
        }

    }

    return (
        <>
            <input type={"date"} ref={dateRef}/>
            <input type={"time"} ref={timeRef}/>
            <select ref={selectedDurationRef}>
                <option value={30}>30 Minuten</option>
                <option value={60}>1 Stunde</option>
                <option value={90}>1 Stunde 30 Minuten</option>
                <option value={120}>2 Stunden</option>
                <option value={150}>2 Stunden 30 Minuten</option>
                <option value={180}>3 Stunden</option>
                <option value={210}>3 Stunden 30 Minuten</option>
                <option value={240}>4 Stunden</option>
            </select>
            <Button onClick={handleRecommendClick}>Recommend</Button>
            {
                recom && dateRef.current && filters &&
                <RecommendDataDisplay mydata={recom} filterData={filters}/>
            }
        </>
    )
}