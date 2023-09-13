import * as EmailValidator from "email-validator";

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
export function validateFormData  (prename: string , name: string, email: string, telephone: string, plate: string, brand: string): boolean  {
    const requiredFields = [];
    requiredFields.push(prename);
    requiredFields.push(name);
    requiredFields.push(email);
    requiredFields.push(telephone);
    requiredFields.push(plate);
    requiredFields.push(brand);

    requiredFields.forEach((item:string) => {
        if(item == "" || item.length == 0){
            return false;
        }
    })

    if(plate.length > 8){
        return false;
    }
    // Validate Kennzeichen
    if(!validatePlate(plate)){
        return false;
    }
    // Validate Email
    if(!EmailValidator.validate(email)){
        return false;
    }
    // Validate telefon
    if(isNaN((telephone as unknown as number)) || telephone.length == 0){
        return false;
    }
    return true;
}
const validatePlate = (plate:string): boolean => {
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
    return allowed;
}
