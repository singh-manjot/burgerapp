import React from "react";
import Aux from "../../../HOC/Aux/Aux";
import Button from "../../ui/Button/Button";
import classes from './OrderSummary.css'

//move prices to Firebase
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2,
  cheese: 1,
  bacon: 1,
};

const OrderSummary = (props) => {
  const ingredientRows = Object.keys(props.ingredients).map((key) => {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{props.ingredients[key]}</td>
        <td>${INGREDIENT_PRICES[key]*props.ingredients[key]}</td>
      </tr>       
    );
  });

  const ingredientsSummary = <table className={classes.SummaryTable}>
    <tbody>
    <tr key="head">
      <th>Ingredient</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
    {ingredientRows}
    </tbody>
  </table>
  return (
    <Aux>
      <div className={classes.Class}>
      <h3 className={classes.Header}>Order Summary</h3>
      {ingredientsSummary}
      <p>
        <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
      </p>
      <Button btnType="Danger" clicked={props.purchaseCancelHandler}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinueHandler}>
        Proceed To Checkout
      </Button>
      </div>
    </Aux>
  );
};

export default OrderSummary;
