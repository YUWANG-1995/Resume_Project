import React, { useContext } from "react";
import {StateContext} from "../App";
import CarListItem from "../CarListItem/CarListItem";
import styles from "./InventoryPage.module.css";

const InventoryPage = () => {

  const context = useContext(StateContext);
  let count = 1;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Inventory Page</h2>
      </div>
      <div className={styles.inventory}>
        <ul className={styles.carList}>
          {Object.values(context.state.carList).map((car) => {
            return (
              <CarListItem key={count++} brand={car.brand} model={car.model} quantity={car.quantity}/>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default InventoryPage;
