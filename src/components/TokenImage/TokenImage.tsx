import { type BgColor } from 'lib/types';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
import uniswapLogo from 'assets/images/uniswap-logo.png';

type SizeMapping = {
  [key in 16 | 24 | 28 | 32 | 36 | 40]: string;
};

const getSizeClasses = (size: keyof SizeMapping) => {
  const sizeMapping = {
    16: 'min-w-[16px] w-[16px] min-h-[16px] h-[16px]',
    24: 'min-w-[24px] w-[24px] min-h-[24px] h-[24px]',
    28: 'min-w-[28px] w-[28px] min-h-[28px] h-[28px]',
    32: 'min-w-[32px] w-[32px] min-h-[32px] h-[32px]',
    36: 'min-w-[36px] w-[36px] min-h-[36px] h-[36px]',
    40: 'min-w-[40px] w-[40px] min-h-[40px] h-[40px]',
  };

  return sizeMapping[size];
};

type TokenImageProps = {
  tokenSymbol: string | null;
  tokenIcon: string | null;
  loading?: boolean;
  hasDexToken?: boolean;
  bg?: BgColor;
  size?: keyof SizeMapping;
};

function TokenImage({
  tokenSymbol,
  tokenIcon,
  loading,
  hasDexToken = false,
  bg = 'secondary',
  size = 16,
}: TokenImageProps) {
  const firstLetterOfSymbol = tokenSymbol?.at(0) !== undefined && tokenSymbol?.at(0) !== '' ? tokenSymbol?.at(0) : 'E';

  const bgVariants = {
    base: 'bg-primary',
    contrast: 'bg-contrast',
    secondary: 'bg-secondary',
  };

  return (
    <div className={`${bgVariants[bg]} ${getSizeClasses(size)} rounded-full flex items-center justify-center relative`}>
      {tokenIcon !== null ? (
        <>
          {hasDexToken && (
            <div className='w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center absolute top-[-3px] right-[-1px]'>
              <img src={uniswapLogo} alt='Uniswap' className='w-[10px] h-[10px] object-cover' />
            </div>
          )}
          {tokenIcon && (
            <img
              src={tokenIcon}
              alt={!tokenSymbol ? 'Token' : tokenSymbol}
              className='w-full h-full object-cover rounded-full'
            />
          )}

          {/* {(!loading && (
            <Image src={tokenIcon} alt={tokenSymbol} className='w-full h-full object-cover rounded-full' />
          )) || (
            <Skeleton
              width={35}
              height={35}
              borderRadius={100}
              baseColor='var(--secondary)'
              highlightColor='var(--contrast)'
            />
          )} */}
        </>
      ) : (
        <>
          {hasDexToken && (
            <div className='w-[14px] h-[14px] bg-white rounded-full flex items-center justify-center absolute top-[-3px] right-[-1px]'>
              <img src={uniswapLogo} alt='Uniswap' className='w-[10px] h-[10px] object-cover' />
            </div>
          )}

          <span className='uppercase text-text-contrast'>{firstLetterOfSymbol}</span>

          {/* {(!loading && <span className='uppercase text-text-primary'>{firstLetterOfSymbol}</span>) || (
            <Skeleton
              width={35}
              height={35}
              borderRadius={100}
              baseColor='var(--secondary)'
              highlightColor='var(--contrast)'
            />
          )} */}
        </>
      )}
    </div>
  );
}

export default TokenImage;
