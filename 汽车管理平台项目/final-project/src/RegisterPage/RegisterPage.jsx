import React, { useState, useContext } from "react";
import {StateContext} from "../App";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {

  const context = useContext(StateContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleClick = (e) => {
    context.fetchRegister(username, password);
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
    if(e.target.value.length > 0 && password.length > 0) {
      setBtnDisabled(false);
    }else {
      setBtnDisabled(true);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if(e.target.value.length > 0 && username.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true)
    }
  }

  return(
    <div className={styles.container}>
      <div className={styles.title}>
        <h1> Welcome you! New user </h1>
      </div>
      <div className={styles.elem}>
        <label className={styles.text}>username: </label>
        <input type="text" onChange={handleUsername} />
      </div>
      <div className={styles.elem}>
        <label className={styles.text}>password: </label>
        <input type="password" onChange={handlePassword} />
      </div>
      <div className={styles.elem}>
        <button className={styles.btn} onClick={handleClick} disabled={btnDisabled}>Sign Up</button>
      </div>
    </div>
  )
}

export default RegisterPage;
