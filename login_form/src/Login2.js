import React from 'react';

const Login = (props) => {
  const {email,setEmail,password,setPassword, handleLogin, handleSignup,
  hasAccount, setHasAccount, emailError,passwordError}=props;
  return (
    <div className="wrapper">
    <div className="form-wrapper">
    <h1 id='h1'>Projekt Labor</h1>
    <div className="userName">
    <label htmlFor="userName">User Name</label>
    <input type="text" placeholder="User Name"  autoFocus required id="name"
    value={email} onChange={(e)=> setEmail(e.target.value)}/>
    <p className="errorMsg">{emailError}</p>



    </div>
    <div className="password">
    <label htmlFor="password">Password</label>
    <input placeholder="Password" type="password" name="password"
    required value={password} noValidate id="pw" onChange={(e)=> setPassword(e.target.value)}/>
    <p className="errorMsg">{passwordError}</p>

    </div>
    <div className="createAccount">
    {hasAccount ? (
      <>
      <button type="submit" onClick={handleLogin}>Login</button>
      <small> Don't Have an Account?</small><span onClick={()=> setHasAccount(!hasAccount)}>Sign Up</span>
      </>
    ):(
      <>
      <button type="submit" id="lgn" onClick={handleSignup}>Sign Up</button>

      <small>Already Have an Account?</small><span onClick={()=> setHasAccount(!hasAccount)}>Login</span>
      </>
    )}
    </div>

    </div>
    </div>
  )
}

export default Login;
