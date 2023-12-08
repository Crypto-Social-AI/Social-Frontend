import Table from 'components/Table/Table';
import socialCallsData from './socialCallsData';
import { type SocialPosts } from 'lib/types';
import ExpandedContent from './ExpandedContent/ExpandedContent';

type SocialCallsTableProps = {
  socialCalls: SocialPosts | null;
};

export default function SocialCallsTable({ socialCalls }: SocialCallsTableProps) {
  return (
    <Table
      className='max-h-[650px]'
      dataSrc={socialCalls}
      displayedData={socialCalls}
      renderedRecords={socialCallsData}
      idProp='id'
      isExpandable
      renderExpandedContent={(record) => <ExpandedContent record={record} />}
    />
  );
}
