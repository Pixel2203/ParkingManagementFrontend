import {ReactElement, useRef, useState} from "react";
import styles from "@/styles/booking.module.css"
import {Alert, Snackbar} from "@mui/material";
import {userData, SnackbarComponent} from "@/utils/types";
import * as EmailValidator from 'email-validator'
export default function ({setUserData,snackbarComponent}: {setUserData:(data: userData) => void, snackbarComponent:SnackbarComponent}):ReactElement {

    const plateInputRef = useRef<HTMLInputElement>(null)
    const brandInputRef = useRef<HTMLInputElement>(null)
    const modelInputRef = useRef<HTMLInputElement>(null)
    const preNameInputRef = useRef<HTMLInputElement>(null)
    const nameInputRef = useRef<HTMLInputElement>(null)
    const telefonInputRef = useRef<HTMLInputElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const companySelectRef = useRef<HTMLSelectElement>(null)


    const checkIsNum = (number:string | undefined): boolean => {
        if(!number){
            return false;
        }
        const parsedNumber = parseInt(number);
        if(typeof(parsedNumber) == "number" && !isNaN(parsedNumber)){
            return true;
        }
        return false;
    }
    const submitRequest = async () => {
        const validated = validateForm();
        if(validated){
            if(!nameInputRef.current|| !plateInputRef.current || !companySelectRef.current || !emailInputRef.current || !modelInputRef.current || !brandInputRef.current || !telefonInputRef.current || !preNameInputRef.current){
                return false;
            }
            const userData:userData = {
                brand: brandInputRef.current.value,
                email: emailInputRef.current.value,
                name: nameInputRef.current.name,
                plate: plateInputRef.current.value,
                company: companySelectRef.current.value,
                prename: preNameInputRef.current.value,
                telephone: telefonInputRef.current.value,
                model: modelInputRef.current.value
            }
            setUserData(userData);
            snackbarComponent.displaySnackbar(<Alert severity={"success"}>
                Successfully logged in!
            </Alert>)
        }else {
            snackbarComponent.displaySnackbar(<Alert severity={"error"}>
                Login data was invalid!
            </Alert> )
        }
    }
    const validateForm = (): Boolean => {

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
        return true;
        // Validate Name
        const name = nameInput.value;
        if(name.length == 0){
            return false;
        }
        // Validate Kennzeichen
        const plate = plateInput.value;
        if(plate.length == 0 || plate.length > 8){
            return false;
        }
        // Auf eine Zahl darf kein Buchstabe mehr folgen!
        let allowed: boolean = true;
        for(let i = 0; i < plate.length; i++){
            if(checkIsNum(plate.at(i))){
                for(let t = i; t < plate.length; t++){
                    if(!checkIsNum(plate.at(t))){
                        allowed = false;
                        break;
                    }
                }
                if(!allowed){
                    break;
                }
            }
        }
        if(!allowed){
            return false;
        }

        // Validate Email
        const email = emailInput.value;
        if(!EmailValidator.validate(email)){
            return false;
        }

        // Validate brand
        const brand: string = brandInput.value;
        if(brand.length == 0){
            return false;
        }
        // Validate telefon
        const telephone = telefonInput.value;
        if(isNaN((telephone as unknown as number)) || telephone.length == 0){
            return false;
        }

        // Validate PreName
        const preName = preNameInput.value;
        if(preName.length == 0){
            return false;
        }
        return true;
    }




    return (
        <>
            <div>
                <ul>
                    <li>
                        Vorname <input ref={preNameInputRef}/>
                    </li>
                    <li>
                        Nachname <input ref={nameInputRef}/>
                    </li>
                    <li>
                        Kennzeichen<input ref={plateInputRef}/>
                    </li>
                    <li>
                        Marke <input ref={brandInputRef}/>
                    </li>
                    <li>
                        Modell (Optional) <input ref={modelInputRef}/>
                    </li>
                    <li>
                        <select ref={companySelectRef}>
                            <option>AG</option>
                            <option>Systemhaus</option>
                        </select>
                    </li>
                    <li>
                        Email <input ref={emailInputRef}/>
                    </li>
                    <li>
                        Telefon <input ref={telefonInputRef}/>
                    </li>
                </ul>
                <button onClick={submitRequest}>Absenden</button>
            </div>

        </>
    )
}