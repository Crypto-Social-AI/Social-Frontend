import { useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import telegramIcon from 'assets/images/telegram-icon.png';
import TokenAddress from 'components/TokenAddress/TokenAddress';
import NestedContent from './NestedContent';

export default function ExpandedContent({ record }: any) {
  const [isNestedExpanded, setNestedExpanded] = useState(false);

  const timeString =
    record?.messageUnixTimestampInSeconds && formatDistanceToNowStrict(record.messageUnixTimestampInSeconds * 1000);

  return (
    <div className='flex w-full flex-col'>
      <div className={`flex w-full ${isNestedExpanded ? 'border-b border-b-contrast' : null}`}>
        <button className='px-6 py-4' type='button' onClick={() => setNestedExpanded(!isNestedExpanded)}>
          {isNestedExpanded ? (
            <HiChevronUp className='cursor-pointer' size={20} />
          ) : (
            <HiChevronDown className='cursor-pointer' size={20} />
          )}
        </button>
        <div className='flex items-center gap-[6rem] justify-between py-4'>
          {/* Expanded content */}
          <div className='flex flex-col gap-1'>
            <TokenAddress addressType='Token' address={record?.tokenAddress} isAddressLink />
            <TokenAddress addressType='Pair' address={record?.pairAddress} isAddressLink />
          </div>
          <div className='flex flex-col'>
            <span className='text-2xl bold'>{record?.channelName}</span>
            <div className='flex gap-1 items-center'>
              <img src={telegramIcon} alt='Telegram' />
              <span className='text-lg leading-none'>@{record?.username}</span>
              <div className='flex gap-1'>
                <span>•</span>
                <span className='text-lg'>{timeString} ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nested expanded content */}
      {isNestedExpanded && <NestedContent record={record} />}
    </div>
  );
}
