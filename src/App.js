import React from "react";
import Layout from "./HOC/Layouts/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

const app = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/" component={BurgerBuilder}></Route>
        </Switch>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthState: dispatch(actions.checkAuthState()),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(app));
