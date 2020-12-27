import React from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h1> About Our Inventory System </h1>
      <p>
        The Car Inventory Provide an Inventory System that administrator can look the latest Inventory status and process CRUD operations.<br/>
        In the Inventory, we can see car's brand, model and quantity, So you can easy to make CRUD operation and know inventory of all cars.<br/>
      </p>
    </div>
  )
}
export default AboutUs;
