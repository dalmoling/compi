import PlotTable from "../bottomUpAnalisys/PlotTable";

const ParsingTable = ({ parsingTable, stepMarker }) => {
  return (
    <div className="container">
      <div id="actionTable">
        <h4>Tabela de ações</h4>
        <PlotTable
          tableJson={parsingTable["action_table"]}
          stepMarker={stepMarker}
          className="m-3"
          id="actionTable"
        />
      </div>
      <div id="gotoTable">
        <h4 style={{ fontSize: "23px !important" }}>Tabela de transições</h4>
        <PlotTable
          tableJson={parsingTable["goto_table"]}
          stepMarker={stepMarker}
          className="m-3"
        />
      </div>
    </div>
  );
};

export default ParsingTable;
