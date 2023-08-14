import React, { useState, useRef, useMemo } from "react";
import classes from "./CaseForm.module.scss";

export default function CaseForm(props) {
  const nameRef = useRef();
  const addRef = useRef();
  const caseRef = useRef();

  const add = () => {
    let newcase = [
      ...props.editCasedata.patternData,
      {
        id: props.editCasedata.patternData.length + 1,
        patternName: addRef.current.childNodes[0].childNodes[0].value,
        patternFactor: +addRef.current.childNodes[1].childNodes[0].value,
      },
    ];
    props.setEditCaseData({
      id: props.editCasedata.id,
      caseName: props.editCasedata.caseName,
      patternData: newcase,
    });
  };

  const del = (id) => {
    let newcase = [];

    props.editCasedata.patternData.map((data) => {
      if (data.id != id) {
        newcase = [
          ...newcase,
          {
            id: data.id,
            patternName: data.patternName,
            patternFactor: data.patternFactor,
          },
        ];
      }
    });
    props.setEditCaseData({
      id: props.editCasedata.id,
      caseName: props.editCasedata.caseName,
      patternData: newcase,
    });
  };

  const updatadata = () => {
    if (nameRef.current.value != "") {
      let newcase = [];
      for (let i = 0; i < caseRef.current.childNodes.length; i++) {
        newcase = [
          ...newcase,
          {
            id: i + 1,
            patternName:
              caseRef.current.childNodes[i].childNodes[0].childNodes[0].value,
            patternFactor:
              +caseRef.current.childNodes[i].childNodes[1].childNodes[0].value,
          },
        ];
      }
      let newloadcase = [];
      props.loadCase.map((data) => {
        if (data.id === props.editCasedata.id) {
          newloadcase = [
            ...newloadcase,
            {
              id: props.editCasedata.id,
              caseName: nameRef.current.value,
              patternData: newcase,
            },
          ];
        } else {
          newloadcase = [...newloadcase, data];
        }
      });
      if (props.editCasedata.id === 1) {
        newloadcase = [
          ...newloadcase,
          {
            id: Math.random(),
            caseName: nameRef.current.value,
            patternData: newcase,
          },
        ];
      }
      props.setLoadCase(newloadcase);
      props.setCaseformtrigger(false);
    } else {
      alert("Please input case name.");
    }
  };

  const addCaseTable = (
    <table>
      <thead>
        <tr>
          <th>Load Case</th>
          <th>Factor</th>
        </tr>
      </thead>
      <tbody>
        <tr ref={addRef}>
          <td>
            <select>
              {props.loadPattern.map((data) => (
                <option key={data.id} value={data.patternName}>
                  {data.patternName}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input type="number" defaultValue={0} min={0}></input>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const showCase = (
    <table>
      <thead>
        <tr>
          <th>Load Case</th>
          <th>Factor</th>
          <th></th>
        </tr>
      </thead>
      <tbody ref={caseRef}>
        {props.editCasedata.patternData.map((data) => (
          <tr key={data.id}>
            <td>
              <select defaultValue={data.patternName}>
                {props.loadPattern.map((Pattern) => (
                  <option key={Pattern.id} value={Pattern.patternName}>
                    {Pattern.patternName}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input type="number" defaultValue={data.patternFactor}></input>
            </td>
            <td>
              <button
                onClick={() => {
                  del(data.id);
                }}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return props.trigger ? (
    <div className={classes.caseform}>
      <div className={classes.inner}>
        <h1>Case Properties</h1>
        <div className={classes.name}>
          <div>Case Name</div>
          <input
            ref={nameRef}
            type="text"
            defaultValue={props.editCasedata.caseName}
          ></input>
        </div>
        <div className={classes.addcase}>
          {addCaseTable}
          <button
            onClick={() => {
              add();
            }}
          >
            add
          </button>
        </div>
        <div className={classes.showcase}>{showCase}</div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              updatadata();
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setCaseformtrigger(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
