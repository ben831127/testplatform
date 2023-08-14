import React from "react";
import * as THREE from "three";
import { Line, Text } from "@react-three/drei";

export default function DistributedLoadZdir(props) {
  const color = "red";

  const linespace = (start, end, step) => {
    let arr = [];
    const length = end - start;
    for (let i = 0; i < step + 1; i++) {
      arr.push(start + (i * length) / step);
    }
    return arr;
  };

  const ele = props.BCelementdatas.filter(
    (data) => data.label === props.load.elementlabel
  )[0];

  const start = props.nodesdatas.filter(
    (data) => data.label === ele.startnode
  )[0];

  const end = props.nodesdatas.filter((data) => data.label === ele.endnode)[0];

  const elevec = { x: end.x - start.x, y: end.y - start.y, z: end.z - start.z };

  const length = Math.sqrt(elevec.x ** 2 + elevec.y ** 2 + elevec.z ** 2);

  const max_Wz = props.maxValue;
  const arrowscale = Math.abs(props.load.Wz / max_Wz);
  const zOffset = props.arrowdir.y * arrowscale;
  const arrowsposition = [
    new THREE.Vector3(0, -zOffset, 0),
    new THREE.Vector3(
      (props.dir.x * length * 1) / 5,
      (props.dir.z * length * 1) / 5 - zOffset,
      (-props.dir.y * length * 1) / 5
    ),
    new THREE.Vector3(
      (props.dir.x * length * 2) / 5,
      (props.dir.z * length * 2) / 5 - zOffset,
      (-props.dir.y * length * 2) / 5
    ),
    new THREE.Vector3(
      (props.dir.x * length * 3) / 5,
      (props.dir.z * length * 3) / 5 - zOffset,
      (-props.dir.y * length * 3) / 5
    ),
    new THREE.Vector3(
      (props.dir.x * length * 4) / 5,
      (props.dir.z * length * 4) / 5 - zOffset,
      (-props.dir.y * length * 4) / 5
    ),
    new THREE.Vector3(
      (props.dir.x * length * 5) / 5,
      (props.dir.z * length * 5) / 5 - zOffset,
      (-props.dir.y * length * 5) / 5
    ),
  ];
  const degZ = Math.acos(
    (length * elevec.x) / (length * Math.sqrt(elevec.x ** 2 + elevec.y ** 2))
  );

  const degY = Math.acos(
    (elevec.x ** 2 + elevec.y ** 2) /
      (Math.sqrt(elevec.x ** 2 + elevec.y ** 2 + elevec.z ** 2) *
        Math.sqrt(elevec.x ** 2 + elevec.y ** 2))
  );

  return (
    <mesh position={[start.x, start.z, -start.y]} rotation={[0, degZ, degY]}>
      {arrowsposition.map((position) => (
        <arrowHelper
          key={Math.random()}
          args={[
            props.arrowdir,
            position,
            arrowscale,
            color,
            arrowscale / 5,
            arrowscale / 10,
          ]}
        ></arrowHelper>
      ))}
      <Line
        points={[
          [0, -zOffset, 0],
          [length, -zOffset, 0],
        ]}
        color={color}
      ></Line>
      <Text
        color={color}
        scale={0.3}
        fillOpacity={10}
        visible={true}
        position={[length / 2, -zOffset + 0.2, 0]}
      >
        {props.load.Wz}
      </Text>
    </mesh>
  );
}
