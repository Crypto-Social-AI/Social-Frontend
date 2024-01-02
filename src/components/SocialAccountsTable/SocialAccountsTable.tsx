import Table from 'components/Table/Table';
import { type SocialAccountWithPost } from 'lib/types';
import socialAccountsData from './socialAccountsData';
import ExpandedContent from './ExpandedContent';

type SocialAccountsTableProps = {
  socialAccounts: SocialAccountWithPost[] | null;
  loading: boolean;
};

export default function SocialAccountsTable({ socialAccounts, loading }: SocialAccountsTableProps) {
  return (
    <Table
      className='max-h-[650px]'
      loading={loading}
      dataSrc={socialAccounts}
      displayedData={socialAccounts}
      renderedRecords={socialAccountsData}
      idProp='id'
      renderExpandedContent={(record) => <ExpandedContent posts={record.posts} />}
      isExpandable
    />
  );
}
