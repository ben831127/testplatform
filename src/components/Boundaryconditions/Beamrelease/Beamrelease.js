import React from "react";
import { Mesh } from "three";
import Releasenode from "./Releasenode";

export default function Beamrelease(props) {
  const { nodesdatas, BCelementdatas, extrude, release } = props;

  const findpoint = (label) => {
    for (let i = 0; i < nodesdatas.length; i++) {
      if (label === nodesdatas[i].label) {
        return nodesdatas[i];
      }
    }
  };

  const elevec = (data) => {
    let start = null;
    let end = null;
    for (let i = 0; i < nodesdatas.length; i++) {
      if (nodesdatas[i].label === data.startnode) {
        start = nodesdatas[i];
      } else if (nodesdatas[i].label === data.endnode) {
        end = nodesdatas[i];
      }
    }
    const vec = [end.x - start.x, end.y - start.y, end.z - start.z];
    const len = Math.sqrt(vec[0] ** 2 + vec[1] ** 2 + vec[2] ** 2);
    return [vec[0] / 20, vec[1] / 20, vec[2] / 20];
  };

  const beamrelease =
    extrude === false && release === true
      ? BCelementdatas.map((data) => (
          <mesh key={data.id}>
            {data.release.startrelease[3] === 0 &&
              data.release.startrelease[4] === 0 &&
              data.release.startrelease[5] === 0 && (
                <Releasenode
                  position={[
                    findpoint(data.startnode).x + elevec(data)[0],
                    findpoint(data.startnode).z + elevec(data)[2],
                    -findpoint(data.startnode).y - elevec(data)[1],
                  ]}
                ></Releasenode>
              )}

            {data.release.endrelease[3] === 0 &&
              data.release.endrelease[4] === 0 &&
              data.release.endrelease[5] === 0 && (
                <Releasenode
                  position={[
                    findpoint(data.endnode).x - elevec(data)[0],
                    findpoint(data.endnode).z - elevec(data)[2],
                    -findpoint(data.endnode).y + elevec(data)[1],
                  ]}
                ></Releasenode>
              )}
          </mesh>
        ))
      : "";

  return <>{beamrelease}</>;
}
