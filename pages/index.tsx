import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import LoginForm from "@/pages/components/LoginForm/LoginForm";
import {ReactElement, useState} from "react";
import {SnackbarComponent, User} from "@/utils/types";
import ParkingLotList from "@/pages/components/ParkingLotList/ParkingLotList";
import {Snackbar} from "@mui/material";
import AppHeader from "@/pages/components/AppHeader/AppHeader";
import ProfilePage from "@/pages/components/ProfilePage/ProfilePage";
import styles from "@/styles/Home.module.css";
import BookingPage from "@/pages/components/BookingPage/BookingPage";

const inter = Inter({ subsets: ['latin'] })

export default function () {
    const [userData,setUserData] = useState<User | null>(null)
    const [open,setOpen] = useState<boolean>(false);
    const [snackbarContent, setSnackbarContent] = useState<ReactElement>(<></>);
    const [contentSite,setContentSite] = useState<String>("ppl")
    const showSnackbar = (content: ReactElement) => {
        setSnackbarContent(content)
        setOpen(true);
    }
    const hideSnackbar = () => {
        setOpen(false);
    }
    const snackbarComponent: SnackbarComponent = {
        displaySnackbar: showSnackbar
    };
    return (
        <>
          <Head>
            <title>E-Management</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
            <div className={styles.wrapper}>
            <main className={styles.body}>
                <AppHeader setUserData={setUserData} userData={userData} setContentSite={setContentSite}/>
                {
                    !userData &&
                    <LoginForm setUserData={setUserData} snackbarComponent={snackbarComponent}/>
                }
                {
                    userData && contentSite=="ppl" &&
                    <ParkingLotList uData={userData} snackbar={snackbarComponent}/>
                }
                {
                    userData && contentSite=="pfp" &&
                    <ProfilePage userData={userData} snackbar={snackbarComponent}/>
                }
                {
                    userData && contentSite=="br" &&
                    <BookingPage snackbar={snackbarComponent} userData={userData}/>
                }
                <Snackbar open={open} onClose={hideSnackbar} autoHideDuration={3000}  >
                    {snackbarContent}
                </Snackbar>
            </main>
            </div>

        </>
      )
}
//TODO Vorschläge für Reservierung
//TODO Buchungshistorie
//TODO Status LED beim Buchen (Ist das ausgewählte Timestamp frei?)

