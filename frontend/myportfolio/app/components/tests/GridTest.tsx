import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";


interface GridProps {
  col: number;
  row: number;
}

interface GridItemProps {
  grid: GridProps;
  targetCol: number;
  targetRow: number;
  onAnimationComplete: () => void;
  children: React.ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ grid, targetCol, targetRow, onAnimationComplete, children }) => {
  const controls: AnimationControls = useAnimation();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentGrid, setCurrentGrid] = useState<GridProps>(grid);

  useEffect(() => {
    if (isAnimating) {
      controls.start({
        x: (targetCol - grid.col) * 100, // Assuming each grid cell is 100px wide
        y: (targetRow - grid.row) * 100, // Assuming each grid cell is 100px tall
        transition: { duration: 0.5 },
      }).then(() => {
        setCurrentGrid({ col: targetCol, row: targetRow });
        onAnimationComplete();
        setIsAnimating(false);
      });
    }
  }, [isAnimating, controls, grid, targetCol, targetRow, onAnimationComplete]);

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  return (
    <motion.li
      className="grid-item"
      style={{
        gridColumn: `span ${currentGrid.col}`,
        gridRow: `span ${currentGrid.row}`,
      }}
      animate={controls}
      initial={false}
    >
      <button onClick={handleAnimationStart}>{children}</button>
    </motion.li>
  );
};

export default GridItem;