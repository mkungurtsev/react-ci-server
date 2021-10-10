import React from "react";
import { connect } from "react-redux";
import Welcome from "../welcome";
import Button from "../../components/button";
import Header from "../../components/header";
import Pipeline from "../../components/pipeline";
import { addPipeline, fetchMore } from "../../reducers/pipelines";
import "./style.css";

const BuildHistory = ({ settings, pipelines, addPipeline, fetchMore }) => {
  const dataFilled = settings.repo && settings.command;

  return (
    <div className="build">
      <Header
        title={dataFilled ? settings.repo : "School CI Server"}
        settingsButton={{
          show: true,
          withCaption: !dataFilled,
        }}
        runButton={{ show: dataFilled, withCaption: dataFilled }}
        appearance={dataFilled ? "primary" : "secondary"}
        addBuild={(hash) => {
          return addPipeline({ id: pipelines.items[0].id + 1, hash });
        }}
      />

      {dataFilled ? (
        <div>
          {pipelines.items.map((pipeline) => (
            <Pipeline key={pipeline.id} {...pipeline} />
          ))}

          <Button
            appearance="secondary"
            fetching={pipelines.fetchingMore}
            className="build__more-button"
            onClick={() => {
              fetchMore(5, pipelines.items[pipelines.items.length - 1].id - 1);
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

const mapStateToProps = ({ settings, pipelines }) => ({ settings, pipelines });

const mapDispatchToProps = {
  addPipeline,
  fetchMore,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildHistory);
