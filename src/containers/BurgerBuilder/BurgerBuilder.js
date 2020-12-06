import React, { useState, useEffect } from "react";
import Aux from "../../HOC/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/ui/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [inCart, setInCart] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const totalPrice = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });

  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });

  const onIngredientAdded = (ingredientName) => {
    dispatch(burgerBuilderActions.addIngredient(ingredientName));
  };
  const onIngredientRemoved = (ingredientName) => {
    dispatch(burgerBuilderActions.removeIngredient(ingredientName));
  };

  const purchaseHandler = () => {
    setInCart(true);
  };

  const purchaseCancelHandler = () => {
    setInCart(false);
  };

  const purchaseContinueHandler = () => {
    props.history.push({
      pathname: "/checkout",
    });
  };
  useEffect(() => {
    dispatch(burgerBuilderActions.initializeIngredients());
  }, [dispatch]);

  const updatePurchaseableState = (updatedIngredients) => {
    const ingredients = { ...updatedIngredients };
    const sum = Object.keys(ingredients)
      .map((ingredientsKey) => {
        return ingredients[ingredientsKey];
      })
      .reduce((sum, newElement) => {
        return sum + newElement;
      }, 0);
    return sum > 0;
  };

  const disabledInfo = {
    ...ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = <Spinner></Spinner>;
  let burger = error ? <p>Cant load ingredients</p> : <Spinner></Spinner>;

  if (ings) {
    burger = (
      <>
        <Burger ingredients={ings} />
        <BuildControls
          price={totalPrice}
          ingredientRemover={onIngredientRemoved}
          ingredientAdder={onIngredientAdded}
          disabledInfo={disabledInfo}
          isPurchaseable={updatePurchaseableState(ings)}
          purchaseHandler={purchaseHandler}
        />
      </>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        purchaseContinueHandler={purchaseContinueHandler}
        purchaseCancelHandler={purchaseCancelHandler}
        totalPrice={totalPrice}
      />
    );
  }

  return (
    <Aux>
      <Modal show={inCart} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
