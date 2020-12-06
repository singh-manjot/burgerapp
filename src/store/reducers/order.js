import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_SUCCESS:
      const combineOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(combineOrder),
      };
    case actionTypes.PURCHASE_FAILED:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.START_PURCHASE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
