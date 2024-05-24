import { PropsWithChildren } from "react";

export interface ISectionProps extends PropsWithChildren {
  title?: string;
}
export const Section: React.FC<ISectionProps> = ({ title, children }) => {
  return (
    <section className="flex flex-col gap-2">
      {title && <h2 className="text-2xl font-bold mt-8">{title}</h2>}
      {children}
    </section>
  );
};
