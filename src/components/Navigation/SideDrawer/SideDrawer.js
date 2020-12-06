import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Aux from "../../../HOC/Aux/Aux";
import BackDrop from "../../ui/BackDrop/BackDrop";

const SideDrawer = (props) => {
  const attachedClasses = props.open
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
