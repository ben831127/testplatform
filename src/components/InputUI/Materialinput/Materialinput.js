import React, { useState } from "react";
import classes from "./Materialinput.module.scss";
import Matform from "./Matform";

export default function Materialinput(props) {
  const [Matformtrigger, setMatformtrigger] = useState(false);

  const [editdata, seteditdata] = useState({
    id: "",
    name: "",
    matcolor: "#0098ff",
    type: "steel",
    weight: 0,
    E: 0,
    poisson: 0,
    other: {},
  });

  const matstable = (
    <table className={classes.matstable}>
      <tbody>
        {props.mats.map((data) => (
          <tr key={data.id}>
            <td style={{ background: data.matcolor, width: "4vw" }}></td>
            <td className={classes.matname}>{data.name}</td>
            <td className={classes.matbtn}>
              <button
                onClick={() => {
                  seteditdata({
                    id: data.id,
                    name: data.name,
                    matcolor: data.matcolor,
                    type: data.type,
                    weight: data.weight,
                    E: data.E,
                    poisson: data.poisson,
                    other: data.other,
                  });
                  setMatformtrigger(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() =>
                  props.setmats(props.mats.filter((mat) => mat.id !== data.id))
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const matf = (
    <Matform
      trigger={Matformtrigger}
      setMatformtrigger={setMatformtrigger}
      setmats={props.setmats}
      seteditdata={seteditdata}
      mats={props.mats}
      editdata={editdata}
      typehandler={(settype) => {
        settype(editdata.type);
      }}
    ></Matform>
  );
  return props.trigger ? (
    <div className={classes.matinput}>
      <div>{matf}</div>
      <div
        className={classes.inner}
        style={(Matformtrigger && { zIndex: -1 }) || { zIndex: 0 }}
      >
        <h1>Materials</h1>

        <button
          className={classes.addmat}
          onClick={() => {
            seteditdata({
              id: "",
              name: "",
              matcolor: "#0098ff",
              type: "steel",
              weight: 0,
              E: 0,
              poisson: 0,
              other: {},
            });

            setMatformtrigger(true);
          }}
        >
          Add New Material
        </button>

        <div className={classes.matlist}>
          <div>{matstable}</div>
        </div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              props.setMattrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setMattrigger(false);
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
