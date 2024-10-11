import telegramIcon from 'assets/images/telegram-icon.png';
import { type SocialAccountWithPost } from 'lib/types';

export default [
  {
    id: 'username',
    header: 'Username',
    sortable: true,
    sortKey: 'username',
    render: (record: SocialAccountWithPost) => <span>@{record?.username}</span>,
  },
  {
    id: 'socialInfo',
    header: 'Social channel',
    sortable: true,
    sortKey: 'channelName',
    render: (record: SocialAccountWithPost) => (
      <div className='flex gap-1'>
        <img src={telegramIcon} alt='Telegram' />
        <a href={record?.channelLink ?? ''} target='_blank' rel='noreferrer'>
          <span className='text-blue hover:text-blue-hover hover:underline'>{record?.channelName}</span>
        </a>
      </div>
    ),
  },
  {
    id: 'postCount',
    header: 'Posts',
    sortable: true,
    sortKey: 'postCount',
    render: (record: SocialAccountWithPost) => <span>{record?.postCount}</span>,
  },
  {
    id: 'watchlist',
    header: 'Watchlist',
    sortable: false,
    render: (record: SocialAccountWithPost) => <span>{record?.watchlist}</span>,
  },
];
