import React, { useState } from "react";

import { DndProvider } from "react-dnd";
import GridArea from "./components/GridArea";
import { HTML5Backend } from "react-dnd-html5-backend";
import LeftPanel from "./components/LeftPanel";
import { tables } from "./Utils/mockData";

const App = () => {
  const [gridTables, setGridTables] = useState([]);
  const [connections, setConnections] = useState([]);

  // Adjusted handleColumnDrop function to create connections at the column level
  const handleColumnDrop = (
    sourceTableId,
    sourceColumn,
    targetTableId,
    targetColumn
  ) => {
    const exists = connections.some(
      (conn) =>
        conn.sourceTable === sourceTableId &&
        conn.targetTable === targetTableId &&
        conn.sourceColumn === sourceColumn.name &&
        conn.targetColumn === targetColumn.name
    );

    if (!exists) {
      setConnections((prev) => [
        ...prev,
        {
          sourceTable: sourceTableId,
          sourceColumn: sourceColumn.name,
          targetTable: targetTableId,
          targetColumn: targetColumn.name,
        },
      ]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="app-container"
        style={{ display: "flex", height: "80vh", padding: "25px" }}
      >
        <LeftPanel tables={tables} />
        <GridArea
          gridTables={gridTables}
          setGridTables={setGridTables}
          connections={connections}
          setConnections={setConnections}
          handleColumnDrop={handleColumnDrop}
        />
      </div>
    </DndProvider>
  );
};

export default App;
