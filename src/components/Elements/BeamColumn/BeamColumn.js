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
        {props.elementstate.extrude === true && (
          <BC2points
            nodesdatas={props.nodesdatas}
            startnode={data.startnode}
            endnode={data.endnode}
            sects={props.sects}
            mats={props.mats}
            sect={data.sect}
            mat={data.mat}
            displaycolor={props.elementstate.displaycolor}
          ></BC2points>
        )}
        {props.elementstate.extrude === false && (
          <BeanColumnLine
            nodesdatas={props.nodesdatas}
            startnode={data.startnode}
            endnode={data.endnode}
            sects={props.sects}
            mats={props.mats}
            sect={data.sect}
            mat={data.mat}
            displaycolor={props.elementstate.displaycolor}
            dashed={false}
          ></BeanColumnLine>
        )}
        <BeanColumnLine
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          sects={props.sects}
          mats={props.mats}
          sect={data.sect}
          mat={data.mat}
          displaycolor={props.elementstate.displaycolor}
          dashed={true}
        ></BeanColumnLine>
      </mesh>
    ) : (
      <mesh
        key={data.id}
        onClick={() => {
          props.setselectBC([...props.selectBC, data.id]);
        }}
      >
        {props.elementstate.extrude === true && (
          <BC2points
            sects={props.sects}
            mats={props.mats}
            nodesdatas={props.nodesdatas}
            startnode={data.startnode}
            endnode={data.endnode}
            sect={data.sect}
            displaycolor={props.elementstate.displaycolor}
          ></BC2points>
        )}
        {props.elementstate.extrude === false && (
          <BeanColumnLine
            nodesdatas={props.nodesdatas}
            startnode={data.startnode}
            endnode={data.endnode}
            sects={props.sects}
            mats={props.mats}
            sect={data.sect}
            mat={data.mat}
            displaycolor={props.elementstate.displaycolor}
            dashed={false}
          ></BeanColumnLine>
        )}
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
          sects={props.sects}
          mats={props.mats}
          sect={data.sect}
          mat={data.mat}
          displaycolor={props.elementstate.displaycolor}
          dashed={false}
        ></BeanColumnLine>
        <BeanColumnLine
          nodesdatas={props.nodesdatas}
          startnode={data.startnode}
          endnode={data.endnode}
          sects={props.sects}
          mats={props.mats}
          sect={data.sect}
          mat={data.mat}
          displaycolor={props.elementstate.displaycolor}
          dashed={true}
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
          sects={props.sects}
          mats={props.mats}
          sect={data.sect}
          mat={data.mat}
          displaycolor={props.elementstate.displaycolor}
          dashed={false}
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
