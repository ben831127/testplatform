import { useRef } from "react";
import classes from "./Jointrestrain.module.scss";

export default function Jointrestrain(props) {
  const restrainref = useRef();
  let restrain = false;
  if (props.selectnode.length === 1) {
    let node = props.nodesdatas.filter(
      (data) => data.id === props.selectnode[0]
    )[0];
    if (
      node.restrain.d1 === 1 &&
      node.restrain.d2 === 1 &&
      node.restrain.d3 === 1
    ) {
      restrain = true;
    }
  }
  const setRestrain = () => {
    let newnodedatas = [];
    let restraindata = { d1: 0, d2: 0, d3: 0, r1: 0, r2: 0, r3: 0 };
    if (restrainref.current.checked === true) {
      restraindata = { d1: 1, d2: 1, d3: 1, r1: 0, r2: 0, r3: 0 };
    }
    props.nodesdatas.map((data) => {
      if (
        props.selectnode.filter((selectid) => selectid === data.id).length === 1
      ) {
        newnodedatas = [
          ...newnodedatas,
          {
            id: data.id,
            label: data.label,
            x: data.x,
            y: data.y,
            z: data.z,
            restrain: restraindata,
          },
        ];
      } else {
        newnodedatas = [...newnodedatas, data];
      }
    });
    props.setnodesdatas(newnodedatas);
    props.setselectBC([]);
    props.setselectnode([]);
  };

  return props.trigger ? (
    <div className={classes.restrain}>
      <div className={classes.inner}>
        <h1>Joint Restrain</h1>
        <div className={classes.restraincheck}>
          <div>restrain</div>
          <input ref={restrainref} type="checkbox" defaultChecked={restrain} />
        </div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              setRestrain();
              props.setRestraintrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setRestraintrigger(false);
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
