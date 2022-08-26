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
const initialExpState = {
  expenses: {},
  totalExpense: 0,
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
    }
  },
});

const store=configureStore({
    reducer:{auth:authslice.reducer,exp:expSlice.reducer}
})
export const authsliceactions=authslice.actions;
export const expnseSliceActions=expSlice.actions;

export default store;