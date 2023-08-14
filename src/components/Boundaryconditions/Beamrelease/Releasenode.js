import React from "react";

export default function Releasenode(props) {
  return (
    <mesh position={props.position}>
      <sphereGeometry args={[0.1, 50, 50]}></sphereGeometry>
      <meshStandardMaterial color={"green"} />
    </mesh>
  );
}
