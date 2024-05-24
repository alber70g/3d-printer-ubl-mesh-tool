import { PropsWithChildren } from "react";

interface ICodeProps extends PropsWithChildren {}

export const Code: React.FC<ICodeProps> = ({ children }) => {
  return (
    <code className="text-blue-500 bg-slate-100 py-1 px-2 rounded">
      {children}
    </code>
  );
};

export const CodeBlock: React.FC<ICodeProps> = ({ children }) => {
  return <pre className="bg-slate-100 p-4 rounded">{children}</pre>;
};
