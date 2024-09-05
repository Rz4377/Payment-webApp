import axios from "axios";
import { authenticateAtom } from "./atoms/authenticate";
import Button from "./Button";
import { setToAtom, triggerFetchAtom, userInfo } from "./atoms/atomVariables";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentGateway() {
  const authenticated = useRecoilValue(authenticateAtom);
  const getUserInfo = useRecoilValue(userInfo);
  const to = useRecoilValue(setToAtom);
  const [amount, setAmount] = useState(0);
  const [triggerFetch,setTriggerFetch] = useRecoilState(triggerFetchAtom);
  const navigate = useNavigate();

  const handleTransaction = async() =>{
    if(amount >= 0){    
      try{
        await axios.put("http://localhost:3000/api/v1/account/transfer",
          {
            from : getUserInfo.username, 
            to ,
            amount
          },
          {
          headers: {
            authorization : "Bearer " + authenticated
          }
          }
          )
        alert("transfer completed");
        try{
          setTriggerFetch(!triggerFetch);
          navigate("/")
        }
        catch(error){
          console.log("recoil auto-re-render failed");
          navigate("/")
        }
      }
      catch(error){
        alert("couldn't transfer , server issue")
      }
    }
    else{
      alert("Enter valid amount")
    }
      
  }

  if (authenticated) {
    return (
      <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="border-2 h-56 w-96 rounded-md">
          <div className="py-8 flex flex-row justify-center">
            <span className="inline-flex items-center justify-center w-10 h-10 mr-5 bg-gray-600 text-white rounded-full text-2xl">R</span> <h1 className="text-2xl font-semibold"> Rakshit </h1>
          </div>

          <div className="flex flex-col justify-center items-center">
            <input onChange={e => setAmount(e.target.value)} placeholder="Amount" className="border-2 w-2/3 px-2" />
          </div>
          <br />
          <div className=" flex justify-center">
              <Button onClick={handleTransaction} heading={"PAY"}/>
          </div>
        </div>
      </div>
      </>
    )
  } else {
    return (
      <div className="h-screen w-screen">
        <img src="../public/frontend/PayWithEz/public/accessDenied.webp" alt="404 ERROR" />
        <div>Unauthorized access, Please sign in first</div>
      </div>
    );
  }
}
