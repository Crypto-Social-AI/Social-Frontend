import Table from 'components/Table/Table';
import { type SocialAccountWithPost, type SortConfig } from 'lib/types';
import ExpandedContent from './ExpandedContent';
import socialAccountsData from './socialAccountsData';

type SocialAccountsTableProps = {
  socialAccounts: SocialAccountWithPost[] | null;
  loading: boolean;
  handleSortChange: (key: keyof SocialAccountWithPost) => void;
  sortConfig?: SortConfig<keyof SocialAccountWithPost> | null;
  onWatchlistToggle: (username: string) => void;
  isInWatchlist: (username: string) => boolean;
};

export default function SocialAccountsTable({
  socialAccounts,
  loading,
  sortConfig,
  handleSortChange,
  onWatchlistToggle,
  isInWatchlist,
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
      onWatchlistToggle={onWatchlistToggle}
      isInWatchList={isInWatchlist}
      idProp='id'
      renderExpandedContent={(record) => <ExpandedContent posts={record.posts} />}
      isExpandable
    />
  );
}
