import React from "react";
import burgerLogo from "../../assets/images/original.png";
import classes from "./Logo.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo} style={{height:props.height}}>
      <img src={burgerLogo} alt="Burger Brand"></img>
    </div>
  );
};

export default Logo;
