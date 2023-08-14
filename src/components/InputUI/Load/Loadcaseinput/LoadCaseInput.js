import React, { useState } from "react";
import CaseForm from "./CaseForm";
import classes from "./LoadCaseInput.module.scss";

export default function LoadCaseInput(props) {
  const [caseformtrigger, setCaseformtrigger] = useState(false);
  const [editCasedata, setEditCaseData] = useState({
    id: Math.random(),
    caseName: "",
    patternData: [],
  });
  const casef = (
    <CaseForm
      trigger={caseformtrigger}
      editCasedata={editCasedata}
      loadCase={props.loadCase}
      loadPattern={props.loadPattern}
      setLoadCase={props.setLoadCase}
      setEditCaseData={setEditCaseData}
      setCaseformtrigger={setCaseformtrigger}
    ></CaseForm>
  );

  const edit = (data) => {
    setEditCaseData(data);
    setCaseformtrigger(true);
  };

  const del = (id) => {
    let newcase = [];
    props.loadCase.map((data) => {
      if (data.id != id) {
        newcase = [...newcase, data];
      }
    });
    props.setLoadCase(newcase);
  };

  const casetable = (
    <table>
      <tbody>
        {props.loadCase.map((data) => (
          <tr key={data.id}>
            <td className={classes.matname}>{data.caseName}</td>
            <td className={classes.editbtn}>
              <button
                onClick={() => {
                  edit(data);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  del(data.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return props.trigger ? (
    <div className={classes.caseinput}>
      <div>{casef}</div>
      <div
        className={classes.inner}
        style={(caseformtrigger && { zIndex: -1 }) || { zIndex: 0 }}
      >
        <h1>Load Case</h1>
        <button
          className={classes.addcase}
          onClick={() => {
            setEditCaseData({
              id: 1,
              caseName: "",
              patternData: [],
            });
            setCaseformtrigger(true);
          }}
        >
          Add New Case
        </button>

        <div className={classes.caselist}>
          <div>{casetable}</div>
        </div>
        <div className={classes.btn}>
          <button
            onClick={() => {
              props.setCaseTrigger(false);
            }}
          >
            OK
          </button>
          <button
            onClick={() => {
              props.setCaseTrigger(false);
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
