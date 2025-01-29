import { useState, useEffect } from "preact/hooks";

const size = 51;
const directions = [
  { x: 1, y: 0 }, // Right
  { x: 0, y: 1 }, // Down
  { x: -1, y: 0 }, // Left
  { x: 0, y: -1 }, // Up
];

export function App() {
  const [grid, setGrid] = useState(Array(size * size).fill(false));
  const [count, setCount] = useState(0);
  const [antPosition, setAntPosition] = useState(Math.floor((size * size) / 2));
  const [antDirection, setAntDirection] = useState(2); // 0: right, 1: down, 2: left, 3: up

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        const isBlack = newGrid[antPosition];

        // Toggle cell color
        newGrid[antPosition] = !isBlack;

        // Turn direction
        const newDirection = (antDirection + (isBlack ? -1 : 1) + 4) % 4;
        setAntDirection(newDirection);

        // Move forward
        const x = antPosition % size;
        const y = Math.floor(antPosition / size);
        const newX = (x + directions[newDirection].x + size) % size;
        const newY = (y + directions[newDirection].y + size) % size;
        setAntPosition(newY * size + newX);
        setCount((prevCount) => prevCount + 1);

        return newGrid;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [antPosition, antDirection]);

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <div className="aspect-square flex flex-wrap max-w-3xl w-full mx-auto border border-gray-300">
        {Array.from({ length: size * size }).map((_, i) => (
          <div
            key={i}
            className="aspect-square border border-gray-300 relative"
            style={{
              height: `${100 / size}%`,
              width: `${100 / size}%`,
              backgroundColor: grid[i] ? "black" : "white",
            }}
          >
            {i === antPosition && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-full bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p>Step: {count}</p>
      </div>
    </div>
  );
}
