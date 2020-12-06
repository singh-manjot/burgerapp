import React from "react";
import classes from "./ToolBar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const ToolBar = (props) => {
  return (
    <header className={classes.ToolBar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className = {classes.Logo}>
      <Logo height="80%"/>

      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default ToolBar;
