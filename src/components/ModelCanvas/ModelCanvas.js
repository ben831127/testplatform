import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Nodes from "../Elements/Nodes";
import BeamColumn from "../Elements/BeamColumn/BeamColumn";
import Restrains from "../Boundaryconditions/Restrains/Restrains";
import Beamrelease from "../Boundaryconditions/Beamrelease/Beamrelease";
import Load from "../Loads/Load";

import Camera from "./Camera";
import Gridline from "../Grid/Gridline";
import Axeshelper from "../Axeshelper/Axeshelper";
import * as THREE from "three";

export default function ModelCanvas(props) {
  return (
    <Canvas>
      <Camera></Camera>
      <ambientLight></ambientLight>
      <pointLight position={[1000, 1000, 1000]}></pointLight>
      <Axeshelper scale={1} width={3}></Axeshelper>
      <Nodes
        nodesdatas={props.nodesdatas}
        setselectnode={props.setselectnode}
        selectnode={props.selectnode}
      ></Nodes>
      <BeamColumn
        nodesdatas={props.nodesdatas}
        BCelementdatas={props.BCelementdatas}
        setselectBC={props.setselectBC}
        selectBC={props.selectBC}
        sects={props.sects}
        mats={props.mats}
        state={props.state}
        elementstate={props.elementstate}
      ></BeamColumn>
      <Restrains nodesdatas={props.nodesdatas}></Restrains>
      <Beamrelease
        nodesdatas={props.nodesdatas}
        BCelementdatas={props.BCelementdatas}
        extrude={props.elementstate.extrude}
        release={props.elementstate.release}
      ></Beamrelease>
      <Load
        nodesdatas={props.nodesdatas}
        BCelementdatas={props.BCelementdatas}
        nodeLoad={props.nodeLoad}
        distributedLoad={props.distributedLoad}
        showPattern={props.showPattern}
      ></Load>
      <Gridline
        width={1}
        xgrid={props.xgrid}
        ygrid={props.ygrid}
        zgrid={props.zgrid}
      ></Gridline>

      <OrbitControls
        mouseButtons={{ LEFT: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE }}
      ></OrbitControls>
    </Canvas>
  );
}
