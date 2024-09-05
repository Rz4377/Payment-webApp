import { atom } from "recoil";

//for signup i think selectors are more than enough
const authenticateAtom = atom({
    key :'checkAuthenticated',
    default:localStorage.getItem("token") || null // bad idea when i put selector and tried sending asyncrounous request from here to backend as for any change in 
                  // email and password triggers a backend request even though i never clicked on submit button
});

export {
    authenticateAtom
};