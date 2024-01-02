import { useEffect, useState } from 'react';
import { AiFillCopy } from 'react-icons/ai';
import copy from 'clipboard-copy';
import Tooltip from 'components/Tooltip/Tooltip';

type CopyClipboardProps = {
  copyText: string;
  size?: number;
  bg?: 'base' | 'light';
};

function CopyClipboard({ copyText, size = 13, bg = 'base' }: CopyClipboardProps) {
  const [copyStatus, setCopyStatus] = useState('');

  const bgColorVariants = {
    base: 'bg-background',
    light: 'bg-secondary',
  };

  const handleCopy = (e: React.MouseEvent<SVGElement>, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    copy(text)
      .then(() => {
        setCopyStatus('Copied!');
      })
      .catch((error) => {
        console.error('Error copying text: ', error);
      });
  };

  useEffect(() => {
    let timeoutId: number | undefined;

    if (copyStatus) {
      timeoutId = setTimeout(() => {
        setCopyStatus('');
      }, 1000) as unknown as number;
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyStatus]);

  return (
    <div className='relative'>
      {copyStatus ? (
        <span
          className={`absolute px-4 py-2 rounded-3xl text-xl top-[-4rem] left-[-3rem] z-[100] ${bgColorVariants[bg]}`}
        >
          {copyStatus}
        </span>
      ) : null}

      <Tooltip content='Copy to clipboard'>
        <div>
          <AiFillCopy
            size={size}
            className='text-text-primary cursor-pointer hover:text-text-secondary transition-colors duration-200'
            onClick={(e) => handleCopy(e, copyText)}
          />
        </div>
      </Tooltip>
    </div>
  );
}

export default CopyClipboard;
