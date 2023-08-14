import React, { useRef } from "react";
import classes from "./NodeLoadInput.module.scss";

export default function NodeLoadInput(props) {
  const valueref = useRef();
  const typeref = useRef();

  const inputvalue = (
    <table>
      <tbody ref={valueref}>
        <tr>
          <td>Assign Pattern:</td>
          <td>
            <select>
              {props.loadPattern.map((data) => (
                <option key={data.id} value={data.patternName}>
                  {data.patternName}
                </option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Px:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
        <tr>
          <td>Py:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
        <tr>
          <td>Pz:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
        <tr>
          <td>Mx:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
        <tr>
          <td>My:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
        <tr>
          <td>Mz:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const addingload = () => {
    let newnodeload = [];

    const newload = (data) => {
      if (typeref.current.childNodes[0].childNodes[0].checked === true) {
        return {
          Px:
            data.Px +
            +valueref.current.childNodes[1].childNodes[1].childNodes[0].value,
          Py:
            data.Py +
            +valueref.current.childNodes[2].childNodes[1].childNodes[0].value,
          Pz:
            data.Pz +
            +valueref.current.childNodes[3].childNodes[1].childNodes[0].value,
          Mx:
            data.Mx +
            +valueref.current.childNodes[4].childNodes[1].childNodes[0].value,
          My:
            data.My +
            +valueref.current.childNodes[5].childNodes[1].childNodes[0].value,
          Mz:
            data.Mz +
            +valueref.current.childNodes[6].childNodes[1].childNodes[0].value,
        };
      } else if (typeref.current.childNodes[1].childNodes[0].checked === true) {
        return {
          Px: +valueref.current.childNodes[1].childNodes[1].childNodes[0].value,
          Py: +valueref.current.childNodes[2].childNodes[1].childNodes[0].value,
          Pz: +valueref.current.childNodes[3].childNodes[1].childNodes[0].value,
          Mx: +valueref.current.childNodes[4].childNodes[1].childNodes[0].value,
          My: +valueref.current.childNodes[5].childNodes[1].childNodes[0].value,
          Mz: +valueref.current.childNodes[6].childNodes[1].childNodes[0].value,
        };
      } else if (typeref.current.childNodes[2].childNodes[0].checked === true) {
        return {
          Px: +0,
          Py: +0,
          Pz: +0,
          Mx: +0,
          My: +0,
          Mz: +0,
        };
      }
    };
    const nodeLoadExist = () => {
      if (
        props.nodeLoad.filter(
          (data) =>
            data.patternName ===
            valueref.current.childNodes[0].childNodes[1].childNodes[0].value
        ).length != 0
      ) {
        return true;
      } else {
        return false;
      }
    };

    const selectlabel = (selectid) => {
      let label = undefined;
      props.nodesdatas.map((nodesdata) => {
        if (nodesdata.id === selectid) {
          label = nodesdata.label;
        }
      });
      return label;
    };
    const loadDataExist = (nodeload, selectid) => {
      //nodeid to nodelabel
      const label = selectlabel(selectid);
      if (
        nodeload.loadData.filter((data) => data.nodelabel === label).length != 0
      ) {
        return { exist: true, label: label };
      } else {
        return { exist: false, label: label };
      }
    };

    if (nodeLoadExist() === true) {
      props.nodeLoad.map((nodeLoaddata) => {
        if (
          nodeLoaddata.patternName ===
          valueref.current.childNodes[0].childNodes[1].childNodes[0].value
        ) {
          let newloaddata = [];
          props.selectnode.map((selectid) => {
            if (loadDataExist(nodeLoaddata, selectid).exist === true) {
              let loaddatas = [];
              nodeLoaddata.loadData.map((data) => {
                if (
                  data.nodelabel === loadDataExist(nodeLoaddata, selectid).label
                ) {
                  loaddatas = [
                    ...loaddatas,
                    {
                      id: data.id,
                      nodelabel: data.nodelabel,
                      Px: +newload(data).Px,
                      Py: +newload(data).Py,
                      Pz: +newload(data).Pz,
                      Mx: +newload(data).Mx,
                      My: +newload(data).My,
                      Mz: +newload(data).Mz,
                    },
                  ];
                } else {
                  loaddatas = [...loaddatas, data];
                }
              });
              newloaddata = loaddatas;
            } else {
              let loaddatas = [];
              nodeLoaddata.loadData.map((data) => {
                loaddatas = [...loaddatas, data];
              });

              loaddatas = [
                ...loaddatas,
                {
                  id: Math.random(),
                  nodelabel: loadDataExist(nodeLoaddata, selectid).label,
                  Px: +valueref.current.childNodes[1].childNodes[1]
                    .childNodes[0].value,
                  Py: +valueref.current.childNodes[2].childNodes[1]
                    .childNodes[0].value,
                  Pz: +valueref.current.childNodes[3].childNodes[1]
                    .childNodes[0].value,
                  Mx: +valueref.current.childNodes[4].childNodes[1]
                    .childNodes[0].value,
                  My: +valueref.current.childNodes[5].childNodes[1]
                    .childNodes[0].value,
                  Mz: +valueref.current.childNodes[6].childNodes[1]
                    .childNodes[0].value,
                },
              ];
              newloaddata = loaddatas;
            }
          });
          newnodeload = [
            ...newnodeload,
            {
              id: nodeLoaddata.id,
              patternName: nodeLoaddata.patternName,
              loadData: newloaddata,
            },
          ];
        } else {
          newnodeload = [...newnodeload, nodeLoaddata];
        }
      });
    } else if (nodeLoadExist() === false) {
      newnodeload = props.nodeLoad;
      let newloaddata = [];
      let loadDatatemp = {
        id: null,
        nodelabel: null,
        Px: 0,
        Py: 0,
        Pz: 0,
        Mx: 0,
        My: 0,
        Mz: 0,
      };
      props.selectnode.map((selectid) => {
        const label = selectlabel(selectid);

        newloaddata = [
          ...newloaddata,
          {
            id: Math.random(),
            nodelabel: label,
            Px: +newload(loadDatatemp).Px,
            Py: +newload(loadDatatemp).Py,
            Pz: +newload(loadDatatemp).Pz,
            Mx: +newload(loadDatatemp).Mx,
            My: +newload(loadDatatemp).My,
            Mz: +newload(loadDatatemp).Mz,
          },
        ];
      });
      newnodeload = [
        ...props.nodeLoad,
        {
          id: Math.random(),
          patternName:
            valueref.current.childNodes[0].childNodes[1].childNodes[0].value,
          loadData: newloaddata,
        },
      ];
    }
    props.setNodeLoad(newnodeload);
  };
  return props.trigger ? (
    <div className={classes.nodeinput}>
      <div className={classes.inner}>
        <h1>Node Load</h1>
        <div className={classes.inputvalue}>{inputvalue}</div>
        <div ref={typeref} className={classes.inputtype}>
          <div className={classes.add}>
            <input
              type="radio"
              name="type"
              value="Add"
              defaultChecked={true}
            ></input>
            <p>Add</p>
          </div>
          <div className={classes.replace}>
            <input type="radio" name="type" value="Replace"></input>
            <p>Replace</p>
          </div>
          <div className={classes.delete}>
            <input type="radio" name="type" value="Delete"></input>
            <p>Delete</p>
          </div>
        </div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              if (props.selectnode.length > 0) {
                addingload();
              }
              props.setselectnode([]);
              props.setNodeLoadTrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              if (props.selectnode.length > 0) {
                addingload();
              }
            }}
          >
            Apply
          </button>
          <button
            onClick={() => {
              props.setselectnode([]);
              props.setNodeLoadTrigger(false);
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
