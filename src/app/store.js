// import {configureStore} from "@reduxjs/toolkit";
// import userReducer from "../features/userSlice";

// export default configureStore({
//     reducer:{
//         user:userReducer,
//     },
// });
import {create} from "zustand"; 
export default useStore = create((set)=>({
    user:null,
    login:(state,action)=>{
        state.user=action.payload;
    },
    logout:(state)=>{
        state.user=null;
    }
}

))