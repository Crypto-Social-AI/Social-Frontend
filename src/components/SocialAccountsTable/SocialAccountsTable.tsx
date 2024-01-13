import Table from 'components/Table/Table';
import { type SortConfig, type SocialAccountWithPost } from 'lib/types';
import socialAccountsData from './socialAccountsData';
import ExpandedContent from './ExpandedContent';

type SocialAccountsTableProps = {
  socialAccounts: SocialAccountWithPost[] | null;
  loading: boolean;
  handleSortChange: (key: keyof SocialAccountWithPost) => void;
  sortConfig?: SortConfig<keyof SocialAccountWithPost> | null;
};

export default function SocialAccountsTable({
  socialAccounts,
  loading,
  sortConfig,
  handleSortChange,
}: SocialAccountsTableProps) {
  return (
    <Table
      className='h-error-or-empty-table-height'
      loading={loading}
      dataSrc={socialAccounts}
      displayedData={socialAccounts}
      renderedRecords={socialAccountsData}
      sortConfig={sortConfig}
      handleSortClick={handleSortChange}
      idProp='id'
      renderExpandedContent={(record) => <ExpandedContent posts={record.posts} />}
      isExpandable
    />
  );
}
