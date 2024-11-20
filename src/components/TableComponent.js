import { useDrag, useDrop } from "react-dnd";

import React from "react";
import { Rnd } from "react-rnd";

// Component to render and drag a single column
const Column = ({ column, tableId, moveColumn }) => {
  const [, drag] = useDrag({
    type: "COLUMN",
    item: { column, tableId }, // Pass column data and the originating table's ID
  });

  return (
    <div
      ref={drag}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px",
        margin: "5px 0",
        border: "1px solid lightgray",
        background: "#f9f9f9",
        cursor: "move",
      }}
    >
      <div>{column.name}</div>
      <div>{column.column_data_type}</div>
    </div>
  );
};

// Component to render a table and handle column drops
const Table = ({
  table,
  gridTables,
  setGridTables,
  connections,
  handleColumnDrop,
  setConnections,
}) => {
  const handleDragStop = (e, d) => {
    const updatedTables = gridTables.map((t) =>
      t.id === table.id ? { ...t, position: { x: d.x, y: d.y } } : t
    );
    setGridTables(updatedTables);
  };

  const handleResizeStop = (e, direction, ref, delta, position) => {
    const updatedTables = gridTables.map((t) => {
      if (t.id === table.id) {
        return {
          ...t,
          size: { width: ref.style.width, height: ref.style.height },
          position,
        };
      }
      return t;
    });
    setGridTables(updatedTables);
  };

  const handleRemoveTable = () => {
    // Remove table from gridTables
    setGridTables((prevTables) => prevTables.filter((t) => t.id !== table.id));

    // Remove all connections linked to the table
    setConnections((prevConnections) =>
      prevConnections.filter(
        (connection) =>
          connection.sourceTable !== table.id &&
          connection.targetTable !== table.id
      )
    );
  };

  // Define the drop behavior for columns
  const [, drop] = useDrop({
    accept: "COLUMN",
    drop: (item) => {
      if (item.tableId !== table.id) {
        moveColumn(item.column, item.tableId, table.id);
        handleColumnDrop(item.tableId, table.id, item.column);
      }
    },
  });

  const moveColumn = (column, fromTableId, toTableId) => {
    setGridTables((prevTables) => {
      return prevTables.map((t) => {
        if (t.id === fromTableId) {
          // Remove the column from the source table
          return {
            ...t,
            columns: t.columns.filter(
              (col) => col.column_id !== column.column_id
            ),
          };
        }
        if (t.id === toTableId) {
          // Add the column to the target table
          return {
            ...t,
            columns: [...t.columns, column],
          };
        }
        return t;
      });
    });
  };

  return (
    <Rnd
      size={table.size || { width: 200 }}
      position={table.position}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      bounds="parent"
      style={{
        border: "1px solid #000",
        backgroundColor: "#fff",
        padding: "8px",
        borderRadius: "5px",
      }}
    >
      <div ref={drop}>
        <div
          style={{ padding: "10px", fontWeight: "bold", textAlign: "center" }}
        >
          <span>{table.name}</span>
          <button onClick={handleRemoveTable} style={{ marginLeft: "10px" }}>
            Remove
          </button>
        </div>
        {table.columns.map((column) => (
          <Column
            key={column.column_id}
            column={column}
            tableId={table.id}
            moveColumn={moveColumn}
          />
        ))}
      </div>
    </Rnd>
  );
};

export default Table;
