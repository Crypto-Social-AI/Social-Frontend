type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return <div className={`max-w-[130rem] mx-auto my-10 ${className}`}>{children}</div>;
}
