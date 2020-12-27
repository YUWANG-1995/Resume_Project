import React, {useContext} from "react";
import {StateContext} from "../App";
import styles from "./Error.module.css";


const Error = () => {
  const context = useContext(StateContext);


  return(
    <div className={styles.container}>
      <p className={styles.text}>FOUND ERROR: {context.state.error}</p>
    </div>
  )
}

export default Error;
