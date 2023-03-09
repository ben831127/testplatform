import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Nodes from "../Elements/Nodes";
import BeanColumnLine from "../Elements/BeamColumn/BeanColumnLine";
import BeamColumn from "../Elements/BeamColumn/BeamColumn";

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
        state={props.state}
      ></BeamColumn>
      {/* <gridHelper args={[30, 30]}></gridHelper> */}
      <Axeshelper scale={1} width={3}></Axeshelper>
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
