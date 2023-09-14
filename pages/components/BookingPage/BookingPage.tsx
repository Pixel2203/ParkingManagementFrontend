import {BaseSyntheticEvent, ReactElement, useEffect, useRef, useState} from "react";
import {Alert, Button} from "@mui/material";
import {
    BookingFilterObject,
    RecommendationTicket,
    SnackbarComponent,
    TimeInputComponent,
    User
} from "@/utils/types";
import {getBookingRecommendations} from "@/utils/RequestHandler";
import RecommendDataDisplay from "@/pages/components/BookingPage/RecommendDataDisplay/BookingDataDisplay";
import {getDateAsString, getTimeAsString, putIntoDateCorrectDateFormat} from "@/utils/TimeDateHandler";
import {ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT, NO_SERVER_FOUND_ALERT} from "@/utils/fields";
import TimeInput from "@/pages/components/ParkingLotInfo/TimeInput/TimeInput";

export default function ({snackbar, userData} : {snackbar:SnackbarComponent, userData:User}):ReactElement {
    const [recom, setRecom] = useState<Record<number, Array<RecommendationTicket>>>();
    const [filters, setFilters] = useState<BookingFilterObject>();
    const dateRef = useRef<HTMLInputElement>(null);
    const selectedDurationRef = useRef<HTMLSelectElement>(null);
    const handleRecommendClick = () => {
        if (dateRef.current && selectedDurationRef.current) {
            const date: Date = new Date(dateRef.current.value);
            const [hours, mins] = time.split(":");
            if (date.getDate())
                date.setHours(Number(hours), Number(mins))
            setFilters({
                dateFilter: {
                    selectedDate: date
                }
            })
            console.log(date)
            getBookingRecommendations(date, Number(selectedDurationRef.current.value)).then(result => {
                console.log(result)
                if (!result) {
                    snackbar.displaySnackbar(NO_SERVER_FOUND_ALERT)
                    return;
                }
                if (!result.worked) {
                    snackbar.displaySnackbar(ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT)
                    return;
                }
                setRecom(result.tickets)

            })
        }

    }
    const [time,setTime] = useState<string>(getTimeAsString(new Date()))
    const handleTimeChange = (e:BaseSyntheticEvent) => {
        if(!dateRef.current){
            return;
        }
        const currentDate = new Date();
        const timeString = (e.target as HTMLInputElement).value;
        const isToday: boolean = getDateAsString(currentDate) == getDateAsString(new Date(dateRef.current.value))
        if(isToday){
            const selectDate = new Date(dateRef.current.value);
            const [hours,mins] = timeString.split(":")
            selectDate.setHours(Number(hours),Number(mins));
            if(currentDate.getTime() > selectDate.getTime()){
                setTime(getTimeAsString(currentDate));
                console.log(getTimeAsString(currentDate))
            }else {
                setTime(getTimeAsString(selectDate))

            }
        }else {
            setTime(timeString);
        }


    }
    return (
        <>
            <input type={"date"} ref={dateRef} defaultValue={putIntoDateCorrectDateFormat(new Date())}/>
            <input type={"time"} value={time} onChange={handleTimeChange}/>
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
                <RecommendDataDisplay userData={userData} snackbar={snackbar} mydata={recom} filterData={filters}/>
            }
        </>
    )
}