import { useRef } from "react";
import classes from "./Elementrelease.module.scss";

export default function Elementrelease(props) {
  const startref = useRef();
  const endref = useRef();
  let startrelease = false;
  let endrelease = false;
  if (props.selectBC.length === 1) {
    let element = props.BCelementdatas.filter(
      (data) => data.id === props.selectBC[0]
    )[0];
    if (
      element.release.startrelease[3] === 0 &&
      element.release.startrelease[4] === 0 &&
      element.release.startrelease[5] === 0
    ) {
      startrelease = true;
    }
    if (
      element.release.endrelease[3] === 0 &&
      element.release.endrelease[4] === 0 &&
      element.release.endrelease[5] === 0
    ) {
      endrelease = true;
    }
  }

  const setrelease = () => {
    let newBCdatas = [];
    let start = [1, 1, 1, 1, 1, 1];
    let end = [1, 1, 1, 1, 1, 1];
    if (startref.current.checked === true) {
      start = [1, 1, 1, 0, 0, 0];
    }
    if (endref.current.checked === true) {
      end = [1, 1, 1, 0, 0, 0];
    }
    props.BCelementdatas.map((data) => {
      if (
        props.selectBC.filter((selectid) => selectid === data.id).length === 1
      ) {
        newBCdatas = [
          ...newBCdatas,
          {
            id: data.id,
            label: data.label,
            startnode: data.startnode,
            endnode: data.endnode,
            sect: data.sect,
            release: {
              startrelease: start,
              endrelease: end,
            },
          },
        ];
      } else {
        newBCdatas = [...newBCdatas, data];
      }
    });
    props.setBCelementdatas(newBCdatas);
    props.setselectBC([]);
    props.setselectnode([]);
  };

  return props.trigger ? (
    <div className={classes.release}>
      <div className={classes.inner}>
        <h1>Frame Release</h1>
        <div className={classes.releasecheck}>
          <div className={classes.startrelease}>
            <div>Start:</div>
            <input
              ref={startref}
              type="checkbox"
              defaultChecked={startrelease}
            />
          </div>
          <div className={classes.endrelease}>
            <div>End:</div>
            <input ref={endref} type="checkbox" defaultChecked={endrelease} />
          </div>
        </div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              setrelease();
              props.setReleasetrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setReleasetrigger(false);
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
