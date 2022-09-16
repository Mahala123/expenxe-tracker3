import { configureStore, createSlice } from "@reduxjs/toolkit"
const initialAuth={
 idToken: localStorage.getItem("token") || "",
 logeIn:localStorage.getItem("token") ? true : false,
}

const authslice=createSlice({
  name:'auth',
  initialState: initialAuth,
  reducers:{
      logedIn(state,action){
          state.logeIn=!state.logeIn;
      },
      tokenId(state,action){
          state.idToken=action.payload;
          localStorage.setItem('token',action.payload)
      },
      logOut(state){
           state.idToken=null;  
           localStorage.removeItem('token') 
      }
  }
})
const initialExpState = {
  expenses: {},
  totalExpense: 0,
  isPremium:false
};

const expSlice = createSlice({
  name: "expenses",
  initialState: initialExpState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setTotalExpense(state, action){ 
      state.totalExpense = action.payload;
    },
    setPremium(state, action) {
      state.isPremium = action.payload;
    },
  },
});

const store=configureStore({
    reducer:{auth:authslice.reducer,exp:expSlice.reducer}
})
export const authsliceactions=authslice.actions;
export const expnseSliceActions=expSlice.actions;

export default store;