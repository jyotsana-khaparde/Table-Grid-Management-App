import React from "react";
import { useDrag } from "react-dnd";

const LeftPanel = ({ tables }) => {
  return (
    <div
      className="left-panel"
      style={{
        width: "20%",
        height: "80vh",
        overflow: "scroll",
        borderRight: "1px solid #ccc",
      }}
    >
      {tables.map((table) => (
        <DraggableTable key={table.id} table={table} />
      ))}
    </div>
  );
};

const DraggableTable = ({ table }) => {
  const [, drag] = useDrag({
    type: "TABLE",
    item: { table },
  });

  return (
    <div
      ref={drag}
      style={{ padding: "8px", border: "1px solid #ccc", marginBottom: "8px" }}
    >
      {table.name}
      <div style={{ paddingLeft: "10px", borderLeft: "1px solid lightgray" }}>
        {table.columns.map((column) => (
          <div key={column.column_id}>{column.name}</div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
