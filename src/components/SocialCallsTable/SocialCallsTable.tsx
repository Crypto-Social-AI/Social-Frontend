import Table from 'components/Table/Table';
import socialCallsData from './socialCallsData';
import { type SocialPosts } from 'lib/types';
import ExpandedContent from './ExpandedContent/ExpandedContent';

type SocialCallsTableProps = {
  socialCalls: SocialPosts | null;
  loading: boolean;
};

export default function SocialCallsTable({ socialCalls, loading }: SocialCallsTableProps) {
  return (
    <Table
      className='max-h-[733px]'
      dataSrc={socialCalls}
      displayedData={socialCalls}
      renderedRecords={socialCallsData}
      loading={loading}
      idProp='id'
      isExpandable
      renderExpandedContent={(record) => <ExpandedContent record={record} />}
    />
  );
}
