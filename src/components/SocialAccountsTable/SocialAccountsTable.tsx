import Table from 'components/Table/Table';
import { type SortConfig, type SocialAccountWithPost } from 'lib/types';
import socialAccountsData from './socialAccountsData';
import ExpandedContent from './ExpandedContent';

type SocialAccountsTableProps = {
  socialAccounts: SocialAccountWithPost[] | null;
  loading: boolean;
  sortConfig: SortConfig | null;
  onHandleSortChange: (key: string) => void;
};

export default function SocialAccountsTable({
  socialAccounts,
  loading,
  sortConfig,
  onHandleSortChange,
}: SocialAccountsTableProps) {
  return (
    <Table
      className='h-error-or-empty-table-height'
      loading={loading}
      dataSrc={socialAccounts}
      displayedData={socialAccounts}
      renderedRecords={socialAccountsData}
      sortConfig={sortConfig}
      handleSortClick={onHandleSortChange}
      idProp='id'
      renderExpandedContent={(record) => <ExpandedContent posts={record.posts} />}
      isExpandable
    />
  );
}
