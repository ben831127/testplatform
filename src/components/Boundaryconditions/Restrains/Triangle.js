import React from "react";

export default function Triangle(props) {
  const { position, rotation } = props;

  const radiusTop = 0.4;
  const radiusBottom = 0.5;
  const height = 0.1;
  const radialSegments = 3;

  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry
        attach="geometry"
        args={[radiusTop, radiusBottom, height, radialSegments]}
      ></cylinderGeometry>
      <meshStandardMaterial transparent={true} opacity={0.5} color={"green"} />
    </mesh>
  );
}
