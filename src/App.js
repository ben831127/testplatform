import React, { useState } from "react";
import Nav from "./components/Nav/Mainnav/Nav";
import Subnav from "./components/Nav/SubNav/Subnav";
import ModelCanvas from "./components/ModelCanvas/ModelCanvas";
import classes from "./App.module.scss";
import Gridinput from "./components/InputUI/Gridinput/Gridinput";
import Nodeinput from "./components/InputUI/Nodeinput/Nodeinput";
import BeamColumninput from "./components/InputUI/Elementinput/BeamColumninput";
import Materialinput from "./components/InputUI/Materialinput/Materialinput";
import Sectioninput from "./components/InputUI/Sectioninput/Sectioninput";
import Elementrelease from "./components/InputUI/Elementrelease/Elementrelease";
import Jointrestrain from "./components/InputUI/Jointrestrain/Jointrestrain";
import LoadPatterninput from "./components/InputUI/Load/Loadpatterninput/LoadPatterninput";
import LoadCaseInput from "./components/InputUI/Load/Loadcaseinput/LoadCaseInput";
import NodeLoadInput from "./components/InputUI/Load/Loadinput/NodeLoadInput/NodeLoadInput";
import DistributedLoadInput from "./components/InputUI/Load/Loadinput/DistributedLoadInput/DistributedLoadInput";
import Options from "./components/Options/Options";

