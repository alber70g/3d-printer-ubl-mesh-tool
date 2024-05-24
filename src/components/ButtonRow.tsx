import { PropsWithChildren } from "react";

interface IButtonRowProps extends PropsWithChildren {
  style?: React.CSSProperties;
}
export const ButtonRow: React.FC<IButtonRowProps> = ({ style, children }) => {
  return (
    <div style={style} className="flex flex-wrap gap-2">
      {children}
    </div>
  );
};
