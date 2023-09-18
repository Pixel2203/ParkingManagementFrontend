import {ReactElement, useState} from "react";
import {Avatar, Badge} from "@mui/material";
import styles from "./AppHeader.module.css"
import UserDropDown from "@/pages/components/AppHeader/UserDropDown/UserDropDown";
import {User} from "@/utils/types";
export default function ({userData, setUserData,setContentSite} : {userData:User | null,setUserData:(data:User | null) => void, setContentSite:(site: string) => void}):ReactElement {
    const [displayDropDown, setDisplayDropDown] = useState<boolean>(false);
    const updateContentSiteFromDropDown = (site: string) => {
        setContentSite(site);
    }
    const getInitials = (prename: string, name:string):string => {
        if(prename.length <= 0 || name.length <= 0){
            return ""
        }
        const fc = prename.at(0) as string;
        const lc = name.at(0) as string;
        return (fc+lc).toUpperCase();
    }
    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <div className={styles.userContainer}>

                        {

                            userData &&
                            <Badge badgeContent={4} color={"primary"} className={styles.badgeContainer} onClick={() => setDisplayDropDown(!displayDropDown)}>
                                <Avatar>{getInitials(userData.prename, userData.name)}</Avatar>
                            </Badge>
                        }

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