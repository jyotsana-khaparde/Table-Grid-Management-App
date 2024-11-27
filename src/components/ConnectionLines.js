import React, { useEffect, useState } from "react";

const ConnectionLines = ({ connections, gridTables }) => {
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const gridArea = document.querySelector(".grid-area");
    const handleScroll = () => {
      setScrollOffset({
        x: gridArea.scrollLeft,
        y: gridArea.scrollTop,
      });
    };

    gridArea.addEventListener("scroll", handleScroll);
    return () => gridArea.removeEventListener("scroll", handleScroll);
  }, []);

  const getColumnPosition = (tableId, columnName) => {
    const table = gridTables.find((t) => t.id === tableId);

    if (!table) {
      console.warn("Table not found during drag:", tableId);
      return null;
    }

    const columnIndex = table.columns.findIndex(
      (col) => col.name === columnName
    );
    if (columnIndex === -1) {
      console.warn(`Column not found during drag: ${columnName}`);
      return null;
    }

    const tablePosition = table.position || { x: 0, y: 0 };
    const columnHeight = 40; // Approximate row height
    const columnOffsetY = columnIndex * columnHeight + 50;

    return {
      x: tablePosition.x + 150,
      y: tablePosition.y + columnOffsetY,
    };
  };

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {connections.map((connection, index) => {
        const sourcePos = getColumnPosition(
          connection.sourceTable,
          connection.sourceColumn
        );
        const targetPos = getColumnPosition(
          connection.targetTable,
          connection.targetColumn
        );

        if (!sourcePos && !targetPos) return null;

        const x1 = sourcePos ? sourcePos.x - scrollOffset.x : targetPos.x - 100;
        const y1 = sourcePos ? sourcePos.y - scrollOffset.y : targetPos.y;
        const x2 = targetPos ? targetPos.x - scrollOffset.x : sourcePos.x + 100;
        const y2 = targetPos ? targetPos.y - scrollOffset.y : sourcePos.y;

        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="blue"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

export default ConnectionLines;
