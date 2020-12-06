import React from "react";
import classes from "./BackDrop.css";

const BackDrop = (props) => {
  return props.show ? <div onClick={props.clicked} className={classes.BackDrop}></div> : null;
};

export default BackDrop;
