import React, { useRef } from "react";
import classes from "./LoadPatternInput.module.scss";

export default function LoadPatterninput(props) {
  const addref = useRef();
  const patternref = useRef();

  const addTable = (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>TYPE</th>
          <th>Self Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr ref={addref}>
          <td>
            <input type="text" defaultValue={""} />
          </td>
          <td>
            <select defaultValue={"DEAD"}>
              <option value="DEAD">DEAD</option>
              <option value="LIVE">LIVE</option>
              <option value="QUAKE">QUAKE</option>
              <option value="WIND">WIND</option>
              <option value="OTHER">OTHER</option>
            </select>
          </td>
          <td>
            <input type="number" min={0} defaultValue={0} />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const add = () => {
    if (addref.current.childNodes[0].childNodes[0].value != "") {
      let newPattern = [
        ...props.loadPattern,
        {
          id: Math.random(),
          patternName: addref.current.childNodes[0].childNodes[0].value,
          type: addref.current.childNodes[1].childNodes[0].value,
          selfWeightFactor: addref.current.childNodes[2].childNodes[0].value,
        },
      ];
      props.setLoadPattern(newPattern);
    } else {
      window.alert("Please check the input data.");
    }
  };

  const del = (id) => {
    let newPattern = [];
    props.loadPattern.map((data) => {
      if (data.id != id) {
        newPattern = [...newPattern, data];
      }
    });
    props.setLoadPattern(newPattern);
  };

  const upload = () => {
    console.log(
      patternref.current.childNodes[0].childNodes[0].childNodes[0].value
    );
    let newPattern = [];
    for (let i = 0; i < props.loadPattern.length; i++) {
      newPattern = [
        ...newPattern,
        {
          id: props.loadPattern[i].id,
          patternName:
            patternref.current.childNodes[i].childNodes[0].childNodes[0].value,
          type: patternref.current.childNodes[i].childNodes[1].childNodes[0]
            .value,
          selfWeightFactor:
            patternref.current.childNodes[i].childNodes[2].childNodes[0].value,
        },
      ];
    }
    props.setLoadPattern(newPattern);
  };

  return props.trigger ? (
    <div className={classes.patterninput}>
      <div className={classes.inner}>
        <h1>Load Pattern</h1>
        <div className={classes.addtable}>
          {addTable}
          <button
            onClick={() => {
              add();
            }}
          >
            add
          </button>
        </div>

        <div className={classes.showpattern}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>TYPE</th>
                <th>Self Weight</th>
                <th></th>
              </tr>
            </thead>
            <tbody ref={patternref}>
              {props.loadPattern.map((data) => (
                <tr key={data.id}>
                  <td>
                    <input type="text" defaultValue={data.patternName} />
                  </td>
                  <td>
                    <select defaultValue={data.type}>
                      <option value="DEAD">DEAD</option>
                      <option value="LIVE">LIVE</option>
                      <option value="QUAKE">QUAKE</option>
                      <option value="WIND">WIND</option>
                      <option value="OTHER">OTHER</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      defaultValue={data.selfWeightFactor}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        del(data.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={classes.btn}>
          <button
            onClick={() => {
              upload();
              props.setPatternTrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setPatternTrigger(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
