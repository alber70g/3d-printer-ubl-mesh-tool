import { useEffect, useState } from "react";
import "./App.css";
import NumberListLoader from "./components/NumberListLoader";
import Grid from "./components/Grid";

function App() {
  const [grid1, setGrid1] = useState<number[][]>([]);
  const [grid2, setGrid2] = useState<number[][]>([]);

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
        <h1 className="text-2xl font-bold mb-4 mt-8">
          3D Printer UBL Mesh Tool
        </h1>
        <p>
          This app allows you to modify and visualize your 3D printer's Unified
          Bed Leveling (UBL) mesh.
        </p>
        <p>
          Paste the output of your{" "}
          <a
            href="https://marlinfw.org/docs/gcode/M420.html"
            className="underline"
          >
            <code className="text-blue-500">M420 V</code>
          </a>{" "}
          command
        </p>
        <NumberListLoader list={grid1} setList={setGrid1} />

        <p>To use this tool, follow these steps:</p>
        <ol className="list-decimal pl-4">
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

        <h1 className="text-2xl font-bold mb-4 mt-8">Your input mesh</h1>

        <div className="mb-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setGrid1(grid1.slice(1))}
          >
            Remove first row
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => setGrid1(grid1.map((row) => row.slice(1)))}
          >
            Remove first column
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => setGrid1(grid1.slice(0, -1))}
          >
            Remove last row
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => setGrid1(grid1.map((row) => row.slice(0, -1)))}
          >
            Remove last column
          </button>
        </div>

        <div className="mb-4">
          <select
            className="bg-white border border-gray-300 rounded px-4 py-2 ml-2"
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
          <span className="ml-2">Current fade value: {options.fade}</span>
        </div>

        <Grid
          list={grid1}
          options={options}
          list2={grid2}
          setList2={setGrid2}
        />
        <h1 className="text-2xl font-bold mb-4 mt-8">New mesh</h1>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setGrid2(grid1)}
          >
            Reset Grid
          </button>
        </div>
        <Grid list={grid2} />
        <section className="h-lvh">
          <h1 className="text-2xl font-bold mb-4 mt-8">G-Code</h1>
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
          <pre className="bg-gray-100 p-4">
            {grid1?.[0]?.[0] && grid2?.[0]?.[0] && generateGCode(grid1, grid2)}
          </pre>
        </section>
      </div>
    </>
  );
}

function generateGCode(array1: number[][], array2: number[][]) {
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

export default App;
