import React, { useState, useRef } from "react";
import classes from "./Nodeinput.module.scss";

export default function Nodeinput(props) {
  const refx = useRef();
  const refy = useRef();
  const refz = useRef();
  const refcheckall = useRef();
  const refedit = useRef();
  let maxlabel = 0;

  const [newnode, setnewnode] = useState(["", "", ""]);
  const [editing, setediting] = useState();

  for (let i = 0; i < props.nodesdatas.length; i++) {
    if (props.nodesdatas[i].label > maxlabel) {
      maxlabel = props.nodesdatas[i].label;
    }
  }

  const nodetable = props.nodesdatas.map((data) =>
    data.id ===
    props.selectnode.filter((selectdata) => selectdata === data.id)[0] ? (
      data.id !== editing ? (
        <tr
          onDoubleClick={() => {
            setediting(data.id);
          }}
          key={data.id}
        >
          <td>{data.label}</td>
          <td>{data.x}</td>
          <td>{data.y}</td>
          <td>{data.z}</td>
          <td>
            <input
              className={classes.check}
              type="checkbox"
              checked={true}
              onChange={() => {}}
              onClick={() => {
                let newselect = [];
                for (let i = 0; i < props.selectnode.length; i++) {
                  if (props.selectnode[i] !== data.id) {
                    newselect = [...newselect, props.selectnode[i]];
                  }
                }
                props.setselectnode(newselect);
              }}
            />
          </td>
        </tr>
      ) : (
        <tr key={data.id} ref={refedit}>
          <td>{data.label}</td>
          <td>
            <input type="number" defaultValue={data.x} />
          </td>
          <td>
            <input type="number" defaultValue={data.y} />
          </td>
          <td>
            <input type="number" defaultValue={data.z} />
          </td>
          <td>
            <input
              className={classes.check}
              type="checkbox"
              checked={true}
              onChange={() => {}}
              onClick={() => {
                let newselect = [];
                for (let i = 0; i < props.selectnode.length; i++) {
                  if (props.selectnode[i] !== data.id) {
                    newselect = [...newselect, props.selectnode[i]];
                  }
                }
                props.setselectnode(newselect);
              }}
            />
          </td>
        </tr>
      )
    ) : data.id !== editing ? (
      <tr
        onDoubleClick={() => {
          setediting(data.id);
        }}
        key={data.id}
      >
        <td>{data.label}</td>
        <td>{data.x}</td>
        <td>{data.y}</td>
        <td>{data.z}</td>
        <td>
          <input
            className={classes.check}
            type="checkbox"
            checked={false}
            onChange={() => {}}
            onClick={() => {
              props.setselectnode([...props.selectnode, data.id]);
            }}
          />
        </td>
      </tr>
    ) : (
      <tr key={data.id} ref={refedit}>
        <td>{data.label}</td>
        <td>
          <input type="number" defaultValue={data.x} />
        </td>
        <td>
          <input type="number" defaultValue={data.y} />
        </td>
        <td>
          <input type="number" defaultValue={data.z} />
        </td>
        <td>
          <input
            className={classes.check}
            type="checkbox"
            checked={false}
            onChange={() => {}}
            onClick={() => {
              props.setselectnode([...props.selectnode, data.id]);
            }}
          />
        </td>
      </tr>
    )
  );

  return (
    <div
      className={classes.nodeinput}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setediting();
        } else if (e.key === "Enter") {
          let newnodedatas = [];
          props.nodesdatas.map((data) => {
            if (data.label === +refedit.current.childNodes[0].innerText) {
              newnodedatas = [
                ...newnodedatas,
                {
                  id: data.id,
                  label: data.label,
                  x: +refedit.current.childNodes[1].childNodes[0].value,
                  y: +refedit.current.childNodes[2].childNodes[0].value,
                  z: +refedit.current.childNodes[3].childNodes[0].value,
                },
              ];
            } else {
              newnodedatas = [...newnodedatas, data];
            }
          });
          props.setnodesdatas(newnodedatas);
          setediting();
        }
      }}
      tabIndex="0"
    >
      <h1>Points Data</h1>
      <table className={classes.add}>
        <thead>
          <tr>
            <th>label</th>
            <th>X(m)</th>
            <th>Y(m)</th>
            <th>Z(m)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{maxlabel + 1}</td>
            <td>
              <input
                ref={refx}
                type="number"
                onChange={(e) =>
                  setnewnode([+e.target.value, newnode[1], newnode[2]])
                }
              />
            </td>
            <td>
              <input
                ref={refy}
                type="number"
                onChange={(e) =>
                  setnewnode([newnode[0], +e.target.value, newnode[2]])
                }
              />
            </td>
            <td>
              <input
                ref={refz}
                type="number"
                defaultValue={""}
                onChange={(e) =>
                  setnewnode([newnode[0], newnode[1], +e.target.value])
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <button
                onClick={() => {
                  if (
                    typeof newnode[0] === "number" &&
                    typeof newnode[1] === "number" &&
                    typeof newnode[2] === "number"
                  ) {
                    props.setnodesdatas([
                      ...props.nodesdatas,
                      {
                        id: Math.random(),
                        label: maxlabel + 1,
                        x: newnode[0],
                        y: newnode[1],
                        z: newnode[2],
                      },
                    ]);
                    refx.current.value = "";
                    refy.current.value = "";
                    refz.current.value = "";
                    setnewnode(["", "", ""]);
                  }
                }}
              >
                add
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className={classes.showdata}>
        <table>
          <thead>
            <tr>
              <td>label</td>
              <td>X(m)</td>
              <td>Y(m)</td>
              <td>Z(m)</td>
              <td>
                <input
                  className={classes.check}
                  type="checkbox"
                  onClick={(e) => {
                    for (let i = 0; i < props.nodesdatas.length; i++) {
                      refcheckall.current.children[
                        i
                      ].children[4].children[0].checked = e.target.checked;
                    }
                    if (e.target.checked === true) {
                      let newselect = [];
                      for (let i = 0; i < props.nodesdatas.length; i++) {
                        newselect = [...newselect, props.nodesdatas[i].id];
                      }
                      props.setselectnode(newselect);
                    } else {
                      props.setselectnode([]);
                    }
                  }}
                />
              </td>
            </tr>
          </thead>
          <tbody ref={refcheckall}>{nodetable}</tbody>
        </table>
      </div>
      <div className={classes.btn}>
        <button
          onClick={() => {
            setediting();
            props.setinputview(0);
          }}
        >
          O.K.
        </button>
        <button
          onClick={() => {
            setediting();
            props.setnodesdatas(props.originalnodesdata);
            props.setinputview(0);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
