import React, { useState, useContext } from "react";
import { StateContext } from "../App";
import styles from "./AddNewCar.module.css";

const NewCar = () => {

    const context = useContext(StateContext);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleBrand = (e) => {
      setBrand(e.target.value);
    }
    const handleModel = (e) => {
      setModel(e.target.value);
    }
    const handleQuantity = (e) => {
      setQuantity(e.target.value);
    }
    const handleClick = () =>{
      context.addNewCar(brand, model, quantity);
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Add new car to our Inventory</h2>
        </div>
        <div className={styles.formList}>
          <div className={styles.item}>
            <label className={styles.text}>Brand: </label>
            <input type="text" onChange={handleBrand} required/>
          </div>
          <div className={styles.item}>
            <label className={styles.text}>Model: </label>
            <input type="text" onChange={handleModel} required/>
          </div>
          <div className={styles.item}>
            <label className={styles.text}>quantity: </label>
            <input type="number" min="0" onChange={handleQuantity} placeholder="positive number" required/>
          </div>
          <div className={styles.item}>
            <button className={styles.btn} onClick={handleClick}>Submit</button>
          </div>
        </div>
      </div>
    )
}
export default NewCar;
