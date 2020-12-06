import React, { useState } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout=(props)=>{
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  
    return (
      <Aux>
        <ToolBar drawerToggleClicked={sideDrawerToggleHandler}></ToolBar>
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerCloseHandler}
        ></SideDrawer>
        <div>ToolBar, SideDrawer,Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
  
}
export default Layout;
