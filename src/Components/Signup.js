import React, {useState,useContext} from 'react'
import AuthContext from '../context/AuthContext';

const Signup = () => {
  const context=useContext(AuthContext);
  const {updateToken}=context;


  const [credentials, setCredentials] = useState({ name:"", email: "", password: "" ,confPass:""})
  const url = "http://localhost:8000"

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value })
  }
  const clickSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials.email + credentials.password);
    if(credentials.password!==credentials.confPass)
    {
      alert("Password does not match");
      return ;
    }

    const result = await fetch(`${url}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName:credentials.name, userEmail: credentials.email, userPassword: credentials.password })
    });
    const data = await result.json();
    // console.log(data);
    updateToken(data);
    // localStorage.setItem('token',)
    localStorage.setItem('token',data.authToken)
  }

  return (
    <>
      <div className='container justify-content-center w-50 p-3'>
        <form onSubmit={clickSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Enter Your Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} id="name" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" required/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" data-toggle="password" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
            <input type="text" className="form-control" name='confPass' value={credentials.confPass} onChange={onChange} id="confirmPassword" data-toggle="password" required/>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup