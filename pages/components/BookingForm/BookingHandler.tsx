import {MutableRefObject, ReactElement, useRef, useState} from "react";
import styles from "@/pages/components/BookingForm/BookingForm.module.css";
import {getDateAsString, getFutureDate, getTimeAsString, putIntoDateCorrectDateFormat} from "@/utils/TimeDateHandler";
import TimeInput from "@/pages/components/BookingForm/TimeInput/TimeInput";

export default function ():ReactElement {
    const [futureMin,setFutureMin] = useState(30);
    const datepickerRef:MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>() as any;
    const [currentDateObject,setCurrentDateObject] = useState<Date>();
    const [futureDateObject,setFutureDateObject] = useState<Date>();
    const [startTime , setStartTime] = useState<string>()
    const updateTimeAndDateInput = () => {
        const currentDate = new Date();
        if(datepickerRef.current && startTime){

            // UserInputDate wird dem des Formulars angepasst
            const userInputDate:Date = new Date(datepickerRef.current.value);
            const [inputHours,inputMinutes] = startTime.split(":");
            userInputDate.setHours(Number(inputHours));
            userInputDate.setMinutes(Number(inputMinutes))




            const dateTodayString:string = getDateAsString(currentDate);
            const dateSelectedString:string = getDateAsString(userInputDate)
            // Add hours to Date
            const selectedDateIsToday:boolean =  dateTodayString == dateSelectedString;
            if(userInputDate.getTime() < currentDate.getTime() && !selectedDateIsToday){
                return;
            }


            let beginTime;
            if(selectedDateIsToday){
                const currentHour = currentDate.getHours();
                const currentMinutes = currentDate.getMinutes();
                const currentSum = currentHour * 60 + currentMinutes;

                const inputSum = Number(inputHours) * 60 + Number(inputMinutes);
                if(inputSum > currentSum){
                    beginTime = userInputDate;
                    beginTime.setHours(Number(inputHours));
                    beginTime.setMinutes(Number(inputMinutes));
                }else{
                    beginTime = currentDate;
                }
            }else {
                beginTime = userInputDate;
                beginTime.setHours(Number(inputHours));
                beginTime.setMinutes(Number(inputMinutes));
            }
            const endTime = getFutureDate(beginTime,futureMin)
            setCurrentDateObject(beginTime)
            setFutureDateObject(endTime);
        }else {

            setCurrentDateObject(currentDate)
            const endTime = getFutureDate(currentDate,futureMin);
            setFutureDateObject(endTime)
        }
    }

    let selectedDateIsToday:boolean = false;
    if(datepickerRef.current)
    {
        const dateTodayString:string = getDateAsString(currentDateObject);
        const dateSelectedString:string = getDateAsString(new Date(datepickerRef.current.value))
        selectedDateIsToday =  dateTodayString == dateSelectedString;
    }

    const TimeInputComponent = {
        setStartTime: setStartTime,
        updatedValue: getTimeAsString(currentDateObject),
        isToday: selectedDateIsToday
    }
    return (
        <section className={styles.inputContainer}>
            <section>
                <h4>Tag der Buchung</h4>
                <input ref={datepickerRef}
                       onChange={updateTimeAndDateInput}
                       type={"date"}
                       defaultValue={putIntoDateCorrectDateFormat(new Date)}
                       className={styles.datePicker}/>
            </section>
            <section>
                <h4>Zeit der Buchung</h4>
                {
                    TimeInputComponent.updatedValue &&
                    <TimeInput timeComponent={TimeInputComponent}/>
                }
            </section>
            <section >
                <h4>Dauer der Buchung</h4>
                <select onChange={(event) => {setFutureMin(event.target.value as any)}}>
                    <option value={30}>30 Minuten</option>
                    <option value={60}>1 Stunde</option>
                    <option value={90}>1 Stunde 30 Minuten</option>
                    <option value={120}>2 Stunden</option>
                    <option value={150}>2 Stunden 30 Minuten</option>
                    <option value={180}>3 Stunden</option>
                    <option value={210}>3 Stunden 30 Minuten</option>
                    <option value={240}>4 Stunden</option>
                </select>
            </section>
            <section>
                <h4>Ihre Buchung</h4>
                <div className={styles.showTimeAndDate}>
                    <div className={styles.dateBox}>


                        <p>{getDateAsString(currentDateObject)}</p>
                        <span>{getTimeAsString(currentDateObject)}</span>

                    </div>
                    <h2>-</h2>
                    <div className={styles.dateBox}>
                        <p>{getDateAsString(futureDateObject)}</p>
                        <span>{getTimeAsString(futureDateObject)}</span>
                    </div>
                </div>
            </section>
        </section>
    )
}