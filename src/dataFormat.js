//gridLine data
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

///RESETDATA
//NodeData
const [nodesdatas, setnodesdatas] = useState([]);
//BeamcolumnData
const [BCelementdatas, setBCelementdatas] = useState([]);
//MaterialData
const [mats, setmats] = useState([]);
//SectionData
const [sects, setsects] = useState([]);
//LoadData
const [loadPattern, setLoadPattern] = useState([]);

const [loadCase, setLoadCase] = useState([]);
const [nodeLoad, setNodeLoad] = useState([]);

const [distributedLoad, setDistributedLoad] = useState([]);
