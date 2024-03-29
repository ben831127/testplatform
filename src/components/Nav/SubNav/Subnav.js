import React from "react";
import classes from "./Subnav.module.scss";

export default function Subnav(props) {
  return (
    <nav className={classes.nav}>
      <ul className={classes.function}>
        <button
          onClick={() => {
            props.setoriginalnodesdata(props.nodesdatas);
            props.setinputview(1);
          }}
        >
          Points
        </button>
        <button
          onClick={() => {
            props.setoriginalBCdata(props.BCelementdatas);
            props.setinputview(2);
            props.setstate(2);
          }}
        >
          Frame<br></br>Elements
        </button>
      </ul>
      <ul className={classes.view}>
        <button
          onClick={() => {
            props.setRestraintrigger(true);
          }}
        >
          Restrain
        </button>
        <button
          onClick={() => {
            props.setReleasetrigger(true);
          }}
        >
          Frame<br></br>Release
        </button>
        <button
          onClick={() => {
            props.setMattrigger(true);
          }}
        >
          Material
        </button>
        <button
          onClick={() => {
            props.setSecttrigger(true);
          }}
        >
          Section
        </button>
        <button
          onClick={() => {
            props.setPatternTrigger(true);
          }}
        >
          Load Pattern
        </button>
        <button
          onClick={() => {
            props.setCaseTrigger(true);
          }}
        >
          Load Case
        </button>
        <button
          onClick={() => {
            props.setNodeLoadTrigger(true);
          }}
        >
          Node Load
        </button>

        <button
          onClick={() => {
            props.setDistLoadTrigger(true);
          }}
        >
          Dist. Load
        </button>

        <button
          onClick={() => {
            props.setGridtrigger(true);
          }}
        >
          GridLine
        </button>
        <button
          onClick={() => {
            props.setOptionstrigger(true);
          }}
        >
          Options
        </button>
        <button
          onClick={() => {
            props.viewhandler();
          }}
        >
          3D
        </button>
      </ul>
    </nav>
  );
}
