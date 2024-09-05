import Button from "./Button";
import { authenticateAtom } from "./atoms/authenticate.js";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import { useRecoilState } from "recoil";

export default function GetProfile(){
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useRecoilState(authenticateAtom);
    const onSignup = ()=>{
        navigate("/signup")
    };

    const onSignin = ()=>{
        navigate("/signin")
    }

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        setAuthenticated(null);
        return(
            <></>
        )
    }
    if(authenticated) {
        return (
            <>
                <Profile /> 
                <Button onClick={handleLogout} heading={"Logout"}/>
            </>
        )
    }
    else{
        return ( // update with skeleton ui later
            <>
                <div>
                    <Button onClick={onSignup} heading={"Signup"}/> 
                    <Button onClick={onSignin} heading={"Signin"}/>
                </div>
            </>)
    }
}