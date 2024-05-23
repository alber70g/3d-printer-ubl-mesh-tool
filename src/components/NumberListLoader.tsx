import React, { useEffect, useState } from 'react';

function NumberListLoader({
  setList = () => {},
}: {
  list: number[][];
  setList: (state: number[][]) => void;
}) {
  const [contents, setContents] = useState<string>('');

  const [textContents, setTextContents] = useState<string>('');

  const handleLoadList = (contents: string) => {
    setContents(contents);
    const rows = contents.trim().split('\n');
    const parsedList = rows.map((row) => {
      let val: any = row.trim();
      if (row.includes('|')) {
        val = row.split('|')[1];
      }

      val = val
        .split(' ')
        .map((v) => v.trim())
        .filter(Boolean)
        .map((v) => v.replaceAll(/[[\]]/g, ''))
        .map(Number);
      console.log(val);
      return val;
    });
    setList(parsedList);
  };

  useEffect(() => {
    if (contents.trim() === '') {
      const savedContents = localStorage.getItem('listContents');
      if (savedContents) {
        setTextContents(savedContents);
      }
    }
  }, []);

  useEffect(() => {
    if (contents.trim() === '') {
      return;
    }
    localStorage.setItem('listContents', contents);
  }, [contents]);

  return (
    <div className="mb-4">
      <textarea
        className="border border-gray-300 p-2"
        cols={80}
        rows={11}
        value={textContents}
        onChange={(e) => setTextContents(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
        onClick={() => handleLoadList(textContents)}
      >
        Load
      </button>
    </div>
  );
}

export default NumberListLoader;
