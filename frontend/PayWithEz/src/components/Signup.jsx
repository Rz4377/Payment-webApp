
import { useState } from "react";
import Button from "./Button";
import Navbar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
    const navigate = useNavigate();
    const [firstName ,setFirstName] = useState("");
    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");


    const onSubmit = async() =>{
        try{
            let response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                firstName,
                username,
                password
            })
            if(response.status == 201){
                alert("user signed up");
                navigate("/signin");
            }
        }
        catch(error){
            alert("signup failed")
        }
    }
    return (
        <>
        <div className=" flex flex-col h-full w-full">
            <Navbar/>
            <div className=" flex flex-col justify-center items-center mt-28  mx-auto h-2/3 p-8 border-2 rounded-md ">
                <input onChange={e => setFirstName(e.target.value) } type="text" placeholder="First name" className="border-gray-200 border-2 rounded-md px-2 my-2" />
                <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Email id" className="border-gray-200 border-2 rounded-md px-2 my-2" />
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="border-gray-200 border-2 rounded-md px-2 my-2" />
                <Button onClick={onSubmit} className="mt-8" heading={"Signup"} />
            </div>                                                                                                
        </div>
        </>
    )
}