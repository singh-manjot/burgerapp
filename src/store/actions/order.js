import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAILED,
    error,
  };
};

export const purchase = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseStart);
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseFail(error));
      });
  };
};

export const purchaseStart = (orderData) => {
  return {
    type: actionTypes.START_PURCHASE,
    orderData,
  };
};
