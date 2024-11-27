import ConnectionLines from "./ConnectionLines";
import React from "react";
import Table from "./TableComponent";
import { useDrop } from "react-dnd";

const GridArea = ({
  gridTables,
  setGridTables,
  connections,
  handleColumnDrop,
  setConnections,
}) => {
  const [, drop] = useDrop({
    accept: "TABLE",
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const gridAreaRect = document
        .querySelector(".grid-area")
        .getBoundingClientRect();

      const dropPosition = {
        x: clientOffset.x - gridAreaRect.x,
        y: clientOffset.y - gridAreaRect.y,
      };

      const tableExists = gridTables.some(
        (table) => table.id === item.table.id
      );

      if (tableExists) {
        alert("Table already exists in the grid!");
      } else {
        setGridTables((prev) => [
          ...prev,
          { ...item.table, position: dropPosition },
        ]);
      }
    },
  });

  return (
    <div
      ref={drop}
      className="grid-area"
      style={{
        flex: 1,
        position: "relative",
        overflow: "auto",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#f8f5f5",
      }}
    >
      <ConnectionLines connections={connections} gridTables={gridTables} />

      {gridTables.map((table) => (
        <Table
          key={table.id}
          table={table}
          gridTables={gridTables}
          setGridTables={setGridTables}
          connections={connections}
          handleColumnDrop={handleColumnDrop}
          setConnections={setConnections}
        />
      ))}
    </div>
  );
};

export default GridArea;
