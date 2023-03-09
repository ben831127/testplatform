import React from "react";
import classes from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <div>測試平台</div>
      <ul>
        <li>about</li>
        <li>Help</li>
      </ul>
    </nav>
  );
}
