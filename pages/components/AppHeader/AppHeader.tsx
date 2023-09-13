import {ReactElement, useState} from "react";
import {Avatar, Badge} from "@mui/material";
import styles from "./AppHeader.module.css"
import UserDropDown from "@/pages/components/AppHeader/UserDropDown/UserDropDown";
import {userData} from "@/utils/types";
export default function ({userData, setUserData,setContentSite} : {userData:userData | null,setUserData:(data:userData | null) => void, setContentSite:(site: string) => void}):ReactElement {
    const [displayDropDown, setDisplayDropDown] = useState<boolean>(false);
    const updateContentSiteFromDropDown = (site: string) => {
        setContentSite(site);
    }
    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className={styles.userContainer}>
                    <Badge badgeContent={4} color={"primary"} className={styles.badgeContainer} onClick={() => setDisplayDropDown(!displayDropDown)}>
                        <Avatar>MK</Avatar>
                    </Badge>
                    {
                        displayDropDown && userData &&
                        <UserDropDown setUserData={setUserData} setDisplayDropDown={setDisplayDropDown} setContentSite={updateContentSiteFromDropDown} userData={userData}/>
                    }
                </div>

            </div>

            <nav>
                <ul>
                    <li onClick={() => setContentSite("ppl")}>Parkplatzübersicht</li>
                    <li onClick={() => setContentSite("br")}>Empfehlung</li>
                    <li>Hilfe</li>
                </ul>
            </nav>
        </header>
    )
}