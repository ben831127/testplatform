import React, { useEffect, useState } from "react";
import Nav from "./components/Nav/Mainnav/Nav";
import Subnav from "./components/Nav/SubNav/Subnav";
import ModelCanvas from "./components/ModelCanvas/ModelCanvas";
import InputUI from "./components/InputUI/InputUI";
import classes from "./App.module.scss";
import Gridinput from "./components/InputUI/Gridinput/Gridinput";
import Nodeinput from "./components/InputUI/Nodeinput/Nodeinput";
import BeamColumninput from "./components/InputUI/Elementinput/BeamColumninput";
import Materialinput from "./components/InputUI/Materialinput/Materialinput";
import Sectioninput from "./components/InputUI/Sectioninput/Sectioninput";

// console.log = () => {};

function App() {
  const [BCdata, setBCdata] = useState([]); // BeamColumnelements Data
  const [view, setview] = useState(1); //
  const [inputview, setinputview] = useState(0); //
  const [selectnode, setselectnode] = useState([]); //
  const [selectBC, setselectBC] = useState([]); //
  const [originalnodesdata, setoriginalnodesdata] = useState(); //
  const [originalBCdata, setoriginalBCdata] = useState(); //
  const [Gridtrigger, setGridtrigger] = useState(false); //
  const [Mattrigger, setMattrigger] = useState(false); //
  const [Secttrigger, setSecttrigger] = useState(false); //
  const [state, setstate] = useState(1); //state: 1:selectmode 2:addBCmode

  const datahandler = (data) => {
    setBCdata(data);
  };

  const viewhandler = () => {
    if (view === 1) {
      setview(2);
    } else if (view === 2) {
      setview(1);
    }
  };

  const [xgriddata, setxgriddata] = useState([
    { id: Math.random(), gridID: "x1", ordinate: 0 },
    { id: Math.random(), gridID: "x2", ordinate: 5 },
    { id: Math.random(), gridID: "x3", ordinate: 10 },
  ]);
  const [ygriddata, setygriddata] = useState([
    { id: Math.random(), gridID: "y1", ordinate: 0 },
    { id: Math.random(), gridID: "y2", ordinate: 5 },
    { id: Math.random(), gridID: "y3", ordinate: 10 },
  ]);
  const [zgriddata, setzgriddata] = useState([
    { id: Math.random(), gridID: "1F", ordinate: 0 },
    { id: Math.random(), gridID: "2F", ordinate: 3 },
    { id: Math.random(), gridID: "3F", ordinate: 10 },
  ]);

  const [nodesdatas, setnodesdatas] = useState([
    { id: Math.random(), label: 1, x: 0, y: 0, z: 0 },
    { id: Math.random(), label: 2, x: 10, y: 10, z: 10 },
    { id: Math.random(), label: 3, x: 0, y: 10, z: 5 },
  ]);

  const [BCelementdatas, setBCelementdatas] = useState([
    {
      id: Math.random(),
      label: 1,
      startnode: 1,
      endnode: 2,
      sect: "sec1",
      release: {
        startreleaes: [1, 1, 1, 1, 1, 1],
        endrelease: [1, 1, 1, 1, 1, 1],
      },
    },
    {
      id: Math.random(),
      label: 2,
      startnode: 1,
      endnode: 3,
      sect: "sec1",
      release: {
        startreleaes: [1, 1, 1, 1, 1, 1],
        endrelease: [1, 1, 1, 1, 1, 1],
      },
    },
  ]);

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
        ></Subnav>
      </div>
      <div className={classes.inputcanvas}>
        <div className={classes.inputui}>
          {inputview === 0 && <InputUI data={datahandler}></InputUI>}
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
            ((Gridtrigger || Mattrigger || Secttrigger) && { zIndex: -2 }) || {
              zIndex: 0,
            }
          }
          onKeyDown={(e) => {
            if (e.key === "Delete") {
              let newnodedatas = [];
              let deleteBC = []; //因刪除點位而刪除之BC桿件
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
                  newnodedatas = [
                    ...newnodedatas,
                    {
                      id: data.id,
                      label: newnodelabel,
                      x: data.x,
                      y: data.y,
                      z: data.z,
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
                }
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
                  newBClabel += 1;
                }
              });
              setnodesdatas(newnodedatas);
              setBCelementdatas(newBCdatas);
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
            ></ModelCanvas>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
