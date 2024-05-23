import { useEffect, useState } from 'react';
import './App.css';
import NumberListLoader from './components/NumberListLoader';
import Grid from './components/Grid';

function App() {
  const [grid1, setGrid1] = useState<number[][]>([]);
  const [grid2, setGrid2] = useState<number[][]>([]);

  useEffect(() => {
    // Retrieve grid1 from local storage
    const storedGrid1 = localStorage.getItem('grid1');
    if (storedGrid1) {
      setGrid1(JSON.parse(storedGrid1));
    }

    // Retrieve grid2 from local storage
    const storedGrid2 = localStorage.getItem('grid2');
    if (storedGrid2) {
      setGrid2(JSON.parse(storedGrid2));
    }
  }, []);

  useEffect(() => {
    // Store grid1 in local storage
    localStorage.setItem('grid1', JSON.stringify(grid1));
  }, [grid1]);

  useEffect(() => {
    // Store grid2 in local storage
    localStorage.setItem('grid2', JSON.stringify(grid2));
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
          Paste the output of your{' '}
          <a
            href="https://marlinfw.org/docs/gcode/M420.html"
            className="underline"
          >
            <code className="text-blue-500">M420 V</code>
          </a>{' '}
          command
        </p>
        <NumberListLoader list={grid1} setList={setGrid1} />

        <p>To use this tool, follow these steps:</p>
        <ol className="list-decimal pl-4">
          <li>
            Modify the mesh in the left grid by clicking on the cells and
            entering new values.
          </li>
          <li>View the updated mesh in the right grid.</li>
          <li>Make any further modifications as needed.</li>
        </ol>

        <div className="flex mx-auto">
          <div className="w-1/2">
            <h1 className="text-2xl font-bold mb-4 mt-8">Your input mesh</h1>

            <Grid list={grid1} list2={grid2} setList2={setGrid2} />
          </div>
          <div className="w-1/2">
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
          </div>
        </div>
        <section className="h-lvh">
          <h1 className="text-2xl font-bold mb-4 mt-8">G-Code</h1>
          <p>
            The following G-Code represents the difference between the original
            mesh and the modified mesh:
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
  let gCode = '';
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      const difference =
        Math.round((array2[i][j] - array1[i][j]) * 1_000) / 1_000;
      if (difference === 0) continue;
      const gCodeCommand = `M421 I${i} J${j} Q${difference}\n`;
      gCode += gCodeCommand;
    }
  }
  return gCode;
}

export default App;
