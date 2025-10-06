import { ReactNode } from 'react';

type MainSectionProps = {
  children: ReactNode;
};

export default function MainSection({ children }: MainSectionProps) {
  return (
    <section
      className="
        min-h-screen
        flex flex-col
        bg-gradient-to-b from-violet-50 to-white
      "
    >
      {children}
    </section>
  );
}
