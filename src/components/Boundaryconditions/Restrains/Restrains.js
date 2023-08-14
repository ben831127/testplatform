import React from "react";
import Triangle from "./Triangle";
import * as THREE from "three";

export default function Restrains(props) {
  const wod_restrains = props.nodesdatas.map((node) =>
    node.restrain.d1 === 1 &&
    node.restrain.d2 === 1 &&
    node.restrain.d3 === 1 ? (
      <mesh key={node.id}>
        <Triangle
          position={[+node.x, +node.z - 0.5, -node.y]}
          rotation={[(-90 * Math.PI) / 180, 0, 0]}
        ></Triangle>
        <Triangle
          position={[+node.x, +node.z - 0.5, -node.y]}
          rotation={[(-90 * Math.PI) / 180, 0, (-90 * Math.PI) / 180]}
        ></Triangle>
      </mesh>
    ) : (
      ""
    )
  );

  return <>{wod_restrains}</>;
}
