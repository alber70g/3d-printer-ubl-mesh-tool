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
      <NumberListLoader list={grid1} setList={setGrid1} />
      <Grid list={grid1} setList={setGrid1} />
      <NumberListLoader list={grid2} setList={setGrid2} />
    </>
  );
}

export default App;
