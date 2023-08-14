import React from "react";
import * as THREE from "three";
import { Line, Text } from "@react-three/drei";
import { LineBasicMaterial, Material } from "three";

export default function DistributedLoadXdir(props) {
  const color = "red";

  const ele = props.BCelementdatas.filter(
    (data) => data.label === props.load.elementlabel
  )[0];

  const start = props.nodesdatas.filter(
    (data) => data.label === ele.startnode
  )[0];

  const end = props.nodesdatas.filter((data) => data.label === ele.endnode)[0];

  const elevec = { x: end.x - start.x, y: end.y - start.y, z: end.z - start.z };

  const length = Math.sqrt(elevec.x ** 2 + elevec.y ** 2 + elevec.z ** 2);

  const max_Wx = props.maxValue;
  const arrowscale = Math.abs(props.load.Wx / max_Wx);
  const arrowDistributedLength = length - arrowscale;

  let xOffsetFactor = 0;
  if (props.arrowdir.x === -1) {
    xOffsetFactor = 1;
  }

  const arrowsposition = [
    new THREE.Vector3(arrowscale * xOffsetFactor, 0, 0),
    new THREE.Vector3(
      arrowscale * xOffsetFactor +
        (props.dir.x * arrowDistributedLength * 1) / 5,
      (props.dir.z * arrowDistributedLength * 1) / 5,
      (-props.dir.y * arrowDistributedLength * 1) / 5
    ),
    new THREE.Vector3(
      arrowscale * xOffsetFactor +
        (props.dir.x * arrowDistributedLength * 2) / 5,
      (props.dir.z * arrowDistributedLength * 2) / 5,
      (-props.dir.y * arrowDistributedLength * 2) / 5
    ),
    new THREE.Vector3(
      arrowscale * xOffsetFactor +
        (props.dir.x * arrowDistributedLength * 3) / 5,
      (props.dir.z * arrowDistributedLength * 3) / 5,
      (-props.dir.y * arrowDistributedLength * 3) / 5
    ),
    new THREE.Vector3(
      arrowscale * xOffsetFactor +
        (props.dir.x * arrowDistributedLength * 4) / 5,
      (props.dir.z * arrowDistributedLength * 4) / 5,
      (-props.dir.y * arrowDistributedLength * 4) / 5
    ),
    new THREE.Vector3(
      arrowscale * xOffsetFactor +
        (props.dir.x * arrowDistributedLength * 5) / 5,
      (props.dir.z * arrowDistributedLength * 5) / 5,
      (-props.dir.y * arrowDistributedLength * 5) / 5
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
      <Text
        color={color}
        scale={0.3}
        fillOpacity={10}
        visible={true}
        position={[
          length / 2,
          (arrowsposition[2].y + arrowsposition[3].y) / 2 + 0.2,
          (arrowsposition[2].z + arrowsposition[3].z) / 2,
        ]}
      >
        {props.load.Wx}
      </Text>
    </mesh>
  );
}
