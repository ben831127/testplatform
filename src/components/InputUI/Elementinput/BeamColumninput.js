import React, { useState, useRef } from "react";
import classes from "./BeamColumninput.module.scss";

export default function BeamColumninput(props) {
  const refcheckall = useRef();
  const refedit = useRef();
  let initsect = "";
  if (props.sects.length > 0) {
    initsect = props.sects[0].name;
  }
  const [newBCelement, setnewBCelement] = useState(["", "", initsect]);
  const [editing, setediting] = useState();
  let maxlabel = 0;
  for (let i = 0; i < props.BCelementdatas.length; i++) {
    if (props.BCelementdatas[i].label > maxlabel) {
      maxlabel = props.BCelementdatas[i].label;
    }
  }

  const addBCelement = () => {
    if (
      newBCelement[0] != "" &&
      newBCelement[1] != "" &&
      newBCelement[0] <= props.nodesdatas.length &&
      newBCelement[1] <= props.nodesdatas.length &&
      newBCelement[0] !== newBCelement[1]
    ) {
      props.setBCelementdatas([
        ...props.BCelementdatas,
        {
          id: Math.random(),
          label: maxlabel + 1,
          startnode: newBCelement[0],
          endnode: newBCelement[1],
          sect: newBCelement[2],
          release: {
            startrelease: [1, 1, 1, 0, 0, 0],
            endrelease: [1, 1, 1, 0, 0, 0],
          },
        },
      ]);
      setnewBCelement(["", "", newBCelement[2]]);
    } else {
      alert("check input data");
    }
  };

  const BCtable = props.BCelementdatas.map((data) =>
    data.id ===
    props.selectBC.filter((selectdata) => selectdata === data.id)[0] ? (
      data.id !== editing ? (
        <tr
          onDoubleClick={() => {
            setediting(data.id);
          }}
          key={data.id}
        >
          <td>{data.label}</td>
          <td>{data.startnode}</td>
          <td>{data.endnode}</td>
          <td>{data.sect}</td>
          <td>
            <input
              className={classes.check}
              type="checkbox"
              checked={true}
              onChange={() => {}}
              onClick={() => {
                let newselect = [];
                for (let i = 0; i < props.selectBC.length; i++) {
                  if (props.selectBC[i] !== data.id) {
                    newselect = [...newselect, props.selectBC[i]];
                  }
                }
                props.setselectBC(newselect);
              }}
            />
          </td>
        </tr>
      ) : (
        <tr key={data.id} ref={refedit}>
          <td>{data.label}</td>
          <td>
            <input type="number" defaultValue={data.startnode} />
          </td>
          <td>
            <input type="number" defaultValue={data.endnode} />
          </td>
          <td>
            <select name="" defaultValue={data.sect}>
              {props.sects.map((sect) => (
                <option key={Math.random()} value={sect.name}>
                  {sect.name}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input
              className={classes.check}
              type="checkbox"
              checked={true}
              onChange={() => {}}
              onClick={() => {
                let newselect = [];
                for (let i = 0; i < props.selectBC.length; i++) {
                  if (props.selectBC[i] !== data.id) {
                    newselect = [...newselect, props.selectBC[i]];
                  }
                }
                props.setselectBC(newselect);
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
        <td>{data.startnode}</td>
        <td>{data.endnode}</td>
        <td>{data.sect}</td>
        <td>
          <input
            className={classes.check}
            type="checkbox"
            checked={false}
            onChange={() => {}}
            onClick={() => {
              props.setselectBC([...props.selectBC, data.id]);
            }}
          />
        </td>
      </tr>
    ) : (
      <tr key={data.id} ref={refedit}>
        <td>{data.label}</td>
        <td>
          <input type="number" defaultValue={data.startnode} />
        </td>
        <td>
          <input type="number" defaultValue={data.endnode} />
        </td>
        <td>
          <select name="" defaultValue={data.sect}>
            {props.sects.map((sect) => (
              <option key={Math.random()} value={sect.name}>
                {sect.name}
              </option>
            ))}
          </select>
        </td>
        <td>
          <input
            className={classes.check}
            type="checkbox"
            checked={false}
            onChange={() => {}}
            onClick={() => {
              props.setselectBC([...props.selectBC, data.id]);
            }}
          />
        </td>
      </tr>
    )
  );

  return (
    <div
      className={classes.bcinput}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setediting();
        } else if (e.key === "Enter") {
          let newBCdatas = [];
          props.BCelementdatas.map((data) => {
            if (data.label === +refedit.current.childNodes[0].innerText) {
              newBCdatas = [
                ...newBCdatas,
                {
                  id: data.id,
                  label: data.label,
                  startnode: +refedit.current.childNodes[1].childNodes[0].value,
                  endnode: +refedit.current.childNodes[2].childNodes[0].value,
                  sect: refedit.current.childNodes[3].childNodes[0].value,
                  release: data.release,
                },
              ];
            } else {
              newBCdatas = [...newBCdatas, data];
            }
          });
          props.setBCelementdatas(newBCdatas);
          setediting();
        }
      }}
      tabIndex="0"
    >
      <h1>BC Elements Data</h1>
      <table className={classes.add}>
        <thead>
          <tr>
            <th>label</th>
            <th>Start</th>
            <th>End</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{maxlabel + 1}</td>
            <td>
              <input
                type="number"
                value={newBCelement[0]}
                onChange={(e) => {
                  setnewBCelement([
                    +e.target.value,
                    newBCelement[1],
                    newBCelement[2],
                  ]);
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={newBCelement[1]}
                onChange={(e) => {
                  setnewBCelement([
                    newBCelement[0],
                    +e.target.value,
                    newBCelement[2],
                  ]);
                }}
              />
            </td>
            <td>
              <select
                name="section"
                value={newBCelement[2]}
                onChange={(e) => {
                  setnewBCelement([
                    newBCelement[0],
                    newBCelement[1],
                    e.target.value,
                  ]);
                }}
              >
                {props.sects.map((sect) => (
                  <option key={Math.random()} value={sect.name}>
                    {sect.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <button
                onClick={() => {
                  addBCelement();
                  props.setstate(1);
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
              <td>lable</td>
              <td>Start</td>
              <td>End</td>
              <td>Section</td>
              <td>
                <input
                  className={classes.check}
                  type="checkbox"
                  onClick={(e) => {
                    for (let i = 0; i < props.BCelementdatas.length; i++) {
                      refcheckall.current.children[
                        i
                      ].children[4].children[0].checked = e.target.checked;
                    }
                    if (e.target.checked === true) {
                      let newselect = [];
                      for (let i = 0; i < props.BCelementdatas.length; i++) {
                        newselect = [...newselect, props.BCelementdatas[i].id];
                      }
                      props.setselectBC(newselect);
                    } else {
                      props.setselectBC([]);
                    }
                  }}
                />
              </td>
            </tr>
          </thead>
          <tbody ref={refcheckall}>{BCtable}</tbody>
        </table>
      </div>
      <div className={classes.btn}>
        <button
          onClick={() => {
            props.setstate(1);
            props.setinputview(0);
          }}
        >
          O.K.
        </button>
        <button
          onClick={() => {
            props.setBCelementdatas(props.originalBCdata);
            props.setstate(1);
            props.setinputview(0);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
