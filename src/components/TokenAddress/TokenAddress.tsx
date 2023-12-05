import CopyClipboard from 'components/CopyClipboard/CopyClipboard';
import HashLink from 'components/HashLink/HashLink';
import { formatAddress } from 'lib/utils/helpers/format/format';

type TokenAddressProps = {
  address: string;
  addressType: 'Token' | 'Pair';
  isAddressLink?: boolean;
};

export default function TokenAddress({ address, addressType, isAddressLink = false }: TokenAddressProps) {
  return (
    <div className='flex gap-2 items-center'>
      <div className='flex items-center gap-2'>
        <span className='text-text-secondary text-xl'>{addressType}:</span>
        {isAddressLink ? (
          <HashLink type='address' hash={address} color='blue' />
        ) : (
          <span className='text-text-primary text-xl'>{formatAddress(address)}</span>
        )}
      </div>
      <CopyClipboard copyText={address} />
    </div>
  );
}
