import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil";
import Navbar from "./NavBar";
import { authenticateAtom } from "./atoms/authenticate";
import Button from "./Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "./atoms/atomVariables";

export default function Signin(){
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const setSignedIn = useSetRecoilState(authenticateAtom);

    // when i signin again after signin the userDeatils dosen't change , i need to hard reload to update it to avoid that so using refresher 
    const refreshUserInfo = useRecoilRefresher_UNSTABLE(userInfo);

    const onSubmit = async() =>{
        try{
            let response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            })
            localStorage.setItem("token",response.data.authorization); 
            setSignedIn(localStorage.getItem("token"));
            refreshUserInfo();
            navigate("/");
        }
        catch(error){
            alert("signin failed");
        }
    }
    return (
        <>
        <div className=" flex flex-col h-full w-full">
            <Navbar/>
            <div className=" flex flex-col justify-center items-center mt-28  mx-auto h-2/3 p-8 border-2 rounded-md ">
                <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Email id" className="border-gray-200 border-2 rounded-md px-2 my-2" />
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="border-gray-200 border-2 rounded-md px-2 my-2" />
                <Button onClick={onSubmit} className="mt-8" heading={"Signin"} />
            </div>                                                                                                
        </div>
        </>
    )
}