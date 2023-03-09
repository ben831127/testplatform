import React, { useState } from "react";
import classes from "./Gridinput.module.scss";
export default function Gridinput(props) {
  const [xgrid, setxgrid] = useState(props.xgrid);

  const [ygrid, setygrid] = useState(props.ygrid);

  const [zgrid, setzgrid] = useState(props.zgrid);

  const deletegrid = (griddata, id) => {
    if (griddata === xgrid) {
      setxgrid(griddata.filter((data) => data.id !== id));
    } else if (griddata === ygrid) {
      setygrid(griddata.filter((data) => data.id !== id));
    } else if (griddata === zgrid) {
      setzgrid(griddata.filter((data) => data.id !== id));
    }
  };

  const addgrid = (griddata, id) => {
    let newgrid = [];
    if (id === 0) {
      newgrid = [{ id: Math.random(), gridID: "", ordinate: "" }, ...griddata];
    } else {
      for (let i = 0; i < griddata.length; i++) {
        if (griddata[i].id !== id) {
          newgrid = [...newgrid, griddata[i]];
        } else {
          newgrid = [
            ...newgrid,
            griddata[i],
            { id: Math.random(), gridID: "", ordinate: "" },
          ];
        }
      }
    }
    if (griddata === xgrid) {
      setxgrid(newgrid);
    } else if (griddata === ygrid) {
      setygrid(newgrid);
    } else if (griddata === zgrid) {
      setzgrid(newgrid);
    }
  };

  const updatedata = (griddata, id, gridID, ordinate) => {
    let newgrid = [];
    for (let i = 0; i < griddata.length; i++) {
      if (griddata[i].id !== id) {
        newgrid = [...newgrid, griddata[i]];
      } else {
        newgrid = [...newgrid, { id: id, gridID: gridID, ordinate: +ordinate }];
      }
    }
    if (griddata === xgrid) {
      setxgrid(newgrid);
    } else if (griddata === ygrid) {
      setygrid(newgrid);
    } else if (griddata === zgrid) {
      setzgrid(newgrid);
    }
  };

  const xgridtable = (
    <table>
      <thead>
        <tr>
          <td>gridID</td>
          <td>ordinate(m)</td>
          <td className={classes.titlebtn}>
            <button onClick={() => addgrid(xgrid, 0)}>+</button>
          </td>
        </tr>
      </thead>
      <tbody>
        {xgrid.map((data) => (
          <tr key={data.id}>
            <td>
              <input
                type="text"
                defaultValue={data.gridID}
                onChange={(e) =>
                  updatedata(xgrid, data.id, e.target.value, data.ordinate)
                }
              />
            </td>
            <td>
              <input
                type="number"
                defaultValue={data.ordinate}
                onChange={(e) =>
                  updatedata(xgrid, data.id, data.gridID, e.target.value)
                }
              />
            </td>
            <td className={classes.btn}>
              <button
                className={classes.delete}
                onClick={() => deletegrid(xgrid, data.id)}
              >
                -
              </button>
              <button
                className={classes.add}
                onClick={() => addgrid(xgrid, data.id)}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const ygridtable = (
    <table>
      <thead>
        <tr>
          <td>gridID</td>
          <td>ordinate(m)</td>
          <td className={classes.titlebtn}>
            <button onClick={() => addgrid(ygrid, 0)}>+</button>
          </td>
        </tr>
      </thead>
      <tbody>
        {ygrid.map((data) => (
          <tr key={data.id}>
            <td>
              <input
                type="text"
                defaultValue={data.gridID}
                onChange={(e) =>
                  updatedata(ygrid, data.id, e.target.value, data.ordinate)
                }
              />
            </td>
            <td>
              <input
                type="number"
                defaultValue={data.ordinate}
                onChange={(e) =>
                  updatedata(ygrid, data.id, data.gridID, e.target.value)
                }
              />
            </td>
            <td className={classes.btn}>
              <button
                className={classes.delete}
                onClick={() => deletegrid(ygrid, data.id)}
              >
                -
              </button>
              <button
                className={classes.add}
                onClick={() => addgrid(ygrid, data.id)}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const zgridtable = (
    <table>
      <thead>
        <tr>
          <td>gridID</td>
          <td>ordinate(m)</td>
          <td className={classes.titlebtn}>
            <button onClick={() => addgrid(zgrid, 0)}>+</button>
          </td>
        </tr>
      </thead>
      <tbody>
        {zgrid.map((data) => (
          <tr key={data.id}>
            <td>
              <input
                type="text"
                defaultValue={data.gridID}
                onChange={(e) =>
                  updatedata(zgrid, data.id, e.target.value, data.ordinate)
                }
              />
            </td>
            <td>
              <input
                type="number"
                defaultValue={data.ordinate}
                onChange={(e) =>
                  updatedata(zgrid, data.id, data.gridID, e.target.value)
                }
              />
            </td>
            <td className={classes.btn}>
              <button
                className={classes.delete}
                onClick={() => deletegrid(zgrid, data.id)}
              >
                -
              </button>
              <button
                className={classes.add}
                onClick={() => addgrid(zgrid, data.id)}
              >
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return props.trigger ? (
    <div className={classes.gridinput}>
      <div className={classes.inner}>
        <h1>Grid Data</h1>
        <div className={classes.grid}>
          <div className={classes.x}>
            <h4>X-Grid</h4>
            <hr />
            {xgridtable}
          </div>
          <div className={classes.y}>
            <h4>Y-Grid</h4>
            <hr />
            {ygridtable}
          </div>
          <div className={classes.z}>
            <h4>Z-Grid</h4>
            <hr />
            {zgridtable}
          </div>
        </div>
        <div className={classes.checkbtn}>
          <button
            className={classes.add}
            onClick={() => {
              props.setxgriddata(xgrid);
              props.setygriddata(ygrid);
              props.setzgriddata(zgrid);
              props.setTrigger(false);
            }}
          >
            OK
          </button>
          <button
            className={classes.cancel}
            onClick={() => {
              props.setxgriddata(props.xgrid);
              props.setygriddata(props.ygrid);
              props.setzgriddata(props.zgrid);
              setxgrid(props.xgrid);
              setygrid(props.ygrid);
              setzgrid(props.zgrid);
              props.setTrigger(false);
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
