import React, { ReactNode } from "react";

interface RoutesLayoutProps {
  children: ReactNode;
}

const RoutesLayout: React.FC<RoutesLayoutProps> = ({ children }) => {
  return (
    <div className="bg-white h-screen max-480:h-screen max-480:bg-[#171A1D] max-480:flex max-480:items-center">
      <main className="max-w-[480px] max-h-[960px] h-full w-full mx-auto flex flex-col items-center bg-white max-480:rounded-3xl max-480:min-h-[800px]">
        {children}
      </main>
    </div>
  );
};

export default RoutesLayout;
