import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false,
};

//move prices to Firebase
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2,
  cheese: 1,
  bacon: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        error: false,
        ingredients: action.ingredients,
      };

    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
