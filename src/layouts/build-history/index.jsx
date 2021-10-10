import React, { useState } from "react";
import Welcome from "../welcome";
import Button from "../../components/button";
import Header from "../../components/header";
import Pipeline from "../../components/pipeline";
import { getStateFromLocalStorage } from "../../reducers/settings";
import {
  generatePipelines,
  generatePipeline,
} from "../../utils/piplineGenerator";
import "./style.css";

const BuildHistory = () => {
  const data = getStateFromLocalStorage();
  const dataFilled = data.repo && data.command;
  const [fecthing, setFetching] = useState(false);
  const [pipelines, setPipelines] = useState([]);

  if (dataFilled && !pipelines.length) {
    setPipelines(generatePipelines(5));
  }

  return (
    <div className="build">
      <Header
        title={dataFilled ? data.repo : "School CI Server"}
        settingsButton={{
          show: true,
          withCaption: !dataFilled,
        }}
        runButton={{ show: dataFilled, withCaption: dataFilled }}
        appearance={dataFilled ? "primary" : "secondary"}
        addBuild={(hash) => {
          setPipelines([
            generatePipeline({ id: pipelines[0].id + 1, hash }),
            ...pipelines,
          ]);
        }}
      />

      {dataFilled ? (
        <div>
          {pipelines.map((pipeline) => (
            <Pipeline key={pipeline.id} {...pipeline} />
          ))}

          <Button
            appearance="secondary"
            fetching={fecthing}
            className="build__more-button"
            onClick={() => {
              setFetching(true);
              setTimeout(() => {
                setPipelines([
                  ...pipelines,
                  ...generatePipelines(
                    5,
                    pipelines[pipelines.length - 1].id - 1
                  ),
                ]);
                setFetching(false);
              }, 1000);
            }}
          >
            Show more
          </Button>
        </div>
      ) : (
        <Welcome />
      )}
    </div>
  );
};

export default BuildHistory;
