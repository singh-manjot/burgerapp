import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const NavigationItems = (props) => {
  const isAuthenticated = props.isAuthenticated
    ? props.isAuthenticated
    : localStorage.getItem("idToken");
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link="/auth">
          <span onClick={props.logoutUser}>Logout</span>
        </NavigationItem>
      ) : (
        <NavigationItem link="/auth">Login</NavigationItem>
      )}
      <NavigationItem link="/"> Checkout</NavigationItem>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.localId && state.auth.idToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actions.logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
