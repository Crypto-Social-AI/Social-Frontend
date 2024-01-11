import { type SocialPost } from 'lib/types';
import TokenSymbolAndName from '../TokenSymbolAndName/TokenSymbolAndName';
import NumberFormat from 'components/NumberFormat.tsx/NumberFormat';
import Tooltip from 'components/Tooltip/Tooltip';
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
    sortable: true,
    sortKey: 'channelName',
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
    sortable: true,
    sortKey: 'currentProfitLoss',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const currentProfitLoss = record.currentProfitLoss;
      const bgColor = currentProfitLoss !== null && currentProfitLoss < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = currentProfitLoss !== null && currentProfitLoss < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit`}>
          <NumberFormat value={currentProfitLoss} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
  {
    id: 'maxProfitLoss',
    header: 'Max',
    sortable: true,
    sortKey: 'maxProfitLoss',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const maxProfitLoss = record.maxProfitLoss;
      const bgColor = maxProfitLoss && maxProfitLoss < 0 ? 'bg-red-opacity-20' : 'bg-green-opacity-20';
      const textColor = maxProfitLoss && maxProfitLoss < 0 ? 'redArb' : 'greenArb';

      return (
        <div className={`${bgColor} px-4 py-1 rounded-lg w-fit flex items-center gap-1`}>
          {maxProfitLoss && maxProfitLoss >= 10000 ? <span className='text-[#047857]'>&#62;</span> : null}
          <NumberFormat value={maxProfitLoss} color={textColor} decimals={2} isPercentage />
        </div>
      );
    },
  },
  {
    id: '1h',
    header: '1H',
    sortable: true,
    sortKey: 'profitForOneHour',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForOneHour = record.profitForOneHour;
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
    sortable: true,
    sortKey: 'profitForEightHours',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForEightHours = record.profitForEightHours;
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
    sortable: true,
    sortKey: 'profitForOneDayHour',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForOneDayHour = record.profitForOneDayHour;
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
    sortable: true,
    sortKey: 'profitForSevenDays',
    headerClassName: 'w-0',
    render: (record: SocialPost) => {
      const profitForSevenDays = record.profitForSevenDays;
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
