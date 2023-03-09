import React, { useState, useEffect, useRef } from "react";
import classes from "./Sectform.module.scss";

export default function Sectform(props) {
  const [shape, setshape] = useState();
  const widthref = useRef();
  const heightref = useRef();

  useEffect(() => {
    props.shapehandler(setshape);
  });

  const setdata = (datalabel, sublabel, data) => {
    let newdata = props.editdata;
    if (sublabel === " ") {
      newdata[datalabel] = data;
      props.seteditdata(newdata);
    } else {
      newdata[datalabel][sublabel] = data;
      props.seteditdata(newdata);
    }
  };

  const checkdata = () => {
    if (
      props.editdata.type === "rect" &&
      (props.editdata.name === "" ||
        props.editdata.mat === "" ||
        props.editdata.param.B <= 0 ||
        props.editdata.param.H <= 0)
    ) {
      alert("Please check your input data");
    } else if (
      props.editdata.type === "other" &&
      (props.editdata.name === "" ||
        props.editdata.mat === "" ||
        props.editdata.param.Area <= 0 ||
        props.editdata.param.Ix <= 0 ||
        props.editdata.param.Iy <= 0 ||
        props.editdata.param.Zx <= 0 ||
        props.editdata.param.Zy <= 0)
    ) {
      alert("Please check your input data");
    } else {
      let newdata = [];
      if (props.editdata.id !== "") {
        props.sects.map((data) => {
          if (data.id === props.editdata.id) {
            newdata = [...newdata, props.editdata];
          } else {
            newdata = [...newdata, data];
          }
        });
      } else {
        newdata = [
          ...props.sects,
          {
            id: Math.random(),
            name: props.editdata.name,
            sectcolor: props.editdata.sectcolor,
            mat: props.editdata.mat,
            type: props.editdata.type,
            param: props.editdata.param,
          },
        ];
      }
      props.setsects(newdata);
      props.setSectformtrigger(false);
    }
  };

  const generaltable = (
    <table>
      <tbody>
        <tr>
          <th>Section Name</th>
          <td>
            <input
              type="text"
              defaultValue={props.editdata.name}
              onChange={(e) => setdata("name", " ", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Section Color</th>
          <td>
            <input
              type="color"
              defaultValue={props.editdata.sectcolor}
              onChange={(e) => setdata("sectcolor", " ", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <th>Shape</th>
          <td>
            <select
              defaultValue={props.editdata.type}
              onChange={(e) => {
                setdata("type", " ", e.target.value);
                setshape(e.target.value);
                if (e.target.value === "rect") {
                  setdata("param", " ", {
                    B: 0,
                    H: 0,
                    Area: 0,
                    Ix: 0,
                    Iy: 0,
                    Zx: 0,
                    Zy: 0,
                  });
                } else if (e.target.value === "other") {
                  setdata("param", " ", {
                    Area: 0,
                    Ix: 0,
                    Iy: 0,
                    Zx: 0,
                    Zy: 0,
                  });
                }
              }}
              name="shape"
            >
              <option value="rect">Rect.</option>
              <option value="other">Other</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Material</th>
          <td>
            <select
              defaultValue={props.editdata.mat}
              onChange={(e) => {
                setdata("mat", " ", e.target.value);
              }}
              name="mat"
            >
              {props.mats.map((mat) => (
                <option key={mat.id} value={mat.name}>
                  {mat.name}
                </option>
              ))}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const shapetable = (
    <table>
      {shape === "rect" && (
        <tbody>
          <tr>
            <th>Width(cm)</th>
            <td>
              <input
                ref={widthref}
                type="number"
                defaultValue={props.editdata.param.B}
                onChange={(e) => {
                  setdata("param", "B", +e.target.value);
                  setdata(
                    "param",
                    "Area",
                    +e.target.value * heightref.current.value
                  );
                  setdata(
                    "param",
                    "Ix",
                    Math.round(
                      (e.target.value * heightref.current.value ** 3 * 1000) /
                        12
                    ) / 1000
                  );
                  setdata(
                    "param",
                    "Iy",
                    Math.round(
                      (e.target.value ** 3 * heightref.current.value * 1000) /
                        12
                    ) / 1000
                  );
                  setdata(
                    "param",
                    "Zx",
                    Math.round(
                      (e.target.value * heightref.current.value ** 2 * 1000) / 6
                    ) / 1000
                  );
                  setdata(
                    "param",
                    "Zy",
                    Math.round(
                      (e.target.value ** 2 * heightref.current.value * 1000) / 6
                    ) / 1000
                  );
                }}
              />
            </td>
          </tr>
          <tr>
            <th>Depth(cm)</th>
            <td>
              <input
                ref={heightref}
                type="number"
                defaultValue={props.editdata.param.H}
                onChange={(e) => {
                  setdata("param", "H", +e.target.value);
                  setdata(
                    "param",
                    "Area",
                    +e.target.value * widthref.current.value
                  );
                  setdata(
                    "param",
                    "Ix",
                    Math.round(
                      (widthref.current.value * e.target.value ** 3 * 1000) / 12
                    ) / 1000
                  );
                  setdata(
                    "param",
                    "Iy",
                    Math.round(
                      (widthref.current.value ** 3 * e.target.value * 1000) / 12
                    ) / 1000
                  );
                  setdata(
                    "param",
                    "Zx",
                    Math.round(
                      (widthref.current.value * e.target.value ** 2 * 1000) / 6
                    ) / 1000
                  );
                  setdata(
                    "param",
                    "Zy",
                    Math.round(
                      (widthref.current.value ** 2 * e.target.value * 1000) / 6
                    ) / 1000
                  );
                }}
              />
            </td>
          </tr>
        </tbody>
      )}
      {shape === "other" && (
        <tbody>
          <tr>
            <th>Area</th>
            <td>
              <input
                type="number"
                defaultValue={props.editdata.param.Area}
                onChange={(e) => setdata("param", "Area", +e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <th>
              Ix(cm<sup>4</sup>)
            </th>
            <td>
              <input
                type="number"
                defaultValue={props.editdata.param.Ix}
                onChange={(e) => setdata("param", "Ix", +e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>
              Iy(cm<sup>4</sup>)
            </th>
            <td>
              <input
                type="number"
                defaultValue={props.editdata.param.Iy}
                onChange={(e) => setdata("param", "Iy", +e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>
              Zx(cm<sup>3</sup>)
            </th>
            <td>
              <input
                type="number"
                defaultValue={props.editdata.param.Zx}
                onChange={(e) => setdata("param", "Zx", +e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>
              Zy(cm<sup>3</sup>)
            </th>
            <td>
              <input
                type="number"
                defaultValue={props.editdata.param.Zy}
                onChange={(e) => setdata("param", "Zy", +e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );

  return props.trigger ? (
    <div className={classes.sectform}>
      <div className={classes.inner}>
        <h2>Section Properties</h2>
        <div className={classes.tables}>
          {generaltable}
          {shapetable}
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
              props.setSectformtrigger(false);
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
