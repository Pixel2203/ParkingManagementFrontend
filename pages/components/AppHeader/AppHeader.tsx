import {ReactElement} from "react";
import {Avatar, Badge} from "@mui/material";
import styles from "./AppHeader.module.css"
export default function ():ReactElement {
    return (
        <header className={styles.header}>
            <div className={styles.topBar}>
                <Badge badgeContent={4} color={"primary"} className={styles.badgeContainer}>
                    <Avatar>MK</Avatar>
                </Badge>
            </div>
            <nav>
                <ul>
                    <li>Parkplatzübersicht</li>
                    <li>Buchungshistorie</li>
                    <li>Hilfe</li>
                </ul>
            </nav>
        </header>
    )
}