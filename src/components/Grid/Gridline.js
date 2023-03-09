import React from "react";
import { Line } from "@react-three/drei";

export default function Gridline(props) {
  let xmin = 0;
  let xmax = 0;
  let ymin = 0;
  let ymax = 0;
  let zmin = 0;
  let zmax = 0;
  for (let i = 0; i < props.xgrid.length; i++) {
    if (xmax < props.xgrid[i].ordinate) {
      xmax = props.xgrid[i].ordinate;
    }
    if (xmin > props.xgrid[i].ordinate) {
      xmin = props.xgrid[i].ordinate;
    }
  }
  for (let i = 0; i < props.ygrid.length; i++) {
    if (ymax < props.ygrid[i].ordinate) {
      ymax = props.ygrid[i].ordinate;
    }
    if (ymin > props.ygrid[i].ordinate) {
      ymin = props.ygrid[i].ordinate;
    }
  }
  for (let i = 0; i < props.zgrid.length; i++) {
    if (zmax < props.zgrid[i].ordinate) {
      zmax = props.zgrid[i].ordinate;
    }
    if (zmin > props.zgrid[i].ordinate) {
      zmin = props.zgrid[i].ordinate;
    }
  }

  const xgridline = props.zgrid.map((zdata) =>
    props.xgrid.map((xdata) => (
      <Line
        key={xdata.id}
        points={[
          [xdata.ordinate, zdata.ordinate, -ymax],
          [xdata.ordinate, zdata.ordinate, -ymin],
        ]}
        color="gray"
        lineWidth={props.width}
      />
    ))
  );

  const ygridline = props.zgrid.map((zdata) =>
    props.ygrid.map((ydata) => (
      <Line
        key={ydata.id}
        points={[
          [xmax, zdata.ordinate, , -ydata.ordinate],
          [xmin, zdata.ordinate, , -ydata.ordinate],
        ]}
        color="gray"
        lineWidth={props.width}
      />
    ))
  );

  const zgridline = props.ygrid.map((ydata) =>
    props.xgrid.map((xdata) => (
      <Line
        key={xdata.id + ydata.id}
        points={[
          [xdata.ordinate, zmin, , -ydata.ordinate],
          [xdata.ordinate, zmax, , -ydata.ordinate],
        ]}
        color="gray"
        lineWidth={props.width}
      />
    ))
  );

  return (
    <mesh>
      {xgridline}
      {ygridline}
      {zgridline}
      {/* <Line
        points={[
          [0, 0, -25],
          [0, 0, 25],
        ]}
        color="gray"
        lineWidth={props.width}
      /> */}
    </mesh>
  );
}
