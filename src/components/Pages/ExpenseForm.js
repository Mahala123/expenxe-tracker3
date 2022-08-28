import React, { useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { expnseSliceActions } from "../Store/Store";
//import Movieslist from './ExpenseList'

function ExpenseForm() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.exp.expenses);
  // const[expense,setExpense]=useState({})
  //const AuthCtx= useContext(AuthContext)
  // const[value,setValue]=useState([])
  const [premium,setPremium]=useState(false)
  const useDes = useRef();
  const refAmount = useRef();
  const selectInp = useRef();
  
  
  const submitHandler = (event) => {
    event.preventDefault();
    
    const amount = refAmount.current.value;
    const description = useDes.current.value;
    const type = selectInp.current.value;
    if (!type) alert("Please select catagory");
    else {
      const expense = {
        id: Math.random(),
        cost: amount,
        catagory: type,
        description: description,
      };
      fetch(
        `https://expense-tracker-e3657-default-rtdb.firebaseio.com/expenses.json`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(expense),
        }
      )
        .then((res) => res.json())
        .then((resData) => {
          if (!resData.error) {
            fetch(
              `https://expense-tracker-e3657-default-rtdb.firebaseio.com/expenses.json`
            )
              .then((res) => res.json())
              .then((data) => {
                dispatch(expnseSliceActions.setExpenses(data));
              });
          } else {
            console.log(resData.error);
          }
        }); 
    } 
  };
  const editClick=(event)=>{
    const expId = event.target.id;
    const expenseData = expenses[expId];
    refAmount.current.value = expenseData.cost;
    selectInp.current.value = expenseData.catagory;
    useDes.current.value = expenseData.description;
    fetch(
      `https://expense-tracker-e3657-default-rtdb.firebaseio.com/expenses/${event.target.id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      // or get a new copy from server
      if (res.ok) {
        fetch(
          `https://expense-tracker-e3657-default-rtdb.firebaseio.com/expenses.json`
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(expnseSliceActions.setExpenses(data));
          });
      }
    });


  }
  const deleteClick=(event)=>
  {
fetch( `https://expense-tracker-e3657-default-rtdb.firebaseio.com/expenses/${event.target.id}.json`,
{
  method:"DELETE",
}  
)
.then((res) => {
  // or get a new copy from server
  if (res.ok) {
    fetch(
      `https://expense-tracker-e3657-default-rtdb.firebaseio.com/expenses.json`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        dispatch(expnseSliceActions.setExpenses(data));
      });
  }
});
  }
  const ExpensesJsx = () => {
    if (!expenses) return <p>No Expenses</p>;
    return (
      <ul>
        {Object.keys(expenses).map((item) => (
          <li key={item} id={item}>
            {`cost: ${expenses[item].cost}\tcatagory: ${expenses[item].catagory}\tdescription: ${expenses[item].description}`}
            <button id={item} onClick={editClick}>
              EDIT
            </button>
            <button id={item} onClick={deleteClick} >
          Delete
        </button>
      </li>
         ))} </ul>
    );
  };

  return (
    <div>
      <h1>Enter Your Expense</h1>
      <form className="details" onSubmit={submitHandler}>
        <div>
          <span>Type:</span>
          <select ref={selectInp}>
            <option value="food">FOOD</option>
            <option value="petrol">PETROL</option>
            <option value="salery">SALERY</option>
            <option value="other">Other</option>
          </select>
          <span>
            <span>DESCRIPTION:</span>
            <input ref={useDes} type="text" placeholder="Description?" />
          </span>
        </div>
        <div>
          <span>Amount:</span>
          <input ref={refAmount} type="number" placeholder="How much amount?" />
        </div>
        <button type="submit" className="signupBtn">
          SUBMIT
        </button>
        {!premium &&  <button type="submit" className="signupBtn">
            SUBMIT
          </button>}
          {premium && (
            <button
              type="submit"
              className="signupBtn"
              onClick={premiumHandler}
            >
              PREMIUM
            </button>
          )}
      </form>
      {/* <button>DOWNLOAD YOUR EXPENSE</button> */}
      <ExpensesJsx />
    </div>
  );
}

export default ExpenseForm;
