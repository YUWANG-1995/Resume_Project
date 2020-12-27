import React, {useState, useContext } from "react";
import {StateContext} from "../App";
import styles from "./CarListItem.module.css";


const CarListItem = ({brand, model, quantity}) => {
  const context = useContext(StateContext);

  const handleAdd = () => {
    const method ='add';
    context.crudOperation(brand, model, method);
  }

  const handleDecrease = () => {
    const method = 'decrease';
    context.crudOperation(brand, model, method);
  }

  const handleDelete = () => {
    const method = 'delete';
    context.crudOperation(brand, model, method);
  }
  return (
    <li className={styles.container}>
      <div>
        <label>brand: <span className={styles.text}>{brand}</span></label><br/>
      </div>
      <div>
        <label>model:  <span className={styles.text}>{model}</span></label><br/>
      </div>
      <div className={styles.carItem}>
          <label className={styles.header}>quantity: </label>
          <button className={styles.button} onClick={handleDecrease}>-</button>
          <label className={styles.text}>{quantity}</label>
          <button className={styles.button} onClick={handleAdd}>+</button>
          <button className={styles.button} onClick={handleDelete}>delete</button>
      </div>
    </li>
  )
}

export default CarListItem;
