import {createSlice} from "@reduxjs/toolkit"


const userSlice=createSlice({

    name:"user",
    initialState:{
        userData:null,
        suggestedUsers:null
    },

    reducers:{                                      //yeh initialState ma value dalta ha
                
        setUserData:(state,action)=>{                 //we can access UserData through state
 
            state.userData=action.payload
        },
         setSuggestedUsers:(state,action)=>{                 //we can access UserData through state
 
            state.suggestedUsers=action.payload
        }

    }

})

export const {setUserData,setSuggestedUsers}=userSlice.actions          //yeh is ka aleda syntax ha reducer export karne ka

export default userSlice.reducer