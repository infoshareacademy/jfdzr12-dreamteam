import { FormForGuest } from "~/blocks/form-for-guest";

export default function GuestPage(){
    return <FormForGuest onSubmit={(e)=>{console.log(e)}}/>
}