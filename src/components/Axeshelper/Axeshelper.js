import React from "react";
import { Line } from "@react-three/drei";

export default function Axeshelper(props) {
  return (
    <mesh>
      {/* x-axis */}
      <Line
        points={[
          [0, 0, 0],
          [1 * props.scale, 0, 0],
        ]}
        color="red"
        position={[0, 0, 0]}
        lineWidth={props.width}
      />
      {/* y-axis */}
      <Line
        points={[
          [0, 0, 0],
          [0, 1 * props.scale, 0],
        ]}
        color="green"
        position={[0, 0, 0]}
        lineWidth={props.width}
      />
      {/* z-axis */}
      <Line
        points={[
          [0, 0, 0],
          [0, 0, -1 * props.scale],
        ]}
        color="blue"
        position={[0, 0, 0]}
        lineWidth={props.width}
      />
    </mesh>
  );
}
