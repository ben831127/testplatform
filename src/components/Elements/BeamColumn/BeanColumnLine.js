import React from "react";
import { Line } from "@react-three/drei";

export default function BeanColumnLine(props) {
  const node1 = props.nodesdatas.filter(
    (data) => data.label === props.startnode
  )[0];
  const node2 = props.nodesdatas.filter(
    (data) => data.label === props.endnode
  )[0];

  const sectcolor = props.sects.filter((data) => data.name === props.sect)[0]
    .sectcolor;
  const matcolor = props.mats.filter(
    (data) =>
      data.name ===
      props.sects.filter((data) => data.name === props.sect)[0].mat
  )[0].matcolor;

  const x1 = node1.x;
  const y1 = -node1.y;
  const z1 = node1.z;
  const x2 = node2.x;
  const y2 = -node2.y;
  const z2 = node2.z;
  const linewidth = 5;
  return (
    <mesh>
      <line>
        {props.dashed === true && (
          <Line
            points={[
              [x1, z1, y1],
              [x2, z2, y2],
            ]}
            linewidth={linewidth}
            dashed={props.dashed}
            gapSize={0.2}
            dashSize={0.2}
            dashScale={1}
            color={"black"}
          ></Line>
        )}
        {props.dashed === false && props.displaycolor === "sect" && (
          <Line
            points={[
              [x1, z1, y1],
              [x2, z2, y2],
            ]}
            linewidth={linewidth}
            dashed={props.dashed}
            gapSize={0.1}
            dashSize={0.1}
            dashScale={1}
            color={sectcolor}
          ></Line>
        )}
        {props.dashed === false && props.displaycolor === "mat" && (
          <Line
            points={[
              [x1, z1, y1],
              [x2, z2, y2],
            ]}
            linewidth={linewidth}
            dashed={props.dashed}
            gapSize={0.1}
            dashSize={0.1}
            dashScale={1}
            color={matcolor}
          ></Line>
        )}
      </line>
    </mesh>
  );
}
