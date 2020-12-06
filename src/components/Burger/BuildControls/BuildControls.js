import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((control, key) => {
        return (
          <BuildControl
            key={key}
            label={control.label}
            added={() => props.ingredientAdder(control.type)}
            removed={() => props.ingredientRemover(control.type)}
            isDisabled={props.disabledInfo[control.type]}
          />
        );
      })}
      <p>
        Current Price: $<strong>{props.price}</strong>
      </p>
      <button
        onClick={props.purchaseHandler}
        disabled={!props.isPurchaseable}
        className={classes.OrderButton}
      >
        Order Now
      </button>
    </div>
  );
};

export default BuildControls;
