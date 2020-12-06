import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  let summary = <Redirect to="/"></Redirect>;
  if (props.ings) {
    summary = (
      <div>
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          ingredients={props.ings}
          history={props.history}
        ></CheckoutSummary>
      </div>
    );
  }
  return [summary];
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
  };
};
export default connect(mapStateToProps)(Checkout);
