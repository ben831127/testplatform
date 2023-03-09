import { Text } from "@react-three/drei";
import React from "react";

export default function Nodes(props) {
  const nodes = props.nodesdatas.map((data) =>
    data.id ===
    props.selectnode.filter((selectdata) => selectdata === data.id)[0] ? (
      <mesh
        key={data.id}
        position={[data.x, data.z, -data.y]}
        onClick={() => {
          let selected = [];
          props.selectnode.map((id) => {
            if (data.id !== id) {
              selected = [...selected, id];
            }
            props.setselectnode(selected);
          });
        }}
      >
        <sphereGeometry args={[0.1, 50, 50]}></sphereGeometry>
        <meshStandardMaterial color={"green"} />
      </mesh>
    ) : (
      <mesh
        key={data.id}
        position={[data.x, data.z, -data.y]}
        onClick={() => {
          props.setselectnode([...props.selectnode, data.id]);
        }}
      >
        <sphereGeometry args={[0.1, 50, 50]}></sphereGeometry>
        <meshStandardMaterial color={"black"} />
      </mesh>
    )
  );

  const label = props.nodesdatas.map((data) =>
    data.id ===
    props.selectnode.filter((selectdata) => selectdata === data.id)[0] ? (
      <mesh
        key={data.id}
        position={[data.x - 0.3, data.z + 0.3, -data.y + 0.5]}
        onClick={() => {
          let selected = [];
          props.selectnode.map((id) => {
            if (data.id !== id) {
              selected = [...selected, id];
            }
            props.setselectnode(selected);
          });
        }}
      >
        <Text color={"black"} scale={0.3} fillOpacity={10} visible={true}>
          {data.label}
        </Text>
      </mesh>
    ) : (
      <mesh
        key={data.id}
        position={[data.x - 0.3, data.z + 0.3, -data.y + 0.5]}
        onClick={() => {
          props.setselectnode([...props.selectnode, data.id]);
        }}
      >
        <Text color={"black"} scale={0.3} fillOpacity={10} visible={true}>
          {data.label}
        </Text>
      </mesh>
    )
  );
  return (
    <mesh>
      {nodes}
      {label}
    </mesh>
  );
}
