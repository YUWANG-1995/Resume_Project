import React, { useState, useContext} from "react";
import styles from "./LoginPage.module.css";
import {StateContext} from "../App";


const LoginPage = () => {

  const context = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleLogin = () => {
    context.fetchLogin(username, password);
  }

  const handleSignup = () => {
    context.dispatch({type: 'CLICK_SIGNUP', payload: true});
    context.dispatch({type: 'ERROR_FOUND', payload:''});
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
    if(e.target.value.length > 0 && password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if(e.target.value.length > 0 && username.length > 0) {
      setBtnDisabled(false);
    }else{
      setBtnDisabled(true);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>LOG IN PAGE</h1>
      </div>
      <div className={styles.elem}>
        <label>username: </label>
        <input type="text" onChange={handleUsername} />
      </div>
      <div className={styles.elem}>
        <label>password: </label>
        <input type="password" onChange={handlePassword} />
      </div>
      <div>
        <button className={styles.loginBtn} onClick={handleLogin} disabled={btnDisabled}>Log in</button>
      </div>
      <div className={styles.signUp}>
        <div>
          <p className={styles.signUpText}>Do not have an account?</p>
        </div>
        <div className={styles.signUpBtn}>
          <a className={styles.btnText} onClick={handleSignup}>Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
