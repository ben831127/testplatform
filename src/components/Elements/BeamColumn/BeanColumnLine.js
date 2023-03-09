import React from "react";
import { Line } from "@react-three/drei";

export default function BeanColumnLine(props) {
  const node1 = props.nodesdatas.filter(
    (data) => data.label === props.startnode
  )[0];
  const node2 = props.nodesdatas.filter(
    (data) => data.label === props.endnode
  )[0];

  const data = props.nodecoord;
  const x1 = node1.x;
  const y1 = -node1.y;
  const z1 = node1.z;
  const x2 = node2.x;
  const y2 = -node2.y;
  const z2 = node2.z;

  return (
    <mesh>
      <line>
        <Line
          points={[
            [x1, z1, y1],
            [x2, z2, y2],
          ]}
          linewidth={2}
          dashed={props.dashed}
          gapSize={0.1}
          dashSize={0.1}
          dashScale={1}
          color={props.color}
        ></Line>
      </line>
    </mesh>
  );
}
