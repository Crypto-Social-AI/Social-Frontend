import Table from 'components/Table/Table';
import { type SocialAccountWithPost } from 'lib/types';
import socialAccountsData from './socialAccountsData';
import ExpandedContent from './ExpandedContent';

type SocialAccountsTableProps = {
  socialAccounts: SocialAccountWithPost[] | null;
};

export default function SocialAccountsTable({ socialAccounts }: SocialAccountsTableProps) {
  return (
    <Table
      className='max-h-[650px]'
      dataSrc={socialAccounts}
      displayedData={socialAccounts}
      renderedRecords={socialAccountsData}
      idProp='id'
      isExpandable
      renderExpandedContent={(record) => <ExpandedContent posts={record.posts} />}
    />
  );
}
