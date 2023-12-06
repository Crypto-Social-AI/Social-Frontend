import telegramIcon from 'assets/images/telegram-icon.png';
import { type SocialAccountWithPost } from 'lib/types';

export default [
  {
    id: 'username',
    header: 'Username',
    render: (record: SocialAccountWithPost) => <span>@{record?.username}</span>,
  },
  {
    id: 'socialInfo',
    header: 'Social channel',
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
    id: 'postsCount',
    header: 'Posts',
    render: (record: SocialAccountWithPost) => <span>{record?.posts?.length}</span>,
  },
];
