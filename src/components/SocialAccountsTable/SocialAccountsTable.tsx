import Table from 'components/Table/Table';
import { type SocialAccountWithPost } from 'lib/types';
import socialAccountsData from './socialAccountsData';
// import ExpandedContent from './ExpandedContent/ExpandedContent';

type SocialAccountsTableProps = {
  socialAccounts: SocialAccountWithPost[];
};

export default function SocialAccountsTable({ socialAccounts }: SocialAccountsTableProps) {
  return (
    <Table
      className='max-h-[650px]'
      dataSrc={socialAccounts}
      displayedData={socialAccounts}
      renderedRecords={socialAccountsData}
      idProp='id'
      // isExpandable
      // renderExpandedContent={(record) => <ExpandedContent record={record} />}
    />
  );
}
