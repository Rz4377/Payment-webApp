import { Balance } from "../DynamicValues";
import { useState } from "react";
import ToggleDivs from "./ToggleDiv";

export default function PaymentPage(props){
    const [searchFilter,setSearchFilter] = useState("");
    console.log("on payement page..")
    return (
        <div>
            <div className={props.className} >Your balance : <Balance/> </div>
            <input onChange={e => setSearchFilter(e.target.value)} className="border-2 w-full mt-8 mb-6 p-2 rounded-md text-balance font-normal" type="text" placeholder="Search.." />
            <ToggleDivs searchFilter={searchFilter}/>
        </div>
    )
}
