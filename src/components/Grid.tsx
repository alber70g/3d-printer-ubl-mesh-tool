import React from 'react';

type GridProps = {
  list: number[][];
  list2: number[][];
  setList2?: (state: number[][]) => void;
};

type GridPropsWithList2 = {
  list2: number[][];
  setList2: (state: number[][]) => void;
} & GridProps;

const Grid: React.FC<GridProps | GridPropsWithList2> = ({
  list,
  list2,
  setList2,
}) => {
  const disableButtons = !setList2;
  const [currentRow, setCurrentRow] = React.useState<number | null>(null);
  const [currentCell, setCurrentCell] = React.useState<number | null>(null);
  const [showButtons, setShowButtons] = React.useState<boolean>(
    !disableButtons
  );
  const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
    setCurrentRow(rowIndex);
    setCurrentCell(cellIndex);
    setShowButtons(!disableButtons);
  };

  const handleMouseLeave = () => {
    setCurrentRow(null);
    setCurrentCell(null);
    setShowButtons(false);
  };

  const handleResetButtonClick = (rowIndex: number, cellIndex: number) => {
    const originalValue = list[rowIndex][cellIndex];
    const updatedList = list2.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) =>
            cIndex === cellIndex ? originalValue : cell
          )
        : row
    );
    setList2(updatedList);
  };

  const handleButtonClick = (
    rowIndex: number,
    cellIndex: number,
    value: number
  ) => {
    console.log('update');
    if (!list2[0]) {
      list2 = list;
      setList2(list2);
    }
    const updatedList = list2.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) =>
            cIndex === cellIndex ? parseFloat((cell + value).toFixed(2)) : cell
          )
        : row
    );
    setList2(updatedList);
  };

  const min = Math.min(...list.flat());
  const max = Math.max(...list.flat());

  const calculateHeatmapColor = (value: number) => {
    const percentage = (value - min) / (max - min);
    const hue = 120 - percentage * 120; // Adjust the hue range based on your preference
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    list &&
    list[0] &&
    list[0][0] && (
      <table>
        <tbody>
          {list.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="bg-gray-200 p-2"
                  style={{
                    marginRight: '10px',
                    backgroundColor: calculateHeatmapColor(cell),
                  }}
                  onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  {cell}
                  {!disableButtons &&
                    showButtons &&
                    currentRow === rowIndex &&
                    currentCell === cellIndex && (
                      <div className="button-container absolute flex flex-col">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                          onClick={() =>
                            handleButtonClick(rowIndex, cellIndex, 0.1)
                          }
                        >
                          +0.10
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                          onClick={() =>
                            handleButtonClick(rowIndex, cellIndex, 0.05)
                          }
                        >
                          +0.05
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                          onClick={() =>
                            handleButtonClick(rowIndex, cellIndex, 0.01)
                          }
                        >
                          +0.01
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                          onClick={() =>
                            handleResetButtonClick(rowIndex, cellIndex)
                          }
                        >
                          Reset
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                          onClick={() =>
                            handleButtonClick(rowIndex, cellIndex, -0.01)
                          }
                        >
                          -0.01
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                          onClick={() =>
                            handleButtonClick(rowIndex, cellIndex, -0.05)
                          }
                        >
                          -0.05
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                          onClick={() =>
                            handleButtonClick(rowIndex, cellIndex, -0.1)
                          }
                        >
                          -0.10
                        </button>
                      </div>
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};
export default Grid;
