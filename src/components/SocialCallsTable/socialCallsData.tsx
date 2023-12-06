import { type SocialPost } from 'lib/types';
import TokenSymbolAndName from '../TokenSymbolAndName/TokenSymbolAndName';
import NumberFormat from 'components/NumberFormat.tsx/NumberFormat';
import Tooltip from 'components/Tooltip/Tooltip';
import {
  getCurrentProfitPercentage,
  getMaxProfitPercentage,
  getProfitForTimeRange,
} from 'lib/utils/helpers/calculations/calculateProfit';
import { truncateString } from 'lib/utils/helpers/format/format';

type GetSocialMediaSourceProps = {
  isTwitter: boolean;
  isDiscord: boolean;
  isTelegram: boolean;
};

function getSocialMediaSource({ isTwitter, isDiscord, isTelegram }: GetSocialMediaSourceProps) {
  if (isTwitter) return 'Twitter';
  if (isDiscord) return 'Discord';
  if (isTelegram) return 'Telegram';
  return null;
}

export default [
  {
    id: 'tokenInfo',
    header: 'Token',
    render: (record: SocialPost) => {
      return (
        <TokenSymbolAndName
          tokenImage={record?.tokenImage}
          tokenName={record?.tokenName}
          tokenSymbol={record?.tokenSymbol}
          tokenImgBgColor='contrast'
        />
      );
    },
  },
  {
    id: 'channel',
    header: 'Channel',
    render: (record: SocialPost) => {
      const socialMedia = getSocialMediaSource(record);

      return (
        <div className='flex flex-col'>
          <span> {truncateString(record?.channelName ?? '', 24)}</span>
          <Tooltip content='Open Telegram channel'>
            <a
              href={record?.channelLink ?? ''}
              target='_blank'
              rel='noreferrer'
              className='text-blue hover:text-blue-hover w-fit'
            >
              {socialMedia}
            </a>
          </Tooltip>
        </div>
      );
    },
  },
  {
    id: 'currentProfitLoss',
    header: 'Curr',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profit = getCurrentProfitPercentage(record);
      const bgColor = profit !== null && profit < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = profit !== null && profit < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit`}>
          <NumberFormat value={profit} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
  {
    id: 'maxProfitLoss',
    header: 'Max',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profit = getMaxProfitPercentage(record);
      const bgColor = profit && profit < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = profit && profit < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit flex items-center gap-1`}>
          {profit && profit >= 10000 ? <span className='text-[#047857]'>&#62;</span> : null}
          <NumberFormat value={profit} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
  {
    id: '1h',
    header: '1H',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForOneHour = getProfitForTimeRange(record, 'priceInComommonTokenOneHourLater');
      const bgColor = profitForOneHour && profitForOneHour < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = profitForOneHour && profitForOneHour < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit`}>
          <NumberFormat value={profitForOneHour} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
  {
    id: '8h',
    header: '8H',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForEightHours = getProfitForTimeRange(record, 'priceInComommonTokenEightHoursLater');
      const bgColor = profitForEightHours && profitForEightHours < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = profitForEightHours && profitForEightHours < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit`}>
          <NumberFormat value={profitForEightHours} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
  {
    id: '1d',
    header: '1D',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForOneDayHour = getProfitForTimeRange(record, 'priceInComommonTokenOneDayLater');
      const bgColor = profitForOneDayHour && profitForOneDayHour < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = profitForOneDayHour && profitForOneDayHour < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit`}>
          <NumberFormat value={profitForOneDayHour} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
  {
    id: '7d',
    header: '7D',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForSevenDays = getProfitForTimeRange(record, 'priceInComommonTokenOneWeekLater');
      const bgColor = profitForSevenDays && profitForSevenDays < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = profitForSevenDays && profitForSevenDays < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit`}>
          <NumberFormat value={profitForSevenDays} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
];
