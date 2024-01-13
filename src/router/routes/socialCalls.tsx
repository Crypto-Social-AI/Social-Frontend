import { getSocialCalls } from 'lib/utils/requests/getSocialCalls';
import { type SocialPost } from 'lib/types';
import sortData from 'lib/utils/helpers/sorting/sorting';
import SocialCallsTable from 'components/SocialCallsTable/SocialCallsTable';
import PaginationControls from 'components/PaginationControls/PaginationControls';
import {
  getCurrentProfitPercentage,
  getMaxProfitPercentage,
  getProfitForTimeRange,
} from 'lib/utils/helpers/calculations/calculateProfit';
import useTableData from 'hooks/useTableData';

type ExtendedSocialPost = SocialPost & {
  currentProfitLoss?: number | null;
  maxProfitLoss?: number | null;
  profitForOneHour?: number | null;
  profitForEightHours?: number | null;
  profitForOneDayHour?: number | null;
  profitForSevenDays?: number | null;
};

export default function SocialCalls() {
  // consider wrapping in useMemo
  const processData = (data: SocialPost[]): ExtendedSocialPost[] =>
    data?.map((post) => ({
      ...post,
      currentProfitLoss: getCurrentProfitPercentage(post),
      maxProfitLoss: getMaxProfitPercentage(post),
      profitForOneHour: getProfitForTimeRange(post, 'priceInComommonTokenOneHourLater'),
      profitForEightHours: getProfitForTimeRange(post, 'priceInComommonTokenEightHoursLater'),
      profitForOneDayHour: getProfitForTimeRange(post, 'priceInComommonTokenOneDayLater'),
      profitForSevenDays: getProfitForTimeRange(post, 'priceInComommonTokenOneWeekLater'),
    }));

  const {
    data: socialCalls,
    loading,
    sortConfig,
    currentPage,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    handleSortChange,
  } = useTableData(getSocialCalls, processData);

  const preProcessedData = socialCalls ? processData(socialCalls) : [];
  const sortedData = sortData<SocialPost, keyof SocialPost>(preProcessedData ?? [], sortConfig);

  return (
    <>
      <SocialCallsTable
        socialCalls={sortedData}
        loading={loading}
        handleSortChange={handleSortChange}
        sortConfig={sortConfig}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
}
