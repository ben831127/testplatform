import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";

export default function PointLoad(props) {
  const length = 1.5;

  const x = props.position[0];
  const y = props.position[1];
  const z = props.position[2];
  let position = new THREE.Vector3(0, 0, 0);
  let momentposition = new THREE.Vector3(0, 0, 0);
  let textPosition = new THREE.Vector3(0, 0, 0);
  let degree;

  if (props.dir.x !== 0) {
    position.x = x;
    position.y = z;
    position.z = -y;
    textPosition.x = x + props.dir.x * (length / 2);
    textPosition.y = z + 0.2;
    textPosition.z = -y;
    degree = [0, 0, 0];
  } else if (props.dir.z !== 0) {
    position.x = x;
    position.y = z;
    position.z = -y;
    textPosition.x = x;
    textPosition.y = z + 0.2;
    textPosition.z = -y + props.dir.z * (length / 2);
    degree = [0, (-90 * Math.PI) / 180, 0];
  } else if (props.dir.y !== 0) {
    position.x = x;
    position.y = z + length * ((1 - props.dir.y) / 2);
    position.z = -y;
    textPosition.x = x;
    textPosition.y = z + 0.2 + length;
    textPosition.z = -y;
    degree = [0, 0, 0];
  }

  momentposition.x = position.x - 0.4 * props.dir.x;
  momentposition.y = position.y - 0.4 * props.dir.y;
  momentposition.z = position.z - 0.4 * props.dir.z;

  return (
    <mesh>
      <Text
        color={"blue"}
        scale={0.3}
        fillOpacity={10}
        visible={true}
        position={textPosition}
        rotation={degree}
      >
        {props.value}
      </Text>
      <arrowHelper args={[props.dir, position, 1.5, "blue", 0.5]}></arrowHelper>
      {props.moment === true && (
        <arrowHelper
          args={[props.dir, momentposition, 1.5, "blue", 0.5]}
        ></arrowHelper>
      )}
    </mesh>
  );
}
