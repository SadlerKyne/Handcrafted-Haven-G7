import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export default function PageContainer({
  children,
  className = "",
  narrow = false,
}: PageContainerProps) {
  return (
    <div
      className={`page-container ${narrow ? "!max-w-md" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
