import React, { useRef } from "react";
import classes from "./DistributedLoadinput.module.scss";

export default function DistributedLoadInput(props) {
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
          <td>Wx:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
        <tr>
          <td>Wy:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
        <tr>
          <td>Wz:</td>
          <td>
            <input type="number" defaultValue={0}></input>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const addingload = () => {
    let newDistload = [];

    const newload = (data) => {
      if (typeref.current.childNodes[0].childNodes[0].checked === true) {
        return {
          Wx:
            data.Wx +
            +valueref.current.childNodes[1].childNodes[1].childNodes[0].value,
          Wy:
            data.Wy +
            +valueref.current.childNodes[2].childNodes[1].childNodes[0].value,
          Wz:
            data.Wz +
            +valueref.current.childNodes[3].childNodes[1].childNodes[0].value,
        };
      } else if (typeref.current.childNodes[1].childNodes[0].checked === true) {
        return {
          Wx: +valueref.current.childNodes[1].childNodes[1].childNodes[0].value,
          Wy: +valueref.current.childNodes[2].childNodes[1].childNodes[0].value,
          Wz: +valueref.current.childNodes[3].childNodes[1].childNodes[0].value,
        };
      } else if (typeref.current.childNodes[2].childNodes[0].checked === true) {
        return {
          Wx: +0,
          Wy: +0,
          Wz: +0,
        };
      }
    };
    const distLoadExist = () => {
      if (
        props.distributedLoad.filter(
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
      props.BCelementdatas.map((BCdata) => {
        if (BCdata.id === selectid) {
          label = BCdata.label;
        }
      });
      return label;
    };
    const loadDataExist = (BCload, selectid) => {
      //BCid to BClabel
      const label = selectlabel(selectid);
      if (
        BCload.loadData.filter((data) => data.elementlabel === label).length !=
        0
      ) {
        return { exist: true, label: label };
      } else {
        return { exist: false, label: label };
      }
    };

    if (distLoadExist() === true) {
      props.distributedLoad.map((distLoaddata) => {
        if (
          distLoaddata.patternName ===
          valueref.current.childNodes[0].childNodes[1].childNodes[0].value
        ) {
          let newloaddata = [];
          props.selectBC.map((selectid) => {
            if (loadDataExist(distLoaddata, selectid).exist === true) {
              let loaddatas = [];
              distLoaddata.loadData.map((data) => {
                if (
                  data.elementlabel ===
                  loadDataExist(distLoaddata, selectid).label
                ) {
                  loaddatas = [
                    ...loaddatas,
                    {
                      id: data.id,
                      elementlabel: data.elementlabel,
                      Wx: +newload(data).Wx,
                      Wy: +newload(data).Wy,
                      Wz: +newload(data).Wz,
                    },
                  ];
                } else {
                  loaddatas = [...loaddatas, data];
                }
              });
              newloaddata = loaddatas;
            } else {
              let loaddatas = [];
              distLoaddata.loadData.map((data) => {
                loaddatas = [...loaddatas, data];
              });

              loaddatas = [
                ...loaddatas,
                {
                  id: Math.random(),
                  elementlabel: loadDataExist(distLoaddata, selectid).label,
                  Wx: +valueref.current.childNodes[1].childNodes[1]
                    .childNodes[0].value,
                  Wy: +valueref.current.childNodes[2].childNodes[1]
                    .childNodes[0].value,
                  Wz: +valueref.current.childNodes[3].childNodes[1]
                    .childNodes[0].value,
                },
              ];
              newloaddata = loaddatas;
            }
          });
          newDistload = [
            ...newDistload,
            {
              id: distLoaddata.id,
              patternName: distLoaddata.patternName,
              loadData: newloaddata,
            },
          ];
        } else {
          newDistload = [...newDistload, distLoaddata];
        }
      });
    } else if (distLoadExist() === false) {
      newDistload = props.distributedLoad;
      let newloaddata = [];
      let loadDatatemp = {
        id: null,
        elementlabel: null,
        Wx: 0,
        Wy: 0,
        Wz: 0,
      };
      props.selectBC.map((selectid) => {
        const label = selectlabel(selectid);

        newloaddata = [
          ...newloaddata,
          {
            id: Math.random(),
            elementlabel: label,
            Wx: +newload(loadDatatemp).Wx,
            Wy: +newload(loadDatatemp).Wy,
            Wz: +newload(loadDatatemp).Wz,
          },
        ];
      });
      newDistload = [
        ...props.distributedLoad,
        {
          id: Math.random(),
          patternName:
            valueref.current.childNodes[0].childNodes[1].childNodes[0].value,
          loadData: newloaddata,
        },
      ];
    }
    props.setDistributedLoad(newDistload);
  };

  return props.trigger ? (
    <div className={classes.distinput}>
      <div className={classes.inner}>
        <h1>Distributed Load</h1>
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
              if (props.selectBC.length > 0) {
                addingload();
              }
              props.setselectBC([]);
              props.setDistLoadTrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              if (props.selectBC.length > 0) {
                addingload();
              }
            }}
          >
            Apply
          </button>
          <button
            onClick={() => {
              props.setselectBC([]);
              props.setDistLoadTrigger(false);
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
