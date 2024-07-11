import React, { useState } from "react";
import GridItem from "./GridTest";


const App: React.FC = () => {
  const initialGrid = [
    { col: 1, row: 1 },
    { col: 2, row: 1 },
    { col: 1, row: 2 },
    { col: 2, row: 2 },
  ];

  const [gridPositions, setGridPositions] = useState<Array<{ col: number; row: number }>>(initialGrid);
  const targetPosition = { col: 3, row: 3 };

  const handleAnimationComplete = (index: number) => {
    setGridPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = targetPosition;
      return newPositions;
    });
  };

  return (
    <div className="grid-container">
      {gridPositions.map((grid, i) => (
        <GridItem
          key={i}
          grid={grid}
          targetCol={targetPosition.col}
          targetRow={targetPosition.row}
          onAnimationComplete={() => handleAnimationComplete(i)}
        >
          Grid Item {i}
        </GridItem>
      ))}
    </div>
  );
};

export default App;