import { etherscanBaseUrl } from 'lib/utils/constants/baseUrls';
import Tooltip from 'components/Tooltip/Tooltip';
import EtherscanLogo from 'components/Svg/EtherscanLogo/EtherscanLogo';

type EtherscanLogoLinkProps = {
  hashLink: string;
  tooltipText?: string;
  type?: 'tx' | 'address';
  w?: number;
  h?: number;
  tooltipPlacement?: string;
};

export default function EtherscanLogoLink({
  hashLink,
  tooltipText,
  type = 'tx',
  w = 20,
  h = 20,
  tooltipPlacement = 'top',
}: EtherscanLogoLinkProps) {
  return (
    <Tooltip content={tooltipText} otherProps={{ placement: tooltipPlacement, onShow: () => !!tooltipText }}>
      <a href={`${etherscanBaseUrl}/${type}/${hashLink}`} target='_blank' rel='noopener noreferrer'>
        <EtherscanLogo w={w} h={h} />
      </a>
    </Tooltip>
  );
}
