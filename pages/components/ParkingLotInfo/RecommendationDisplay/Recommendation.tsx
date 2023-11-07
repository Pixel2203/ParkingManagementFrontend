import {ReactElement, useRef, useState} from "react";
import {RecommendationTicket, SnackbarComponent} from "@/utils/types";
import * as RequestHandler from "@/utils/RequestHandler";
import {getDateAsString, getTimeAsString, putIntoDateCorrectDateFormat} from "@/utils/TimeDateHandler";
import {ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT, NO_SERVER_FOUND_ALERT} from "@/utils/fields";
import {Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import {ArrowDownward, Clear, PlaylistAdd} from "@mui/icons-material";
import styles from "./Recommendation.module.css"
export default function ({snackbar, setShowRecommendations}:{snackbar:SnackbarComponent, setShowRecommendations: (show:boolean) => void}) :ReactElement {
    const timeSelectorRef = useRef<HTMLInputElement>(null);
    const dateSelectorRef = useRef<HTMLInputElement>(null);
    const durationSelectorRef = useRef<HTMLSelectElement>(null)
    const [recommendationData, setRecommendationData] = useState<Array<RecommendationTicket>>();
    const getRecommendations =  () => {
        if(!dateSelectorRef.current || !timeSelectorRef.current || !durationSelectorRef.current){
            return;
        }
        const selectedDuration = Number(durationSelectorRef.current.value);
        const selectedDate: Date = new Date(dateSelectorRef.current.value);
        const [hours, minutes] = timeSelectorRef.current.value.split(":");
        selectedDate.setHours(Number(hours));
        selectedDate.setMinutes(Number(minutes));
        RequestHandler.getRecommendations(selectedDate, selectedDuration).then(result => {
            if(!result){
                snackbar.displaySnackbar(NO_SERVER_FOUND_ALERT);
                return;
            }
            if(!result.worked){
                snackbar.displaySnackbar(ERROR_NOT_WORKED_RECOMMENDATIONS_ALERT);
                return;
            }
            setRecommendationData(result.tickets);
            console.log(result.tickets)
        });
    }
    const clickCancel = () => {
        setShowRecommendations(false);
    }
    const clickBook = () => {

    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
                <div className={styles.header}>
                    <h1>Empfehlung</h1>
                </div>
                <div className={styles.contentWrapper}>
                    <div className={styles.bookingContent}>
                        <div>
                            <input type={"date"} ref={dateSelectorRef} defaultValue={putIntoDateCorrectDateFormat(new Date())}/>
                            <input type={"time"} ref={timeSelectorRef} defaultValue={getTimeAsString(new Date())}/>
                            <select ref={durationSelectorRef}>
                                <option value={30}>30 Minuten</option>
                                <option value={60}>1 Stunde</option>
                                <option value={90}>1 Stunde 30 Minuten</option>
                                <option value={120}>2 Stunden</option>
                                <option value={150}>2 Stunden 30 Minuten</option>
                                <option value={180}>3 Stunden</option>
                                <option value={210}>3 Stunden 30 Minuten</option>
                                <option value={240}>4 Stunden</option>
                            </select>
                            <Button onClick={getRecommendations}>Recommend</Button>
                        </div>



                        {
                            recommendationData &&
                            <div className={styles.dataWrapper}>
                                <ul>
                                    {
                                        recommendationData.map( item =>
                                            (
                                                <Accordion className={styles.accordion}>
                                                    <AccordionSummary
                                                        expandIcon={<ArrowDownward/>}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        <input type={"radio"} name={"bookSelector"} className={styles.bookSelector}/>
                                                        <p>{item.name}</p>
                                                    </AccordionSummary>
                                                    <AccordionDetails>

                                                        {getDateAsString(new Date(item.startDate))}
                                                        <br/>
                                                        <b>{`${getTimeAsString(new Date(item.startDate))} - ${getTimeAsString(new Date(item.endDate))}`}</b>

                                                    </AccordionDetails>
                                                </Accordion>
                                            ))
                                    }
                                </ul>
                            </div>
                        }

                        <div>
                            <div className={styles.footer}>
                                <Button variant={"contained"} onClick={clickBook} className={styles.infoButton}>
                                    <PlaylistAdd/>
                                    <span>Buchen</span>

                                </Button>
                                <Button variant={"outlined"} onClick={clickCancel} className={styles.infoButton}>
                                    <span>Zurück</span>
                                    <Clear/>
                                </Button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </div>
    )
}