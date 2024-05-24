import { useEffect, useState } from "react";
import "./App.css";
import NumberListLoader from "./features/NumberListLoader";
import Grid from "./features/Grid";
import { Section } from "./components/Section";
import { ButtonRow } from "./components/ButtonRow";
import { Button } from "./components/Button";
import { Code, CodeBlock } from "./components/Code";

function App() {
  const [grid1, setGrid1] = useState<number[][]>([]);
  const [grid2, setGrid2] = useState<number[][]>([]);
  const [gcodeType, setGcodeType] = useState<"diff" | "absolute">("diff");

  const [options, setOptions] = useState<{ fade: number }>({ fade: 0 });
  const setOption = (key: string, value: number) => {
    setOptions({ ...options, [key]: value });
  };

  useEffect(() => {
    // Retrieve grid1 from local storage
    const storedGrid1 = localStorage.getItem("grid1");
    if (storedGrid1) {
      setGrid1(JSON.parse(storedGrid1));
    }

    // Retrieve grid2 from local storage
    const storedGrid2 = localStorage.getItem("grid2");
    if (storedGrid2) {
      setGrid2(JSON.parse(storedGrid2));
    }
  }, []);

  useEffect(() => {
    // Store grid1 in local storage
    localStorage.setItem("grid1", JSON.stringify(grid1));
  }, [grid1]);

  useEffect(() => {
    // Store grid2 in local storage
    localStorage.setItem("grid2", JSON.stringify(grid2));
  }, [grid2]);

  return (
    <>
      <div className="container mx-auto">
        <Section title="3D Printer UBL Mesh Tool">
          <p>
            This app allows you to modify and visualize your 3D printer's
            Unified Bed Leveling (UBL) mesh.
          </p>

          <p>To use this tool, follow these steps:</p>
          <ol className="list-decimal pl-8">
            <li>
              Modify the mesh in in the first grid by clicking on the cells and
              clicking the buttons to get new values.
            </li>
            <li>View the updated mesh below this one.</li>
            <li>
              Adjust the fade value using the dropdown menu. The fade value
              controls the spread of the change that you make to the cell in the
              neighboring cells in the grid grid. A low value will have less
              impact where a higher value will have impact further away
            </li>
            <li>
              Copy the generated G-Code and paste it in Pronterface or in the
              startup code of the slicer.
            </li>
          </ol>
        </Section>

        <Section title="Import mesh">
          <p>
            Paste the output of your{" "}
            <a
              href="https://marlinfw.org/docs/gcode/M420.html"
              className="underline"
            >
              <Code>M420 V</Code>
            </a>{" "}
            command
          </p>
          <NumberListLoader
            list={grid1}
            setList={(...args) => {
              setGrid1(...args);
              setGrid2(...args);
            }}
          />
        </Section>

        <Section title="Your input mesh">
          <div className="flex flex-wrap gap-2">
            <Button variant="danger" onClick={() => setGrid1(grid1.slice(1))}>
              Remove first row
            </Button>
            <Button
              variant="danger"
              onClick={() => setGrid1(grid1.map((row) => row.slice(1)))}
            >
              Remove first column
            </Button>
            <Button
              variant="danger"
              onClick={() => setGrid1(grid1.slice(0, -1))}
            >
              Remove last row
            </Button>
            <Button
              variant="danger"
              onClick={() => setGrid1(grid1.map((row) => row.slice(0, -1)))}
            >
              Remove last column
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <select
              className="bg-white border border-gray-300 rounded px-4 py-2"
              value={options.fade}
              onChange={(e) => setOption("fade", parseInt(e.target.value))}
            >
              <option value={0}>Fade 0</option>
              <option value={1}>Fade 1</option>
              <option value={2}>Fade 2</option>
              <option value={3}>Fade 3</option>
              <option value={4}>Fade 4</option>
              <option value={5}>Fade 5</option>
              <option value={6}>Fade 6</option>
            </select>
            <span>Current fade value: {options.fade}</span>
          </div>

          <Grid
            list={grid1}
            options={options}
            list2={grid2}
            setList2={setGrid2}
          />
        </Section>

        <Section title="New Mesh">
          <ButtonRow>
            <Button onClick={() => setGrid2(grid1)}>Reset Grid</Button>
          </ButtonRow>
          <Grid list={grid2} />
        </Section>

        <Section title="G-Code">
          <p>
            The following G-Code represents the difference between the original
            mesh and the modified mesh.
            <br />
            Take a look at{" "}
            <a
              href="https://marlinfw.org/docs/gcode/M421.html"
              className="underline"
            >
              M421
            </a>{" "}
            for more information.
          </p>
          <ButtonRow>
            <Button
              onClick={() =>
                setGcodeType(gcodeType === "absolute" ? "diff" : "absolute")
              }
            >
              {gcodeType === "absolute"
                ? "Use Differences (I J Q)"
                : "Use Absolute Values (UBL) (I J Z)"}
            </Button>
            <Button
              variant="success"
              onClick={() =>
                saveTextAsFile(
                  generateGCode(gcodeType, grid1, grid2),
                  "update-grid.gcode"
                )
              }
            >
              Save as File
            </Button>
            <Button
              variant="success"
              onClick={() => {
                const gCode = checkGrids(grid1, grid2)
                  ? generateGCode(gcodeType, grid1, grid2)
                  : "";
                navigator.clipboard.writeText(gCode);
              }}
            >
              Copy Code
            </Button>
          </ButtonRow>
          <CodeBlock>
            {checkGrids(grid1, grid2) && generateGCode(gcodeType, grid1, grid2)}
          </CodeBlock>
        </Section>
      </div>
    </>
  );
}

function saveTextAsFile(text: string, fileName: string) {
  const element = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function checkGrids(array1: number[][], array2: number[][]) {
  if (!(array1?.[0]?.[0] && array2?.[0]?.[0])) {
    return false;
  }
  if (array1.length !== array2.length) return false;
  if (array1[0].length !== array2[0].length) return false;
  return true;
}

function generateGCode(
  type: "diff" | "absolute" = "diff",
  array1: number[][],
  array2: number[][]
) {
  switch (type) {
    case "diff":
      return generateDiffGCode(array1, array2);
    case "absolute":
      return generateAbsoluteGCode(array1, array2);
    default:
      return "";
  }
}

function generateDiffGCode(array1: number[][], array2: number[][]) {
  if (array1.length === 0 || array2.length === 0) return "";
  let gCode = "";
  const rowMap = Array.from({ length: array2.length }).map(
    (_, i) => array2.length - i - 1
  );

  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      const difference =
        Math.round((array2[i][j] - array1[i][j]) * 100000) / 100000;
      if (difference === 0) continue;
      const gCodeCommand = `M421 I${j} J${rowMap[i]} Q${difference}\n`;
      gCode += gCodeCommand;
    }
  }
  return gCode;
}

function generateAbsoluteGCode(array1: number[][], array2: number[][]) {
  if (array2.length === 0) return "";
  let gCode = "";
  const rowMap = Array.from({ length: array2.length }).map(
    (_, i) => array2.length - i - 1
  );

  for (let i = 0; i < array2.length; i++) {
    for (let j = 0; j < array2[i].length; j++) {
      if (array1[i][j] === array2[i][j]) continue;

      const gCodeCommand = `M421 I${j} J${rowMap[i]} Z${array2[i][j]}\n`;
      gCode += gCodeCommand;
    }
  }
  return gCode;
}

export default App;
