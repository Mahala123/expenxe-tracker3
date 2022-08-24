import React from 'react'

function ExpenseForm() {
  return (
    <div>
    <h1>Enter Your Expense</h1>

<form className="details" >
  <div>
    <span>Type:</span>
    <select >
      <option value="food">FOOD</option>
      <option value="petrol">PETROL</option>
      <option value="salery">SALERY</option>
      <option value="other">Other</option>
    </select>
    <span>
      <span>DESCRIPTION:</span>
      <input
        type="text"
        placeholder="Description?"
        
      />
    </span>
  </div>

  <div>
    <span>Amount:</span>
    <input
      type="number"
      placeholder="How much amount?"
      
    />
  </div>
 <button type="submit" className="signupBtn">
    SUBMIT
  </button>
</form>
<button>DOWNLOAD YOUR EXPENSE</button>
</div>
  )
}

export default ExpenseForm
