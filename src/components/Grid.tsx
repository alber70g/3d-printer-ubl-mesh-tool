import React from 'react';

type GridProps = {
  list: number[][];
  setList: (state: number[][]) => void;
};

const Grid: React.FC<GridProps> = ({ list, setList }) => {
  const [currentRow, setCurrentRow] = React.useState<number | null>(null);
  const [currentCell, setCurrentCell] = React.useState<number | null>(null);
  const [showButtons, setShowButtons] = React.useState<boolean>(false);
  const handleMouseEnter = (rowIndex: number, cellIndex: number) => {
    setCurrentRow(rowIndex);
    setCurrentCell(cellIndex);
    setShowButtons(true);
  };

  const handleMouseLeave = (rowIndex: number, cellIndex: number) => {
    setCurrentRow(null);
    setCurrentCell(null);
    setShowButtons(false);
  };

  const handleButtonClick = (
    rowIndex: number,
    cellIndex: number,
    value: number
  ) => {
    const updatedList = list.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) =>
            cIndex === cellIndex ? parseFloat((cell + value).toFixed(2)) : cell
          )
        : row
    );
    setList(updatedList);
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
                  style={{ marginRight: '10px' }}
                  onMouseEnter={() => handleMouseEnter(rowIndex, cellIndex)}
                  onMouseLeave={() => handleMouseLeave(rowIndex, cellIndex)}
                >
                  {cell}
                  {showButtons &&
                    currentRow === rowIndex &&
                    currentCell === cellIndex && (
                      <div className="button-container absolute">
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
