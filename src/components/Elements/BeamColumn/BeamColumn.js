import React from "react";
import BC2points from "./BC2points";
import BeanColumnLine from "./BeanColumnLine";

export default function BeamColumn(props) {
  const rectsects = props.sects
    .filter((sect) => sect.type === "rect")
    .map((data) => data.name);
  const othersects = props.sects
    .filter((sect) => sect.type === "other")
    .map((data) => data.name);

  const rectBC = props.BCelementdatas.filter(
    (data) => rectsects.includes(data.sect) === true
  ).map((data) =>
    data.id ===
    props.selectBC.filter((selectdata) => selectdata === data.id)[0] ? (
      <mesh
        key={data.id}
        onClick={() => {
          props.setselectBC(
            props.selectBC.filter((selectdata) => selectdata !== data.id)
          );
        }}
      >
        <BC2points
          sects={props.sects}
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          sect={data.sect}
        ></BC2points>
        <BeanColumnLine
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          dashed={true}
          color={"black"}
        ></BeanColumnLine>
      </mesh>
    ) : (
      <mesh
        key={data.id}
        onClick={() => {
          props.setselectBC([...props.selectBC, data.id]);
        }}
      >
        <BC2points
          sects={props.sects}
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          sect={data.sect}
        ></BC2points>
      </mesh>
    )
  );

  const otherBC = props.BCelementdatas.filter(
    (data) => othersects.includes(data.sect) === true
  ).map((data) =>
    data.id ===
    props.selectBC.filter((selectdata) => selectdata === data.id)[0] ? (
      <mesh
        key={data.id}
        onClick={() => {
          props.setselectBC(
            props.selectBC.filter((selectdata) => selectdata !== data.id)
          );
        }}
      >
        <BeanColumnLine
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          dashed={false}
          color={
            props.sects.filter((sect) => sect.name === data.sect)[0].sectcolor
          }
        ></BeanColumnLine>
        <BeanColumnLine
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          dashed={true}
          color={"black"}
        ></BeanColumnLine>
      </mesh>
    ) : (
      <mesh
        key={data.id}
        onClick={() => {
          props.setselectBC([...props.selectBC, data.id]);
        }}
      >
        <BeanColumnLine
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          dashed={false}
          color={
            props.sects.filter((sect) => sect.name === data.sect)[0].sectcolor
          }
        ></BeanColumnLine>
      </mesh>
    )
  );
  return (
    <mesh>
      {rectBC}
      {otherBC}
    </mesh>
  );
}
