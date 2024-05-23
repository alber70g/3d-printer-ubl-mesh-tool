import React from 'react';

function NumberListLoader({
  list = [],
  setList = () => {},
}: {
  list: number[][];
  setList: (state: number[][]) => void;
}) {
  const handleLoadList = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value.trim();
    const rows = contents.split('\n');
    const parsedList = rows.map((row) =>
      row
        .trim()
        .split(' ')
        .map((v) => v.trim())
        .filter(Boolean)
        .map((v) => v.replaceAll(/[[\]]/g, ''))
        .map(Number)
    );
    setList(parsedList);
    setList(parsedList);
  };

  return (
    <div>
      <textarea
        className="border border-gray-300 p-2 mb-4"
        cols={100}
        rows={15}
        onChange={handleLoadList}
      />
    </div>
  );
}

export default NumberListLoader;
