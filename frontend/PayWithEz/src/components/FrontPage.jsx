import PaymentPage from "./PayementPage";
import { useEffect, useState } from "react";

export default function FrontPage(props){
    let [token , setToken] = useState();

    useEffect(()=>{
      let token = localStorage.getItem("token");
      if(token){
        setToken(token);
      }
    },[])

    if(token != "" && token != null){
      return <PaymentPage className={props.className}/>
    }
    else if(token = ""){
      return(
        <>
          Loading...
        </>
      )
    }
    else{
        return <div>hello there </div>
    }
    
        
}