function App() {
  const [BCdata, setBCdata] = useState([]); // BeamColumnelements Data
  const [elementstate, setelementstate] = useState({
    displaycolor: "sect",
    extrude: false,
    release: true,
  });
  const [Optionstrigger, setOptionstrigger] = useState(false);
  const [view, setview] = useState(1); //視角更新：1、2 3D視角
  const [inputview, setinputview] = useState(0); //左方輸入視窗選項:1:points 2:BC elements
  const [selectnode, setselectnode] = useState([]); //
  const [selectBC, setselectBC] = useState([]); //
  const [originalnodesdata, setoriginalnodesdata] = useState(); //
  const [originalBCdata, setoriginalBCdata] = useState(); //
  const [Gridtrigger, setGridtrigger] = useState(false); //
  const [Mattrigger, setMattrigger] = useState(false); //
  const [Secttrigger, setSecttrigger] = useState(false); //
  const [Releasetrigger, setReleasetrigger] = useState(false);
  const [Restraintrigger, setRestraintrigger] = useState(false);
  const [patternTrigger, setPatternTrigger] = useState(false);
  const [caseTrigger, setCaseTrigger] = useState(false);
  const [nodeLoadTrigger, setNodeLoadTrigger] = useState(false);
  const [distLoadTrigger, setDistLoadTrigger] = useState(false);
  const [state, setstate] = useState(1); //state: 1:selectmode 2:addBCmode

  const viewhandler = () => {
    if (view === 1) {
      setview(2);
    } else if (view === 2) {
      setview(1);
    }
  };

  //XGridline
  const [xgriddata, setxgriddata] = useState([
    { id: Math.random(), gridID: "x1", ordinate: 0 },
    { id: Math.random(), gridID: "x2", ordinate: 5 },
    { id: Math.random(), gridID: "x3", ordinate: 10 },
  ]);
  //YGridline
  const [ygriddata, setygriddata] = useState([
    { id: Math.random(), gridID: "y1", ordinate: 0 },
    { id: Math.random(), gridID: "y2", ordinate: 5 },
    { id: Math.random(), gridID: "y3", ordinate: 10 },
  ]);
  //ZGridline
  const [zgriddata, setzgriddata] = useState([
    { id: Math.random(), gridID: "1F", ordinate: 0 },
    { id: Math.random(), gridID: "2F", ordinate: 3 },
    { id: Math.random(), gridID: "3F", ordinate: 10 },
  ]);
  //nodedata
  const [nodesdatas, setnodesdatas] = useState([
    {
      id: Math.random(),
      label: 1,
      x: 0,
      y: 0,
      z: 0,
      restrain: { d1: 0, d2: 0, d3: 0, r1: 0, r2: 0, r3: 0 },
    },
    {
      id: Math.random(),
      label: 2,
      x: 10,
      y: 10,
      z: 10,
      restrain: { d1: 0, d2: 0, d3: 0, r1: 0, r2: 0, r3: 0 },
    },
    {
      id: Math.random(),
      label: 3,
      x: 0,
      y: 10,
      z: 5,
      restrain: { d1: 0, d2: 0, d3: 0, r1: 0, r2: 0, r3: 0 },
    },
    {
      id: Math.random(),
      label: 4,
      x: 10,
      y: 0,
      z: 0,
      restrain: { d1: 0, d2: 0, d3: 0, r1: 0, r2: 0, r3: 0 },
    },
  ]);

  //Material data
  const [mats, setmats] = useState([
    {
      id: Math.random(),
      name: "SN400",
      matcolor: "#0098ff",
      type: "steel",
      weight: 1000,
      E: 20000,
      poisson: 0.3,
      other: {},
    },
    {
      id: Math.random(),
      name: "Wood1",
      matcolor: "#0098ff",
      type: "wood",
      weight: 2000,
      E: 30000,
      poisson: 0.3,
      other: {},
    },
    {
      id: Math.random(),
      name: "Wood2",
      matcolor: "#0098ff",
      type: "wood",
      weight: 3000,
      E: 40000,
      poisson: 0.3,
      other: {},
    },
    {
      id: Math.random(),
      name: "Wood3",
      matcolor: "#0098ff",
      type: "wood",
      weight: 4000,
      E: 50000,
      poisson: 0.3,
      other: {},
    },
  ]);

  //section data
  const [sects, setsects] = useState([
    {
      id: Math.random(),
      name: "sec1",
      sectcolor: "#0098ff",
      mat: "Wood1",
      type: "rect",
      param: {
        B: 30,
        H: 40,
        Area: 1200,
        Ix: 160000,
        Iy: 90000,
        Zx: 8000,
        Zy: 6000,
      },
    },
    {
      id: Math.random(),
      name: "sec2",
      sectcolor: "#0098ff",
      mat: "Wood2",
      type: "other",
      param: { Area: 1200, Ix: 90000, Iy: 160000, Zx: 6000, Zy: 8000 },
    },
  ]);

  //BCelementdata
  const [BCelementdatas, setBCelementdatas] = useState([
    {
      id: Math.random(),
      label: 1,
      startnode: 1,
      endnode: 2,
      sect: "sec1",
      release: {
        startrelease: [0, 0, 0, 0, 0, 0],
        endrelease: [0, 0, 0, 0, 0, 0],
      },
    },
    {
      id: Math.random(),
      label: 2,
      startnode: 1,
      endnode: 3,
      sect: "sec1",
      release: {
        startrelease: [1, 1, 1, 0, 0, 0],
        endrelease: [1, 1, 1, 0, 0, 0],
      },
    },
    {
      id: Math.random(),
      label: 3,
      startnode: 1,
      endnode: 4,
      sect: "sec1",
      release: {
        startrelease: [1, 1, 1, 0, 0, 0],
        endrelease: [1, 1, 1, 0, 0, 0],
      },
    },
  ]);

  //loaddata
  const [loadPattern, setLoadPattern] = useState([
    {
      id: Math.random(),
      patternName: "DL",
      type: "DEAD",
      selfWeightFactor: 1,
    },
    {
      id: Math.random(),
      patternName: "LL",
      type: "LIVE",
      selfWeightFactor: 0,
    },
  ]);

  const [loadCase, setLoadCase] = useState([
    {
      id: Math.random(),
      caseName: "DL+LL",
      patternData: [
        { id: 1, patternName: "DL", patternFactor: 1 },
        { id: 2, patternName: "LL", patternFactor: 1 },
      ],
    },
  ]);

  const [nodeLoad, setNodeLoad] = useState([
    {
      id: Math.random(),
      patternName: "DL",
      loadData: [
        {
          id: Math.random(),
          nodelabel: 3,
          Px: 0,
          Py: 0,
          Pz: 0,
          Mx: 0,
          My: 0,
          Mz: 0,
        },
        {
          id: Math.random(),
          nodelabel: 4,
          Px: 0,
          Py: 0,
          Pz: 0,
          Mx: -5,
          My: -5,
          Mz: -5,
        },
      ],
    },
    {
      id: Math.random(),
      patternName: "LL",
      loadData: [
        {
          id: Math.random(),
          nodelabel: 3,
          Px: 0,
          Py: 0,
          Pz: 0,
          Mx: 0,
          My: 0,
          Mz: 0,
        },
        {
          id: Math.random(),
          nodelabel: 4,
          Px: 0,
          Py: 0,
          Pz: 0,
          Mx: 0,
          My: 0,
          Mz: 0,
        },
      ],
    },
  ]);

  const [distributedLoad, setDistributedLoad] = useState([
    {
      id: Math.random(),
      patternName: "DL",
      loadData: [
        { id: Math.random(), elementlabel: 3, Wx: 0, Wy: 0, Wz: 0 },
        { id: Math.random(), elementlabel: 2, Wx: 0, Wy: 0, Wz: 0 },
        { id: Math.random(), elementlabel: 1, Wx: 0, Wy: 0, Wz: 0 },
      ],
    },
  ]);
  //Show Force
  const [showPattern, setShowPattern] = useState("DL");

  return (
    <div className={classes.app}>
      <div className={classes.popup}>
        <Gridinput
          xgrid={xgriddata}
          ygrid={ygriddata}
          zgrid={zgriddata}
          trigger={Gridtrigger}
          setTrigger={setGridtrigger}
          setxgriddata={setxgriddata}
          setygriddata={setygriddata}
          setzgriddata={setzgriddata}
        ></Gridinput>
        <Materialinput
          setMattrigger={setMattrigger}
          setmats={setmats}
          trigger={Mattrigger}
          mats={mats}
          sects={sects}
        ></Materialinput>
        <Sectioninput
          setSecttrigger={setSecttrigger}
          setsects={setsects}
          trigger={Secttrigger}
          mats={mats}
          sects={sects}
          BCelementdatas={BCelementdatas}
        ></Sectioninput>
        <Options
          trigger={Optionstrigger}
          setOptionstrigger={setOptionstrigger}
          setelementstate={setelementstate}
          elementstate={elementstate}
        ></Options>
        <Elementrelease
          trigger={Releasetrigger}
          BCelementdatas={BCelementdatas}
          selectBC={selectBC}
          setselectBC={setselectBC}
          setselectnode={setselectnode}
          setReleasetrigger={setReleasetrigger}
          setBCelementdatas={setBCelementdatas}
        ></Elementrelease>
        <Jointrestrain
          trigger={Restraintrigger}
          nodesdatas={nodesdatas}
          selectnode={selectnode}
          setRestraintrigger={setRestraintrigger}
          setselectnode={setselectnode}
          setselectBC={setselectBC}
          setnodesdatas={setnodesdatas}
        ></Jointrestrain>
        <LoadPatterninput
          loadPattern={loadPattern}
          trigger={patternTrigger}
          setLoadPattern={setLoadPattern}
          setPatternTrigger={setPatternTrigger}
        ></LoadPatterninput>
        <LoadCaseInput
          loadCase={loadCase}
          loadPattern={loadPattern}
          trigger={caseTrigger}
          setLoadCase={setLoadCase}
          setCaseTrigger={setCaseTrigger}
        ></LoadCaseInput>
        <NodeLoadInput
          nodeLoad={nodeLoad}
          nodesdatas={nodesdatas}
          loadPattern={loadPattern}
          trigger={nodeLoadTrigger}
          selectnode={selectnode}
          setNodeLoadTrigger={setNodeLoadTrigger}
          setNodeLoad={setNodeLoad}
          setselectnode={setselectnode}
        ></NodeLoadInput>
        <DistributedLoadInput
          distributedLoad={distributedLoad}
          BCelementdatas={BCelementdatas}
          loadPattern={loadPattern}
          trigger={distLoadTrigger}
          selectBC={selectBC}
          setDistLoadTrigger={setDistLoadTrigger}
          setDistributedLoad={setDistributedLoad}
          setselectBC={setselectBC}
        ></DistributedLoadInput>
      </div>

      <div className={classes.nav}>
        <Nav viewhandler={viewhandler}></Nav>
        <Subnav
          nodesdatas={nodesdatas}
          BCelementdatas={BCelementdatas}
          setoriginalnodesdata={setoriginalnodesdata}
          setoriginalBCdata={setoriginalBCdata}
          viewhandler={viewhandler}
          setGridtrigger={setGridtrigger}
          setinputview={setinputview}
          setMattrigger={setMattrigger}
          setSecttrigger={setSecttrigger}
          setstate={setstate}
          setelementstate={setelementstate}
          setOptionstrigger={setOptionstrigger}
          setReleasetrigger={setReleasetrigger}
          setRestraintrigger={setRestraintrigger}
          setPatternTrigger={setPatternTrigger}
          setCaseTrigger={setCaseTrigger}
          setNodeLoadTrigger={setNodeLoadTrigger}
          setDistLoadTrigger={setDistLoadTrigger}
        ></Subnav>
      </div>
      <div className={classes.inputcanvas}>
        <div className={classes.inputui}>
          {inputview === 1 && (
            <Nodeinput
              setinputview={setinputview}
              setnodesdatas={setnodesdatas}
              setselectnode={setselectnode}
              selectnode={selectnode}
              nodesdatas={nodesdatas}
              originalnodesdata={originalnodesdata}
            ></Nodeinput>
          )}
          {inputview === 2 && (
            <BeamColumninput
              setinputview={setinputview}
              sects={sects}
              nodesdatas={nodesdatas}
              BCelementdatas={BCelementdatas}
              setBCelementdatas={setBCelementdatas}
              originalBCdata={originalBCdata}
              setstate={setstate}
              selectBC={selectBC}
              setselectBC={setselectBC}
            ></BeamColumninput>
          )}
        </div>
        <div
          className={classes.can}
          style={
            ((Gridtrigger ||
              Mattrigger ||
              Secttrigger ||
              Optionstrigger ||
              Releasetrigger ||
              Restraintrigger ||
              patternTrigger ||
              caseTrigger ||
              nodeLoadTrigger ||
              distLoadTrigger) && {
              zIndex: -2,
            }) || {
              zIndex: 0,
            }
          }
          onKeyDown={(e) => {
            if (e.key === "Delete") {
              let newnodedatas = [];
              let newnodeload = [];
              let newdistload = [];
              let deleteBC = []; //因刪除點位而刪除之BC桿件
              let deletenodeload = []; //因刪除點位而刪除之nodeload id
              let deletedistload = []; //因刪除點位而刪除之distload id
              let newBCdatas = [];
              let newnodelabel = 1;
              let newBClabel = 1;
              nodesdatas.map((data) => {
                if (
                  data.id !==
                  selectnode.filter((selectdata) => selectdata === data.id)[0]
                ) {
                  BCelementdatas.map((BCelement) => {
                    if (BCelement.startnode === data.label) {
                      BCelement.startnode = newnodelabel;
                    }
                    if (BCelement.endnode === data.label) {
                      BCelement.endnode = newnodelabel;
                    }
                  });

                  nodeLoad.map((pattern) => {
                    pattern.loadData.map((load) => {
                      if (load.nodelabel === data.label) {
                        load.nodelabel = newnodelabel;
                      }
                    });
                  });
                  newnodedatas = [
                    ...newnodedatas,
                    {
                      id: data.id,
                      label: newnodelabel,
                      x: data.x,
                      y: data.y,
                      z: data.z,
                      restrain: data.restrain,
                    },
                  ];
                  newnodelabel += 1;
                } else {
                  BCelementdatas.map((BCelement) => {
                    if (
                      BCelement.startnode === data.label ||
                      BCelement.endnode === data.label
                    ) {
                      deleteBC = [...deleteBC, BCelement.id];
                    }
                  });
                  nodeLoad.map((pattern) => {
                    pattern.loadData.map((load) => {
                      if (load.nodelabel === data.label) {
                        deletenodeload = [...deletenodeload, load.id];
                      }
                    });
                  });
                }
              });

              nodeLoad.map((pattern) => {
                let newload = [];
                pattern.loadData.map((load) => {
                  if (
                    load.id !==
                    deletenodeload.filter((del) => del === load.id)[0]
                  ) {
                    newload = [...newload, load];
                  }
                });
                newnodeload = [
                  ...newnodeload,
                  {
                    id: pattern.id,
                    patternName: pattern.patternName,
                    loadData: newload,
                  },
                ];
              });

              BCelementdatas.map((data) => {
                if (
                  data.id !==
                    selectBC.filter(
                      (selectdata) => selectdata === data.id
                    )[0] &&
                  data.id !==
                    deleteBC.filter((deletetdata) => deletetdata === data.id)[0]
                ) {
                  newBCdatas = [
                    ...newBCdatas,
                    {
                      id: data.id,
                      label: newBClabel,
                      startnode: data.startnode,
                      endnode: data.endnode,
                      sect: data.sect,
                      release: data.release,
                    },
                  ];
                  distributedLoad.map((pattern) => {
                    pattern.loadData.map((load) => {
                      if (load.elementlabel === data.label) {
                        load.elementlabel = newnodelabel;
                      }
                    });
                  });
                  newBClabel += 1;
                } else {
                  distributedLoad.map((pattern) => {
                    pattern.loadData.map((load) => {
                      if (load.elementlabel === data.label) {
                        deletedistload = [...deletedistload, load.id];
                      }
                    });
                  });
                }
              });

              distributedLoad.map((pattern) => {
                let newload = [];
                pattern.loadData.map((load) => {
                  if (
                    load.id !==
                    deletedistload.filter((del) => del === load.id)[0]
                  ) {
                    newload = [...newload, load];
                  }
                });
                newdistload = [
                  ...newdistload,
                  {
                    id: pattern.id,
                    patternName: pattern.patternName,
                    loadData: newload,
                  },
                ];
              });
              setnodesdatas(newnodedatas);
              setBCelementdatas(newBCdatas);
              setNodeLoad(newnodeload);
              setDistributedLoad(newdistload);
              setselectnode([]);
              setselectBC([]);
            } else if (e.key === "Escape") {
              setselectnode([]);
              setselectBC([]);
            }
          }}
          tabIndex="0"
        >
          {view === 1 && (
            <ModelCanvas
              data={BCdata}
              xgrid={xgriddata}
              ygrid={ygriddata}
              zgrid={zgriddata}
              nodesdatas={nodesdatas}
              BCelementdatas={BCelementdatas}
              setselectnode={setselectnode}
              selectnode={selectnode}
              state={state}
              setselectBC={setselectBC}
              selectBC={selectBC}
              sects={sects}
              elementstate={elementstate}
              mats={mats}
              nodeLoad={nodeLoad}
              distributedLoad={distributedLoad}
              showPattern={showPattern}
            ></ModelCanvas>
          )}
          {view === 2 && (
            <ModelCanvas
              data={BCdata}
              xgrid={xgriddata}
              ygrid={ygriddata}
              zgrid={zgriddata}
              nodesdatas={nodesdatas}
              BCelementdatas={BCelementdatas}
              setselectnode={setselectnode}
              selectnode={selectnode}
              state={state}
              setselectBC={setselectBC}
              selectBC={selectBC}
              sects={sects}
              elementstate={elementstate}
              mats={mats}
              nodeLoad={nodeLoad}
              distributedLoad={distributedLoad}
              showPattern={showPattern}
            ></ModelCanvas>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
