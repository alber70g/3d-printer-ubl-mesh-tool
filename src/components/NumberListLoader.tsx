import { useEffect, useState } from "react";

const exampleOutput = `

0       1       2       3       4       5       6       7       8       9
9 | -0.20  -0.20  -0.15  -0.08  -0.05  -0.00  +0.05  +0.03  +0.02  +0.07
	|
8 | -0.22 [-0.21] -0.16  -0.10  -0.06  -0.03  +0.02  -0.00  -0.01  +0.01
	|
7 | -0.20  -0.19  -0.16  -0.11  -0.07  -0.05  -0.02  -0.04  -0.04  -0.06
	|
6 | -0.18  -0.18  -0.14  -0.10  -0.06  -0.05  -0.03  -0.05  -0.08  -0.10
	|
5 | -0.21  -0.20  -0.17  -0.14  -0.11  -0.10  -0.08  -0.12  -0.14  -0.17
	|
4 | -0.22  -0.21  -0.19  -0.16  -0.14  -0.13  -0.11  -0.16  -0.18  -0.21
	|
3 | -0.22  -0.22  -0.20  -0.17  -0.14  -0.14  -0.12  -0.18  -0.20  -0.23
	|
2 | -0.26  -0.26  -0.24  -0.21  -0.18  -0.19  -0.18  -0.23  -0.27  -0.29
	|
1 | -0.29  -0.28  -0.26  -0.23  -0.22  -0.22  -0.21  -0.26  -0.32  -0.34
	|
0 | -0.30  -0.31  -0.31  -0.29  -0.27  -0.27  -0.28  -0.33  -0.36  -0.41
			 0       1       2       3       4       5       6       7       8       9
 
`;

function NumberListLoader({
  setList = () => {},
}: {
  list: number[][];
  setList: (state: number[][]) => void;
}) {
  const [contents, setContents] = useState<string>("");

  const [textContents, setTextContents] = useState<string>("");

  const handleLoadList = (contents: string) => {
    setContents(contents);
    const rows = contents.trim().split("\n");
    const parsedList = rows.map((row) => {
      let val: any = row.trim();
      if (row.includes("|")) {
        val = row.split("|")[1];
      }

      val = val
        .split(" ")
        .map((v) => v.trim())
        .filter(Boolean)
        .map((v) => v.replaceAll(/[[\]]/g, ""))
        .map(Number);
      return val;
    });
    setList(parsedList);
  };

  useEffect(() => {
    if (contents.trim() === "") {
      const savedContents = localStorage.getItem("listContents");
      if (savedContents?.length > 0) {
        setTextContents(savedContents);
      } else {
        setTextContents(exampleOutput);
      }
    }
  }, []);

  useEffect(() => {
    if (contents.trim() === "") {
      return;
    }
    if (contents === exampleOutput) {
      return;
    }
    localStorage.setItem("listContents", contents);
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
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLoadList(textContents)}
        >
          Load
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => {
            setTextContents(exampleOutput);
            handleLoadList(exampleOutput);
          }}
        >
          Load example output
        </button>
      </div>
    </div>
  );
}

export default NumberListLoader;
