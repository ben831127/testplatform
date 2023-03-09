import React, { useState, useEffect } from "react";
import classes from "./InputUI.module.scss";

export default function InputUI(props) {
  const [BCdata, setBCdata] = useState([]);

  const clearHandler = () => {
    setBCdata([]);
  };

  const addHandler = (event) => {
    event.preventDefault();
    setBCdata(
      [...BCdata].concat([
        {
          x1: event.target[0].value / 100,
          y1: event.target[1].value / 100,
          z1: event.target[2].value / 100,
          x2: event.target[3].value / 100,
          y2: event.target[4].value / 100,
          z2: event.target[5].value / 100,
        },
      ])
    );
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";
    event.target[4].value = "";
    event.target[5].value = "";
  };

  useEffect(() => {
    props.data(BCdata);
  });

  return (
    <div className={classes.content}>
      <button onClick={clearHandler}>清空</button>
      <form onSubmit={addHandler}>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>X</td>
              <td>Y</td>
              <td>Z</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>起點</td>
              <td>
                <input type="number"></input>
              </td>
              <td>
                <input type="number"></input>
              </td>
              <td>
                <input type="number"></input>
              </td>
            </tr>
            <tr>
              <td>終點</td>
              <td>
                <input type="number"></input>
              </td>
              <td>
                <input type="number"></input>
              </td>
              <td>
                <input type="number"></input>
              </td>
            </tr>
          </tbody>
        </table>
        <button>Add</button>
      </form>
    </div>
  );
}
