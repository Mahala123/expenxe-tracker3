import { configureStore, createSlice } from "@reduxjs/toolkit"
const authslice=createSlice({


  name:'auth',
  initialState: {logeIn:true,idToken:null},
  reducers:{

      logedIn(state){

          state.logeIn=!state.logeIn;
      },
      tokenId(state,action){
          state.idToken=action.payload;
      },
      deletetokenId(state){
           state.idToken=null;   
      }
  }
})




const store=configureStore({
    reducer:{auth:authslice.reducer,exp:expSlice.reducer}
})
export const authsliceactions=authslice.actions;
export const expnseSliceActions=expSlice.actions;

export default store;