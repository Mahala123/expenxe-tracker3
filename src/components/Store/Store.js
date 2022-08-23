import React,{useState} from "react"
const AuthContext=React.createContext({
    token:"",
    isLogIn:false,
    logIn:(token)=>{},
    logOut:()=>{}
    
})
export const AuthContextProvider=(props)=>{
    const[token,setToken]=useState(null)
    const userIsLogIn=!!token
    const logInHandler=(token)=>
    {
        setToken(token)
    }
    const logOutHndler=()=>{
        setToken(null)
    }
    
    const contextValue={
        token:token,
        isLogIn:userIsLogIn,
        logIn:logInHandler,
        logout:logOutHndler
        
    }
        return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext ;