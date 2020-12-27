import React, { useContext } from "react";
import { StateContext } from "../App";
import Logout from "../Logout/Logout";
import styles from "./NavBar.module.css";

const NavBar = () => {

    const context = useContext(StateContext);
    const handleShowInventory = () => {
      context.dispatch({type:'SHOW_INVENTORY', payload:true});
      context.dispatch({type:'SHOW_ABOUT', payload:false});
      context.dispatch({type:'ADD_NEW_CAR', payload:false});
      context.getAllCars();
    }

    const handleNewCar = () => {
      context.dispatch({type:'SHOW_INVENTORY', payload:false});
      context.dispatch({type:'SHOW_ABOUT', payload:false});
      context.dispatch({type:'ADD_NEW_CAR', payload:true});
    }

    const handleAbout = () => {
      context.dispatch({type:'SHOW_INVENTORY', payload:false});
      context.dispatch({type:'SHOW_ABOUT', payload:true});
      context.dispatch({type:'ADD_NEW_CAR', payload:false});
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <div>
          </div>
          <div>
          <h1>Welcome you! <span className={styles.adminName}>{context.state.userName}</span></h1>
          </div>
          <div className={styles.logoutBtn}>
            {context.state.isLoggedIn ? <Logout /> : ''}
          </div>
        </div>
          <ul className={styles.navbar}>
            <li onClick={handleShowInventory} className={styles.navLink}>
              <a>Show Inventory</a>
            </li>
            <li onClick={handleNewCar} className={styles.navLink}>
              <a>Add New Car</a>
            </li>
            <li onClick={handleAbout} className={styles.navLink}>
              <a> About Us</a>
            </li>
          </ul>
      </div>
    )
}

export default NavBar;
