import React from "react";
import classes from "./BuildControl.css";

const BuildControl = (props) => {
  let ingredientClass = [classes.Label];
  switch (props.label) {
    case "Salad":
      ingredientClass.push(classes.Salad);
      break;
    case "Meat":
      ingredientClass.push(classes.Meat);
      break;
    case "Cheese":
      ingredientClass.push(classes.Cheese);
      break;
    case "Bacon":
      ingredientClass.push(classes.Bacon);
      break;
    default:
      ingredientClass.push(classes.Salad);
  }
  let labelClass = ingredientClass.join(" ");

  return (
    <div className={classes.BuildControl}>
      <div className={labelClass}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={props.removed}
        disabled={props.isDisabled}
      >
        -
      </button>
      <button className={classes.More} onClick={props.added}>
        +
      </button>
      <div className={labelClass}>(${props.price})</div>
    </div>
  );
};

export default BuildControl;
