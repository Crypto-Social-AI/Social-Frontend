import Table from 'components/Table/Table';
import socialCallsData from './socialCallsData';
import { type SortConfig, type SocialPost, type SocialPosts } from 'lib/types';
import ExpandedContent from './ExpandedContent/ExpandedContent';

type SocialCallsTableProps = {
  socialCalls: SocialPosts | null;
  loading: boolean;
  handleSortChange: (key: keyof SocialPost) => void;
  sortConfig: SortConfig<keyof SocialPost> | null;
};

export default function SocialCallsTable({
  socialCalls,
  handleSortChange,
  sortConfig,
  loading,
}: SocialCallsTableProps) {
  return (
    <Table
      className='h-error-or-empty-table-height'
      dataSrc={socialCalls}
      displayedData={socialCalls}
      renderedRecords={socialCallsData}
      loading={loading}
      handleSortClick={handleSortChange}
      sortConfig={sortConfig}
      idProp='id'
      isExpandable
      renderExpandedContent={(record) => <ExpandedContent record={record} />}
    />
  );
}
