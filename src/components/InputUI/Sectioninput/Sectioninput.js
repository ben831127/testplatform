import React, { useState } from "react";
import classes from "./Sectioninput.module.scss";
import Sectform from "./Sectform";

export default function Sectioninput(props) {
  const [Sectformtrigger, setSectformtrigger] = useState(false);
  const [editdata, seteditdata] = useState({
    id: "",
    name: "",
    sectcolor: "#0098ff",
    mat: "",
    type: "rect",
    param: {
      B: 0,
      H: 0,
      Area: 0,
      Ix: 0,
      Iy: 0,
      Zx: 0,
      Zy: 0,
    },
  });

  const sectstable = (
    <table className={classes.sectstable}>
      <tbody>
        {props.sects.map((data) => (
          <tr key={data.id}>
            <td style={{ background: data.sectcolor, width: "4vw" }}></td>
            <td className={classes.sectname}>{data.name}</td>
            <td className={classes.sectbtn}>
              <button
                onClick={() => {
                  seteditdata({
                    id: data.id,
                    name: data.name,
                    sectcolor: data.sectcolor,
                    mat: data.mat,
                    type: data.type,
                    param: data.param,
                  });
                  setSectformtrigger(true);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (
                    props.BCelementdatas.filter(
                      (element) => element.sect === data.name
                    )[0] === undefined
                  ) {
                    props.setsects(
                      props.sects.filter((sect) => sect.id !== data.id)
                    );
                  }
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const sectf = (
    <Sectform
      trigger={Sectformtrigger}
      setSectformtrigger={setSectformtrigger}
      setsects={props.setsects}
      seteditdata={seteditdata}
      sects={props.sects}
      mats={props.mats}
      editdata={editdata}
      shapehandler={(setshape) => {
        setshape(editdata.type);
      }}
    ></Sectform>
  );

  return props.trigger ? (
    <div className={classes.sectinput}>
      <div>{sectf}</div>
      <div
        className={classes.inner}
        style={(Sectformtrigger && { zIndex: -1 }) || { zIndex: 0 }}
      >
        <h1>Sections</h1>

        <button
          className={classes.addsect}
          onClick={() => {
            seteditdata({
              id: "",
              name: "",
              sectcolor: "#0098ff",
              mat: props.mats[0].name,
              type: "rect",
              param: {
                B: 0,
                H: 0,
                Area: 0,
                Ix: 0,
                Iy: 0,
                Zx: 0,
                Zy: 0,
              },
            });
            setSectformtrigger(true);
          }}
        >
          Add New Section
        </button>

        <div className={classes.sectlist}>
          <div>{sectstable}</div>
        </div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              props.setSecttrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setSecttrigger(false);
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
