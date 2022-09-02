import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

const Login = () => {
  const context=useContext(AuthContext);
  const {updateToken}=context;


  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const url = "http://localhost:8000"

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value })
  }
  const clickSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials.email + credentials.password);

    const result = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userEmail: credentials.email, userPassword: credentials.password })
    });
    const data = await result.json();
    const data2=JSON.stringify(data);
    if(data2[2]==='e')
    {
      alert("Invalid Email/Password");
      return;
    }
    updateToken(data);
    // console.log(data);
    // localStorage.setItem('token',)
    localStorage.setItem('token',data.authToken)
  }

  return (
    <>
      <div className='container justify-content-center w-50 p-3'>
        <form onSubmit={clickSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}  id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" data-toggle="password" />

          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login
