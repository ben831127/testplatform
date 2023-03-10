import React, { useRef } from "react";
import classes from "./Options.module.scss";

export default function Options(props) {
  const displaycolorref = useRef();
  const extruderef = useRef();

  return props.trigger ? (
    <div className={classes.options}>
      <div className={classes.inner}>
        <h1>Options</h1>
        <div className={classes.displaycolor}>
          <div>Display Color:</div>
          <select
            ref={displaycolorref}
            name="color"
            defaultValue={props.elementstate.displaycolor}
          >
            <option value="sect">section</option>
            <option value="mat">Material</option>
          </select>
        </div>
        <div className={classes.extrude}>
          <div>Extrude:</div>
          <input
            ref={extruderef}
            type="checkbox"
            defaultChecked={props.elementstate.extrude}
          />
        </div>

        <div className={classes.btn}>
          <button
            onClick={() => {
              props.setelementstate({
                displaycolor: displaycolorref.current.value,
                extrude: extruderef.current.checked,
              });
              props.setOptionstrigger(false);
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
