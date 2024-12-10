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

    // Add scroll event listener
    gridArea.addEventListener("scroll", handleScroll);

    return () => {
      // Remove scroll event listener
      gridArea.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getTablePosition = (tableId) => {
    const table = gridTables.find((t) => t.id === tableId);
    if (!table) return { x: 0, y: 0 };
    return {
      x: table.position.x + 100, // Adjust based on table dimensions
      y: table.position.y + 75, // Adjust based on table dimensions
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
      }}
    >
      {connections.map((connection, index) => {
        const source = getTablePosition(connection.sourceTable);
        const target = getTablePosition(connection.targetTable);

        if (!source || !target) return null;

        return (
          <line
            key={index}
            x1={source.x - scrollOffset.x}
            y1={source.y - scrollOffset.y}
            x2={target.x - scrollOffset.x}
            y2={target.y - scrollOffset.y}
            stroke="orange"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
};

export default ConnectionLines;
