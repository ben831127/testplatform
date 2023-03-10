import React from "react";

export default function BC2points(props) {
  const node1 = props.nodesdatas.filter(
    (data) => data.label === props.startnode
  )[0];
  const node2 = props.nodesdatas.filter(
    (data) => data.label === props.endnode
  )[0];
  const B =
    +props.sects.filter((data) => data.name === props.sect)[0].param.B / 100;
  const H =
    +props.sects.filter((data) => data.name === props.sect)[0].param.H / 100;

  const sectcolor = props.sects.filter((data) => data.name === props.sect)[0]
    .sectcolor;
  const matcolor = props.mats.filter(
    (data) =>
      data.name ===
      props.sects.filter((data) => data.name === props.sect)[0].mat
  )[0].matcolor;

  const x1 = +node1.x;
  const y1 = +node1.y;
  const z1 = +node1.z;
  const x2 = +node2.x;
  const y2 = +node2.y;
  const z2 = +node2.z;
  const locx = (x1 + x2) / 2;
  const locy = (-y1 - y2) / 2;
  const locz = (z1 + z2) / 2;
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);

  //計算旋轉角度
  const elementvec = [x2 - x1, y2 - y1, z2 - z1];

  let xdeg = 0;
  let ydeg = 0;
  let zdeg = 0.5 * Math.PI;
  let coe = [0, 0];
  if (!(elementvec[0] === 0 && elementvec[1] === 0 && elementvec[2] !== 0)) {
    if (
      (elementvec[0] >= 0 && elementvec[1] >= 0 && elementvec[2] >= 0) ||
      (elementvec[0] >= 0 && elementvec[1] <= 0 && elementvec[2] >= 0) ||
      (elementvec[0] <= 0 && elementvec[1] >= 0 && elementvec[2] <= 0) ||
      (elementvec[0] <= 0 && elementvec[1] <= 0 && elementvec[2] <= 0)
    ) {
      coe = [1, 0.5];
      zdeg = Math.atan(elementvec[1] / elementvec[0]);
    } else if (
      (elementvec[0] < 0 && elementvec[1] > 0 && elementvec[2] > 0) ||
      (elementvec[0] > 0 && elementvec[1] < 0 && elementvec[2] < 0) ||
      (elementvec[0] < 0 && elementvec[1] < 0 && elementvec[2] > 0) ||
      (elementvec[0] > 0 && elementvec[1] > 0 && elementvec[2] < 0)
    ) {
      coe = [-1, 0.5];
      zdeg = Math.atan(elementvec[1] / elementvec[0]);
    } else if (
      elementvec[0] !== 0 &&
      elementvec[1] === 0 &&
      elementvec[2] === 0
    ) {
      zdeg = 0;
      coe = [0, 0.5];
    } else if (
      elementvec[0] === 0 &&
      elementvec[1] !== 0 &&
      elementvec[2] === 0
    ) {
      zdeg = 0.5 * Math.PI;
      coe = [0, 0.5];
    }

    ydeg =
      coe[0] *
        Math.acos(
          (elementvec[0] * elementvec[0] + elementvec[1] * elementvec[1]) /
            (Math.sqrt(
              elementvec[0] ** 2 + elementvec[1] ** 2 + elementvec[2] ** 2
            ) *
              Math.sqrt(elementvec[0] ** 2 + elementvec[1] ** 2))
        ) +
      coe[1] * Math.PI;
  }

  return (
    <mesh
      position={[locx, locz, locy]}
      rotation={[xdeg, zdeg, ydeg]}
      onClick={() => {}}
    >
      <boxGeometry args={[H, length, B]}></boxGeometry>
      {props.displaycolor === "sect" && (
        <meshStandardMaterial
          transparent={true}
          opacity={0.3}
          color={sectcolor}
        />
      )}
      {props.displaycolor === "mat" && (
        <meshStandardMaterial
          transparent={true}
          opacity={0.3}
          color={matcolor}
        />
      )}
    </mesh>
  );
}
