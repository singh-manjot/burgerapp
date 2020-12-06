import React from "react";
import Burger from "../../Burger/Burger";
import classes from  './CheckoutSummary.css'
import ContactData from "../../../containers/Checkout/ContactData/ContactData";
const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Almost There!</h1>
      <div>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <ContactData {...props}></ContactData>
    </div>
  );
};

export default CheckoutSummary;
