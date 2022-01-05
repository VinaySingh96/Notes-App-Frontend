import AuthContext from "./AuthContext";
import React, { useState } from "react";
import {useHistory} from 'react-router-dom';

const AuthToken = (props) => {
  let history=useHistory();

  const [token, setToken] = useState("");
  const updateToken=(value)=>{
    // console.log(value)
    setToken(value.authToken);
    
    // redirect
    history.push("/");
  }

  return (
    <AuthContext.Provider value={{token,updateToken}}>
      {props.children}
      </AuthContext.Provider>
  )
}

export default AuthToken
