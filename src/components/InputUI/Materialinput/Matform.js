import React, { useEffect, useRef, useState } from "react";

import classes from "./Matform.module.scss";

export default function Matform(props) {
  const massref = useRef();
  const Gref = useRef();
  const typeref = useRef();
  const [type, settype] = useState();

  useEffect(() => {
    props.typehandler(settype);
  });

  const setdata = (datalabel, data) => {
    let newdata = props.editdata;
    newdata[datalabel] = data;
    props.seteditdata(newdata);
  };

  const checkdata = () => {
    if (
      props.editdata.name === "" ||
      props.editdata.weight < 0 ||
      props.editdata.E <= 0
    ) {
      alert("Please check your input data");
    } else {
      let newdata = [];
      if (props.editdata.id !== "") {
        props.mats.map((data) => {
          if (data.id === props.editdata.id) {
            newdata = [...newdata, props.editdata];
          } else {
            newdata = [...newdata, data];
          }
        });
      } else {
        newdata = [
          ...props.mats,
          {
            id: Math.random(),
            name: props.editdata.name,
            matcolor: props.editdata.matcolor,
            type: props.editdata.type,
            weight: props.editdata.weight,
            E: props.editdata.E,
            poisson: props.editdata.poisson,
            other: props.editdata.other,
          },
        ];
      }
      props.setmats(newdata);
      props.setMatformtrigger(false);
    }
  };
  //steel other props
  // const [yieldstress, setyieldstress] = useState(0);
  // const [ultimatestress, setultimatestress] = useState(0);
  //RC other props
  //Wood other props

  const generaltable = (
    <table className={classes.general}>
      <tbody>
        <tr>
          <th>Material Name</th>
          <td>
            <input
              type="text"
              defaultValue={props.editdata.name}
              onChange={(e) => setdata("name", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>MaterialColor</th>
          <td>
            <input
              type="color"
              defaultValue={props.editdata.matcolor}
              onChange={(e) => setdata("matcolor", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Material Type</th>
          <td>
            <select
              ref={typeref}
              defaultValue={props.editdata.type}
              onChange={(e) => {
                setdata("type", e.target.value);
                settype(e.target.value);
              }}
              name="mattype"
            >
              <option value="steel">steel</option>
              <option value="RC">RC</option>
              <option value="wood">wood</option>
              <option value="other">other</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const weightmasstable = (
    <table className={classes.weightmass}>
      <tbody>
        <tr>
          <th>
            Weight(kgf/cm<sup>3</sup>)
          </th>
          <td>
            <input
              type="number"
              defaultValue={props.editdata.weight}
              onChange={(e) => {
                setdata("weight", e.target.value);
                massref.current.value =
                  Math.round((e.target.value * 1000) / 9.81) / 1000;
              }}
            />
          </td>
        </tr>
        <tr>
          <th>
            Mass(kg/cm<sup>3</sup>)
          </th>
          <td>
            <input
              ref={massref}
              type="number"
              value={Math.round((props.editdata.weight * 1000) / 9.81) / 1000}
              readOnly={"readonly"}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const isotropictable = (
    <table className={classes.isotropic}>
      <tbody>
        <tr>
          <th>
            Elastic Modulus,E(kgf/cm<sup>4</sup>)
          </th>
          <td>
            <input
              type="number"
              defaultValue={props.editdata.E}
              onChange={(e) => {
                setdata("E", e.target.value);
                Gref.current.value =
                  Math.round(
                    (e.target.value * 1000) / (2 * (1 + props.editdata.poisson))
                  ) / 1000;
              }}
            />
          </td>
        </tr>
        <tr>
          <th>Poisson</th>
          <td>
            <input
              type="number"
              defaultValue={props.editdata.poisson}
              onChange={(e) => {
                setdata("poisson", e.target.value);
                Gref.current.value =
                  Math.round(
                    (props.editdata.E * 1000) / (2 * (1 + e.target.value))
                  ) / 1000;
              }}
            />
          </td>
        </tr>
        <tr>
          <th>
            Shear Modulus,G(kgf/cm<sup>4</sup>)
          </th>
          <td>
            <input
              ref={Gref}
              type="number"
              value={
                Math.round(
                  (props.editdata.E * 1000) / (2 * (1 + props.editdata.poisson))
                ) / 1000
              }
              readOnly={"readonly"}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const otherproptable = (
    <table className={classes.other}>
      {type === "steel" && (
        <tbody>
          <tr>
            <th>Steel</th>
          </tr>
        </tbody>
      )}
      {type === "RC" && (
        <tbody>
          <tr>
            <th>RC</th>
          </tr>
        </tbody>
      )}
      {type === "wood" && (
        <tbody>
          <tr>
            <th>Wood</th>
          </tr>
        </tbody>
      )}
      {type === "other" && (
        <tbody>
          <tr>
            <th>other</th>
          </tr>
        </tbody>
      )}
    </table>
  );
  return props.trigger ? (
    <div className={classes.matform}>
      <div className={classes.inner}>
        <h2>Material Properties</h2>
        <div className={classes.tables}>
          {generaltable}
          {weightmasstable}
          {isotropictable}
          {otherproptable}
        </div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              checkdata();
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setMatformtrigger(false);
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
