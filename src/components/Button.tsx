import React, { PropsWithChildren } from "react";

interface IButtonProps extends PropsWithChildren {
  onClick: () => void;
  variant?: "primary" | "danger" | "success";
}

function getClassnames(variant: IButtonProps["variant"] = "primary") {
  switch (variant) {
    case "primary":
      return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    case "danger":
      return "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded";
    case "success":
      return "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded";
  }
}

export const Button: React.FC<IButtonProps> = ({
  onClick,
  children,
  variant,
}) => {
  return (
    <button onClick={onClick} className={getClassnames(variant)}>
      {children}
    </button>
  );
};
