import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { withRouter } from "react-router-dom";

const burger = (props) => {
  let ingredientsArray = Object.keys(props.ingredients)
    .map((key) => {
      return [...Array(props.ingredients[key])].map((_, i) => {
        return <BurgerIngredient key={key + i} type={key} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  ingredientsArray =
    ingredientsArray.length === 0 ? (
      <p>Please start adding your ingredients</p>
    ) : (
      ingredientsArray
    );
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
