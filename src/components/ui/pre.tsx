import { type ReactNode } from 'react';

type PreProps = {
  children: ReactNode;
};

const Pre = ({ children }: PreProps) => {
  return (
    <pre className="flex-auto relative block overflow-auto bg-primary text-sm text-[#a9dc76] pt-4 pb-4 px-4 rounded-md font-mono mb-4">
      {children}
    </pre>
  );
};

export default Pre;
