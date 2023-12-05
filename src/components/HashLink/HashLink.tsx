import { Link } from 'react-router-dom';
import EtherscanLogoLink from 'components/EtherscanLogoLink/EtherscanLogoLink';
import { append0xToAddress, formatAddress } from 'lib/utils/helpers/format/format';
import { etherscanBaseUrl } from 'lib/utils/constants/baseUrls';

type HashLinkProps = {
  hash: string;
  icon?: string | null;
  tooltipData?: any;
  emojiData?: any;
  className?: string;
  type?: 'tx' | 'address';
  isImgLink?: boolean;
  color?: 'slate' | 'blue' | 'red' | 'green';
  tooltipText?: string;
  external?: boolean;
  pageRoute?: string;
};

function HashLink({
  hash,
  icon,
  tooltipData,
  emojiData,
  className,
  type = 'tx',
  isImgLink = false,
  color = 'slate',
  tooltipText = '',
  external = true, // Default value is set to false
  pageRoute = '',
}: HashLinkProps) {
  const colorVariants = {
    slate: 'text-text-secondary hover:text-text-primary',
    blue: 'text-blue hover:text-blue-hover',
    red: 'text-red-primary hover:text-red-400',
    green: 'text-green-primary hover:text-green-400',
  };

  const appendedHash = append0xToAddress(hash);

  const InternalLink = (
    <Link
      to={`/${pageRoute}/${appendedHash}`}
      className={`${colorVariants[color]} ${className} underline transition-all duration-200`}
    >
      <span className={`${colorVariants[color]} transition-all duration-200`}>{formatAddress(appendedHash)}</span>
    </Link>
  );

  const ExternalLink = (
    <a
      href={`${etherscanBaseUrl}/${type}/${appendedHash}`}
      target='_blank'
      data-tooltip-id={hash}
      rel='noreferrer'
      className={`${colorVariants[color]} ${className} underline transition-all duration-200`}
    >
      <span className={`${colorVariants[color]} transition-all duration-200`}>{formatAddress(appendedHash)}</span>
    </a>
  );

  return (
    <>
      {external ? ExternalLink : InternalLink}
      {appendedHash && isImgLink ? (
        <EtherscanLogoLink type={type} hashLink={appendedHash} tooltipText={tooltipText} />
      ) : null}
    </>
  );
}

export default HashLink;
