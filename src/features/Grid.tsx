import React from "react";
import { ButtonRow } from "../components/ButtonRow";
import { Button } from "../components/Button";

type GridProps = {
  list: number[][];
  options?: { fade: number };
  list2?: number[][];
  setList2?: (state: number[][]) => void;
};

const Grid: React.FC<GridProps> = ({ list, list2, setList2, options }) => {
  const disableButtons = !setList2;
  const [currentRow, setCurrentRow] = React.useState<number | null>(null);
  const [currentCell, setCurrentCell] = React.useState<number | null>(null);
  const [showButtons, setShowButtons] = React.useState<boolean>(
    !disableButtons
  );
  const { fade } = options || { fade: 0 };
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

  const updateMeshPoint = (
    rowIndex: number,
    cellIndex: number,
    value: number
  ) => {
    if (!list2[0]) {
      list2 = list;
      setList2(list2);
    }
    const updatedList = list2.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === cellIndex) {
          // the cell we are updating
          return parseFloat((cell + value).toFixed(6));
        }
        if (
          Math.abs(rIndex - rowIndex) <= fade &&
          Math.abs(cIndex - cellIndex) <= fade
        ) {
          // this is the fade effect
          const distance = Math.sqrt(
            Math.pow(rowIndex - rIndex, 2) + Math.pow(cellIndex - cIndex, 2)
          );
          const fadeValue = value * (1 - distance / (fade + 1));
          return parseFloat((cell + fadeValue).toFixed(6));
        } else {
          return cell;
        }
      })
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
    list[0] && (
      <table className="w-0">
        <tbody>
          {list.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="bg-gray-200 p-2"
                  style={{
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
                      <ButtonRow
                        style={{
                          position: "absolute",
													flexDirection: "column"
                        }}
                      >
                        <Button
                          onClick={() =>
                            updateMeshPoint(rowIndex, cellIndex, 0.1)
                          }
                        >
                          +0.10
                        </Button>
                        <Button
                          onClick={() =>
                            updateMeshPoint(rowIndex, cellIndex, 0.05)
                          }
                        >
                          +0.05
                        </Button>
                        <Button
                          onClick={() =>
                            updateMeshPoint(rowIndex, cellIndex, 0.01)
                          }
                        >
                          +0.01
                        </Button>
                        <Button
                          onClick={() =>
                            handleResetButtonClick(rowIndex, cellIndex)
                          }
                        >
                          Reset
                        </Button>
                        <Button
                          onClick={() =>
                            updateMeshPoint(rowIndex, cellIndex, -0.01)
                          }
                        >
                          -0.01
                        </Button>
                        <Button
                          onClick={() =>
                            updateMeshPoint(rowIndex, cellIndex, -0.05)
                          }
                        >
                          -0.05
                        </Button>
                        <Button
                          onClick={() =>
                            updateMeshPoint(rowIndex, cellIndex, -0.1)
                          }
                        >
                          -0.10
                        </Button>
                      </ButtonRow>
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
