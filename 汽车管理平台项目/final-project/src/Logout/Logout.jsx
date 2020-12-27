import React, {useContext} from "react";
import styles from "./Logout.module.css";
import { StateContext } from "../App";


const Logout = () => {
  const context = useContext(StateContext);

  const handleClick = () => {
    context.fetchLogOut();
  }
  return (
    <div>
    <button className={styles.btn} onClick={handleClick}>Log out</button>
    </div>
  )
}

export default Logout;
