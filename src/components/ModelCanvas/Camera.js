import React from "react";
import { OrthographicCamera } from "@react-three/drei";

export default function Camera() {
  return (
    <mesh>
      <OrthographicCamera
        makeDefault
        zoom={40}
        position={[-50, 100, 150]}
        view={{
          enabled: true,
          fullWidth: 1000,
          fullHeight: 1000,
          offsetX: 50,
          offsetY: -400,
          width: 1000,
          height: 1000,
        }}
      />
    </mesh>
  );
}
