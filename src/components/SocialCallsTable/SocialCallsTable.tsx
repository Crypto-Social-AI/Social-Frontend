import Table from 'components/Table/Table';
import socialCallsData from './socialCallsData';
import { type SocialPosts } from 'lib/types';
import ExpandedContent from './ExpandedContent/ExpandedContent';

type SocialCallsTableProps = {
  socialCalls: SocialPosts | null;
  loading: boolean;
  error?: Error | null;
};

export default function SocialCallsTable({ socialCalls, loading, error }: SocialCallsTableProps) {
  return (
    <Table
      className='h-error-or-empty-table-height'
      dataSrc={socialCalls}
      displayedData={socialCalls}
      renderedRecords={socialCallsData}
      loading={loading}
      idProp='id'
      error={error}
      isExpandable
      renderExpandedContent={(record) => <ExpandedContent record={record} />}
    />
  );
}
