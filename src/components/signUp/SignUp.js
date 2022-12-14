import {  useRef} from "react";
import "./SignUp.css";
import { useHistory,NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { authsliceactions } from "../Store/Store";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInpRef = useRef();
  const history=useHistory();
//  const authCtx= useContext(AuthContext)
//   // console.log(history)
  // const confirmInpRef = useRef();
  const dispatch=useDispatch()
  const logIn = useSelector(state=>state.auth.logeIn)

  // const [isLogin, setIsLogin] = useState(true);
  

  const switchModeHandler = () => {
   dispatch(authsliceactions.logedIn())
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInpRef.current.value;

    // if (enteredPassword !== confirmInpRef.current.value) {
    //   alert("confirm password is not same");
    //   return;
    // }
    let url;
    if (logIn) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIpFpXqTkA-YkLV506rGbmUDu1_nJmw5I";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIpFpXqTkA-YkLV506rGbmUDu1_nJmw5I";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      Headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          // console.log(res)
          
          alert("Successfully created");
          return res.json();
        } else {
         return res.json().then((data) => {
             console.log(data.error.message);
            alert(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data)
        // authCtx.logIn(data.idToken)
        dispatch(authsliceactions.tokenId(data.idToken))
         history.replace('/welcome')
       
      }).catch((err)=>{
        alert(err.message)
       })
  };

  return (
    <section className="auth">
      <h1>{logIn ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="control">
          <input
            type="email"
            placeholder="Email"
            ref={emailInputRef}
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordInpRef}
            required
          />
         {/* {!isLogin && <input
            type="password"
            
            placeholder="Confirm Password"
            ref={confirmInpRef}
            required
          />}  */}
       
          <button>{logIn ? "Login" : "Create Account"}</button>
          <br />
          <button type="button" className="toggle" onClick={switchModeHandler}>
            {logIn ? "SignUp" : "Have an account?Login"}
          </button>
        </div>
        {logIn && <NavLink to='/password'>forget password?click</NavLink>}
      </form>
    </section>
  );
};


export default AuthForm;
