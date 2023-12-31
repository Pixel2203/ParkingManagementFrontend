import {ReactElement, useRef, useState} from "react";
import {Alert, Button, MenuItem, Select, Snackbar, TextField} from "@mui/material";
import {User, SnackbarComponent} from "@/utils/types";
import * as EmailValidator from 'email-validator'
import {LogoDev} from "@mui/icons-material";
import styles from "./LoginForm.module.css"
import * as RequestHandler from "@/utils/RequestHandler"
import * as Validator from "@/utils/Validator"
import {ERROR_ACCOUNT_SUSPENDED_ALERT, NO_SERVER_FOUND_ALERT, SUCCESS_LOGGED_IN_ALERT} from "@/utils/fields";
export default function ({setUserData,snackbarComponent}: {setUserData:(data: User) => void, snackbarComponent:SnackbarComponent}):ReactElement {

    const plateInputRef = useRef<HTMLInputElement>(null)
    const brandInputRef = useRef<HTMLInputElement>(null)
    const modelInputRef = useRef<HTMLInputElement>(null)
    const preNameInputRef = useRef<HTMLInputElement>(null)
    const nameInputRef = useRef<HTMLInputElement>(null)
    const telefonInputRef = useRef<HTMLInputElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const companySelectRef = useRef<HTMLSelectElement>(null)

    const requestUserService = (user:User) => {
        RequestHandler.checkUserService(user).then(res => {
            console.log(res)
            if(!res){
                snackbarComponent.displaySnackbar(NO_SERVER_FOUND_ALERT)
                return;
            }
            if(!res.worked){
                console.log("HAT NICHT GEKLAPPT!")
                console.log(res);
                return;
            }
            if(res.user.id){
                if(!res.user.penalties && res.user.penalties != 0){
                    console.log("KEINE PENALTIES GEFUNDEN")
                    return;
                }
                const penalties:number = res.user.penalties;
                if(penalties < 2){
                    setUserData(res.user);
                    snackbarComponent.displaySnackbar(SUCCESS_LOGGED_IN_ALERT)
                    return;
                }
                snackbarComponent.displaySnackbar(ERROR_ACCOUNT_SUSPENDED_ALERT)
            }

        }).catch(() => console.log("EIN FEHLER!!!!"))
    }
    const submitRequest = async () => {
        const validated = validateForm();
        if(validated){
            if(!nameInputRef.current|| !plateInputRef.current || !companySelectRef.current || !emailInputRef.current || !modelInputRef.current || !brandInputRef.current || !telefonInputRef.current || !preNameInputRef.current){
                return false;
            }
            const user:User = {
                brand: brandInputRef.current.value,
                email: emailInputRef.current.value,
                name: nameInputRef.current.value,
                plate: plateInputRef.current.value,
                company: companySelectRef.current.value,
                prename: preNameInputRef.current.value,
                telephone: telefonInputRef.current.value,
                model: modelInputRef.current.value
            }
            requestUserService(user)
        }else {
            snackbarComponent.displaySnackbar(<Alert severity={"error"}>
                Login data was invalid!
            </Alert> )
        }
    }
    const validateForm = (): boolean => {

        // Validate Name
        if(!nameInputRef.current|| !plateInputRef.current || !companySelectRef.current || !emailInputRef.current || !modelInputRef.current || !brandInputRef.current || !telefonInputRef.current || !preNameInputRef.current){
            return false;
        }
        // Components did mount correctly
        const nameInput:HTMLInputElement = nameInputRef.current;
        const plateInput:HTMLInputElement = plateInputRef.current;
        const telefonInput:HTMLInputElement = telefonInputRef.current;
        const emailInput:HTMLInputElement = emailInputRef.current;
        const brandInput:HTMLInputElement = brandInputRef.current;
        const modelInput:HTMLInputElement = modelInputRef.current;
        const preNameInput:HTMLInputElement = preNameInputRef.current;
        return Validator.validateFormData(
            preNameInput.value,
            nameInput.value,
            emailInput.value,
            telefonInput.value,
            plateInput.value,
            brandInput.value);
        // Validate Name

    }
    const devLogin = () => {
        const user:User = {
            telephone: "+49 152 342 949 35",
            prename: "Marvin",
            name: "Kaiser",
            plate: "HDHM227",
            brand: "VW",
            email: "marvinkaiser20@gmail.com",
            company: "Bechtle AG"

        }
        requestUserService(user);
    }



    return (
        <>
            <div className={styles.contentWrapper}>
                <div className={styles.innerContainer}>
                    <div className={styles.content}>
                        <h2 className={styles.heading}>Anmelden</h2>
                            <TextField inputRef={preNameInputRef}   label={"Vorname"}           className={styles.inputField + " " + styles.prename} variant={"standard"}       required={true}/>
                            <TextField inputRef={nameInputRef}      label={"Nachname"}          className={styles.inputField + " " + styles.name} variant={"standard"}          required={true}/>
                            <Select    inputRef={companySelectRef}  label={"Gesellschaft"}      className={styles.inputField + " " + styles.company}variant={"standard"}        required={true} defaultValue={"AG"} >
                                <MenuItem value={"AG"}>AG</MenuItem>
                                <MenuItem value={"Systemhaus"}>Systemhaus</MenuItem>
                            </Select>
                            <TextField inputRef={emailInputRef}     label={"Email"}             className={styles.inputField + " " + styles.email} variant={"standard"}         required={true}/>
                            <TextField inputRef={telefonInputRef}   label={"Telefon"}           className={styles.inputField  + " " + styles.telephone} variant={"standard"}    required={true}/>
                            <TextField inputRef={plateInputRef}     label={"Kennzeichen"}       className={styles.inputField  + " " + styles.plate} variant={"standard"}        required={true}/>
                            <TextField inputRef={brandInputRef}     label={"Marke"}             className={styles.inputField + " " + styles.brand} variant={"standard"}         required={true}/>
                            <TextField inputRef={modelInputRef}     label={"Modell"} className={styles.inputField + " " + styles.model} variant={"standard"}/>
                        <Button variant={"contained"} onClick={submitRequest} className={styles.login}>Anmelden</Button>
                        <Button variant={"outlined"} onClick={devLogin} className={styles.loginDev}>Login DEV <LogoDev/></Button>
                    </div>
                </div>
            </div>

        </>
    )
}