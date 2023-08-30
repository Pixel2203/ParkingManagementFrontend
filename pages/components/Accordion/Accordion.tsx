import {CSSProperties, MutableRefObject, ReactElement, useEffect, useRef, useState} from "react";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import styles from "./Accordion.module.css";
export default function ({children, title, className, defaultOpen} : {children:ReactElement, title:string, className?: string, defaultOpen?: boolean}):ReactElement {
    const [display, setDisplay] = useState<boolean>(defaultOpen? defaultOpen : false);
    const panel:MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement>() as any;
    useEffect(() => {
        if(panel){
            panel.current.style.maxHeight = !display? "0px" : panel.current.scrollHeight + "px"
        }
    })
    return (
        <>
            <div className={className}>
                <div className={styles.accordionHeader}>
                    <h3>{title}</h3>
                    <div onClick={() => setDisplay(!display)}>
                        {
                            display?<ArrowDropUp fontSize={"large"}/>:<ArrowDropDown fontSize={"large"}/>
                        }

                    </div>
                </div>

                <div className={styles.panel} ref={panel} >
                    {children}
                </div>
            </div>


        </>
    )
}