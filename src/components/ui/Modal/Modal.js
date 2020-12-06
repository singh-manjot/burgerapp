import React from "react";
import classes from "./Modal.css";
import Aux from "../../../HOC/Aux/Aux";
import BackDrop from "../BackDrop/BackDrop";

const Modal = (props) => {
  return (
    <Aux>
      <BackDrop clicked={props.modalClosed} show={props.show} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(Modal);
