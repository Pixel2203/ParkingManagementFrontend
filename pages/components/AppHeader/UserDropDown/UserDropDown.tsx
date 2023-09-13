import {MutableRefObject, ReactElement, useEffect, useRef} from "react";
import {userData} from "@/utils/types";
import styles from "./UserDropDown.module.css";
import {Avatar, Button, ClickAwayListener} from "@mui/material";
import {Logout, Person} from "@mui/icons-material";
export default function ({userData, setUserData, setContentSite, setDisplayDropDown}:{userData:userData, setUserData: (data:userData | null) => void, setContentSite:(site:string) => void , setDisplayDropDown: (display:boolean) => void}):ReactElement {
    const dropDownRef:MutableRefObject<HTMLDivElement> = useRef<ReactElement>(<></>) as unknown as MutableRefObject<HTMLDivElement>;
    useEffect(() => {
        dropDownRef.current.style.opacity = "1";
    })

    const handleMyProfileClick = () => {
        setContentSite("pfp");
        setDisplayDropDown(false);

    }
    const logout = () => {
        setUserData(null);
    }
    return (
        <ClickAwayListener onClickAway={() => setDisplayDropDown(false)}>
            <div className={styles.wrapper} ref={dropDownRef}>
                <section className={styles.header}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#00CBA9" fill-opacity="1" d="M0,288L48,288C96,288,192,288,288,272C384,256,480,224,576,213.3C672,203,768,213,864,213.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                    </svg>
                    <h2>{`${userData.prename} ${userData.name}`}</h2>
                </section>
                <main>

                    <section className={styles.userData}>
                        <h3>Persönliche Daten</h3>
                        <ul>
                            <li>
                                <p>Email</p><span>{userData.email}</span>
                            </li>
                            <li>
                                <p>Telefon</p><span>{userData.telephone}</span>
                            </li>
                            <li>
                                <p>Gesellschaft</p><span>{userData.company}</span>
                            </li>

                        </ul>

                        <h3>Fahrzeugdaten</h3>
                        <ul className={styles.vehicleData}>
                            <li>
                                <p>Marke</p><span>{userData.brand}</span>
                            </li>

                            {
                                userData.model &&
                                <li>
                                    <p>Modell</p><span>{userData.model}</span>
                                </li>
                            }

                            <li>
                                <p>Kennzeichen</p><span>{userData.plate}</span>
                            </li>
                        </ul>
                    </section>
                    <section className={styles.userAction}>
                        <ul>
                            <li>
                               <Button className={styles.button} onClick={handleMyProfileClick}>
                                   <div>
                                       <Person/>
                                       <span>Mein Profil</span>
                                   </div>


                               </Button>
                            </li>
                            <li >
                                <Button className={styles.button} onClick={logout}>
                                    <div>
                                        <Logout/>
                                        <span>Abmelden</span>
                                    </div>


                                </Button>
                            </li>
                        </ul>

                    </section>
                </main>
            </div>
        </ClickAwayListener>
    )
}