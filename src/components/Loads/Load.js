import React from "react";
import PointLoad from "./PointLoad/PointLoad";
import DistributedLoadZdir from "./DistributedLoad/DistributedLoadZdir";
import DistributedLoadXdir from "./DistributedLoad/DistributedLoadXdir";
import DistributedLoadYdir from "./DistributedLoad/DistributedLoadYdir";
import * as THREE from "three";

export default function Load(props) {
  const nodeLoad = props.nodeLoad;
  const nodesdatas = props.nodesdatas;
  const showPattern = props.showPattern;

  //x y z 最大值 （計算繪圖比例用）
  let x_max = 0;
  let y_max = 0;
  let z_max = 0;
  nodeLoad.map((pattern) => {
    if (pattern.patternName === showPattern) {
      pattern.loadData.map((data) => {
        if (Math.abs(data.Px) > x_max) {
          x_max = Math.abs(data.Px);
        }
        if (Math.abs(data.Py) > y_max) {
          y_max = Math.abs(data.Py);
        }
        if (Math.abs(data.Pz) > z_max) {
          z_max = Math.abs(data.Pz);
        }
      });
    }
  });
  props.distributedLoad.map((pattern) => {
    if (pattern.patternName === showPattern) {
      pattern.loadData.map((data) => {
        if (Math.abs(data.Wx) > x_max) {
          x_max = Math.abs(data.Wx);
        }
        if (Math.abs(data.Wy) > y_max) {
          y_max = Math.abs(data.Wy);
        }
        if (Math.abs(data.Wz) > z_max) {
          z_max = Math.abs(data.Wz);
        }
      });
    }
  });

  //以label求座標
  const position = (nodelabel) => {
    let coord = [0, 0, 0];
    nodesdatas.map((data) => {
      if (data.label === nodelabel) {
        coord = [data.x, data.y, data.z];
      }
    });
    return coord;
  };

  const showForce = nodeLoad.map((pattern) =>
    pattern.patternName === showPattern ? (
      <mesh key={pattern.id}>
        {/* x方向點載重 */}
        {pattern.loadData.map((data) =>
          data.Px != 0 ? (
            <PointLoad
              key={data.id}
              position={position(data.nodelabel)}
              value={data.Px}
              nodesdatas={props.nodesdatas}
              dir={
                data.Px > 0
                  ? new THREE.Vector3(1, 0, 0)
                  : new THREE.Vector3(-1, 0, 0)
              }
              moment={false}
            ></PointLoad>
          ) : (
            ""
          )
        )}
        {/* y方向點載重 */}
        {pattern.loadData.map((data) =>
          data.Py != 0 ? (
            <PointLoad
              key={data.id}
              position={position(data.nodelabel)}
              value={data.Py}
              nodesdatas={props.nodesdatas}
              dir={
                data.Py > 0
                  ? new THREE.Vector3(0, 0, -1)
                  : new THREE.Vector3(0, 0, 1)
              }
              moment={false}
            ></PointLoad>
          ) : (
            ""
          )
        )}
        {/* z方向載重 */}
        {pattern.loadData.map((data) =>
          data.Pz != 0 ? (
            <PointLoad
              key={data.id}
              position={position(data.nodelabel)}
              value={data.Pz}
              nodesdatas={props.nodesdatas}
              dir={
                data.Pz > 0
                  ? new THREE.Vector3(0, 1, 0)
                  : new THREE.Vector3(0, -1, 0)
              }
              moment={false}
            ></PointLoad>
          ) : (
            ""
          )
        )}
      </mesh>
    ) : (
      ""
    )
  );

  const showMoment = nodeLoad.map((pattern) =>
    pattern.patternName === showPattern ? (
      <mesh key={pattern.id}>
        {/* x方向彎舉 */}
        {pattern.loadData.map((data) =>
          data.Mx != 0 ? (
            <PointLoad
              key={data.id}
              position={position(data.nodelabel)}
              value={data.Mx}
              nodesdatas={props.nodesdatas}
              dir={
                data.Mx > 0
                  ? new THREE.Vector3(1, 0, 0)
                  : new THREE.Vector3(-1, 0, 0)
              }
              moment={true}
            ></PointLoad>
          ) : (
            ""
          )
        )}
        {/* y方向彎舉 */}
        {pattern.loadData.map((data) =>
          data.My != 0 ? (
            <PointLoad
              key={data.id}
              position={position(data.nodelabel)}
              value={data.My}
              nodesdatas={props.nodesdatas}
              dir={
                data.My > 0
                  ? new THREE.Vector3(0, 0, -1)
                  : new THREE.Vector3(0, 0, 1)
              }
              moment={true}
            ></PointLoad>
          ) : (
            ""
          )
        )}
        {/* z方向彎舉  */}
        {pattern.loadData.map((data) =>
          data.Mz != 0 ? (
            <PointLoad
              key={data.id}
              position={position(data.nodelabel)}
              value={data.Mz}
              nodesdatas={props.nodesdatas}
              dir={
                data.Mz > 0
                  ? new THREE.Vector3(0, 1, 0)
                  : new THREE.Vector3(0, -1, 0)
              }
              moment={true}
            ></PointLoad>
          ) : (
            ""
          )
        )}
      </mesh>
    ) : (
      ""
    )
  );

  const showdistributedload = props.distributedLoad.map((pattern) =>
    pattern.patternName === showPattern ? (
      <mesh key={pattern.id}>
        {pattern.loadData.map((data) =>
          data.Wx != 0 ? (
            <DistributedLoadXdir
              key={data.id}
              BCelementdatas={props.BCelementdatas}
              nodesdatas={props.nodesdatas}
              load={data}
              distributedLoad={props.distributedLoad}
              arrowdir={
                data.Wx > 0
                  ? new THREE.Vector3(1, 0, 0)
                  : new THREE.Vector3(-1, 0, 0)
              }
              dir={new THREE.Vector3(1, 0, 0)}
              maxValue={x_max}
            ></DistributedLoadXdir>
          ) : (
            ""
          )
        )}
        {pattern.loadData.map((data) =>
          data.Wy != 0 ? (
            <DistributedLoadYdir
              key={data.id}
              BCelementdatas={props.BCelementdatas}
              nodesdatas={props.nodesdatas}
              load={data}
              distributedLoad={props.distributedLoad}
              arrowdir={
                data.Wy > 0
                  ? new THREE.Vector3(0, 0, -1)
                  : new THREE.Vector3(0, 0, 1)
              }
              dir={new THREE.Vector3(1, 0, 0)}
              maxValue={y_max}
            ></DistributedLoadYdir>
          ) : (
            ""
          )
        )}
        {pattern.loadData.map((data) =>
          data.Wz != 0 ? (
            <DistributedLoadZdir
              key={data.id}
              BCelementdatas={props.BCelementdatas}
              nodesdatas={props.nodesdatas}
              load={data}
              distributedLoad={props.distributedLoad}
              arrowdir={
                data.Wz > 0
                  ? new THREE.Vector3(0, 1, 0)
                  : new THREE.Vector3(0, -1, 0)
              }
              dir={new THREE.Vector3(1, 0, 0)}
              maxValue={z_max}
            ></DistributedLoadZdir>
          ) : (
            ""
          )
        )}
      </mesh>
    ) : (
      ""
    )
  );
  return (
    <mesh>
      {showForce}
      {showMoment}
      {showdistributedload}
    </mesh>
  );
}
