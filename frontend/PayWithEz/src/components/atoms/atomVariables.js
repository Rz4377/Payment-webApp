import { atom ,atomFamily,selector, selectorFamily } from "recoil";
import axios from "axios";

export const setToAtom = atom({
    key:"setToAtom",
    default:""
})

export const userInfo = selector({
    key:'getUserInfoSelector',
    get : async({get}) =>{
        try{
            let token = localStorage.getItem("token") || null;
            if(token){
                let response = await axios.get("http://localhost:3000/api/v1/user/me",{
                    headers : {
                        authorization: "Bearer " + token
                    }
                })
                return {
                    firstName : response.data.firstName,
                    username : response.data.username
                }
            }
            else{
                console.log("token null/undefined");
                return {
                    firstName : "",
                    username : "",
                }
            }
        }
        catch(error){
            console.log("token invalid");
            localStorage.removeItem("token");
            window.location.href="/"
            console.log("error occured while fetching user data");
        }
    } 
})

export const triggerFetchAtom = atom({
    key:'triggerFetch',
    default:false
})

export const balanceState = atom({
    key:'LoadBalanceAtomOn2',
    default : selector({
        key:'getBalanceSelector',
        get: async({get}) => {
            try{
                get(triggerFetchAtom);
                const token = localStorage.getItem("token");
                if(token){
                    let response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                        headers:{
                            authorization: "Bearer " + token
                        }
                    })
                    return response.data.balance
                }a
                return null; // indication some issue 
            }
            catch(error){
                console.log("error inside get Balance : ", error);
                return 0;
            }
            
        }
    })
})


export const getUsersList = atomFamily({
    key:"usersListatomFam",
    default:selectorFamily({
        key:'userListUsingSelector',
        get: searchFilter => async({get})=> {
            let token = localStorage.getItem("token");
            if (!token) {
                console.log("Token is missing");
                return []; 
            }
            try{
                if(token){
                    let response = await axios.get("http://localhost:3000/api/v1/user/users",{
                        headers : {
                            authorization : "Bearer " + token
                        }
                    })
                    let filteredData = response.data.mappedData.filter((user)=> user.firstName.startsWith(searchFilter));
                    return filteredData;
                }
            }
            catch(error){
                console.log("error -> ",error);
            }
        }
    })

}) 