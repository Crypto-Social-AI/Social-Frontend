import ExpandedContentFromSocialCalls from 'components/SocialCallsTable/ExpandedContent/ExpandedContent';
import socialCallsData from 'components/SocialCallsTable/socialCallsData';
import Table from 'components/Table/Table';
import { formatDistanceToNowStrict } from 'date-fns';
import { type SocialPosts } from 'lib/types';
import { getFilteredColumnsData } from 'lib/utils/helpers/format/format';

type ExpandedContentProps = {
  posts: SocialPosts;
  loading?: boolean;
};

function ExpandedContent({ posts, loading }: ExpandedContentProps) {
  const socialCallsDataWithoutSortKey = socialCallsData.map(({ sortKey, ...rest }) => rest);

  const nestedSocialPostsColumnsData = getFilteredColumnsData(
    socialCallsDataWithoutSortKey,
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
      idProp='id'
      isExpandable
      renderExpandedContent={(record) => <ExpandedContentFromSocialCalls record={record} />}
    />
  );
}

export default ExpandedContent;
