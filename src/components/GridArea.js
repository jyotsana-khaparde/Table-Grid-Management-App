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
      // Get the position of the drop relative to the grid area
      const clientOffset = monitor.getClientOffset(); // Position relative to the viewport
      const gridAreaRect = document
        .querySelector(".grid-area")
        .getBoundingClientRect(); // Position of the grid container

      const dropPosition = {
        x: clientOffset.x - gridAreaRect.x,
        y: clientOffset.y - gridAreaRect.y,
      };

      // Check if the table already exists in the grid
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
