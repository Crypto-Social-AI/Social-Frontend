import { truncateString } from 'lib/utils/helpers/format/format';
import { type TokenSymbolAndNameProps } from 'lib/types';
import TokenImage from '../TokenImage/TokenImage';

export default function TokenSymbolAndName({
  tokenImage,
  tokenSymbol,
  tokenName,
  tokenImgBgColor,
}: TokenSymbolAndNameProps) {
  return (
    <div className='flex items-center w-fit gap-3'>
      <TokenImage tokenIcon={tokenImage} tokenSymbol={tokenSymbol} size={32} bg={tokenImgBgColor} />

      {tokenName !== undefined && tokenSymbol !== undefined ? (
        <div className='flex flex-col'>
          <div className='flex gap-1 items-center'>
            {tokenSymbol !== undefined ? <span className='text-2xl'>{truncateString(tokenSymbol, 16)}</span> : 'N/A'}
          </div>
          <div>
            {tokenName !== undefined ? (
              <span className='text-xl text-text-secondary'>{truncateString(tokenName, 16)}</span>
            ) : (
              'N/A'
            )}
          </div>
        </div>
      ) : (
        <span>N/A</span>
      )}
    </div>
  );
}
