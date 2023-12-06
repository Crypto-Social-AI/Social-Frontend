import { formatDistanceToNowStrict } from 'date-fns';
import socialCallsData from 'components/SocialCallsTable/socialCallsData';
import Table from 'components/Table/Table';
import { getFilteredColumnsData } from 'lib/utils/helpers/format/format';
import { type SocialPosts } from 'lib/types';

type ExpandedContentProps = {
  posts: SocialPosts;
  loading?: boolean;
};

function ExpandedContent({ posts, loading }: ExpandedContentProps) {
  const nestedSocialPostsColumnsData = getFilteredColumnsData(
    socialCallsData,
    ['channel'],
    [
      {
        id: 'date',
        header: 'Date',
        position: 1,
        render: ({ messageUnixTimestampInSeconds }: { messageUnixTimestampInSeconds: number }) => {
          const timeString =
            messageUnixTimestampInSeconds && formatDistanceToNowStrict(messageUnixTimestampInSeconds * 1000);

          return <span>{timeString} ago</span>;
        },
      },
    ],
  );
  return (
    <Table
      className='max-h-[300px]'
      renderedRecords={nestedSocialPostsColumnsData}
      displayedData={posts}
      dataSrc={posts}
      loading={loading}
      idProp='_id'
    />
  );
}

export default ExpandedContent;
