import Tippy from '@tippyjs/react';

type TooltipProps = {
  children: React.ReactNode;
  content?: any;
  className?: string;
  otherProps?: any;
};

function Tooltip({ children, content, className, otherProps }: TooltipProps) {
  return (
    <Tippy
      duration={[300, 0]}
      arrow
      className={`bg-background py-2 px-4 rounded-lg text-xl text-center border border-secondary ${className}`}
      content={content}
      {...otherProps}
    >
      {children}
    </Tippy>
  );
}

export default Tooltip;
