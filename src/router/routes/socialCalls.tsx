import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { type SocialCallsResponse, getSocialCalls } from 'lib/utils/requests/getSocialCalls';
import { type SortConfig, type SocialPosts, type SocialPost } from 'lib/types';
import { TABLE_RECORDS_PER_PAGE_LIMIT } from 'lib/utils/constants/general';
import sortData from 'lib/utils/helpers/sorting/sorting';
import SocialCallsTable from 'components/SocialCallsTable/SocialCallsTable';
import PaginationControls from 'components/PaginationControls/PaginationControls';
import {
  getCurrentProfitPercentage,
  getMaxProfitPercentage,
  getProfitForTimeRange,
} from 'lib/utils/helpers/calculations/calculateProfit';

type ExtendedSocialPost = SocialPost & {
  currentProfitLoss?: number | null;
  maxProfitLoss?: number | null;
  profitForOneHour?: number | null;
  profitForEightHours?: number | null;
  profitForOneDayHour?: number | null;
  profitForSevenDays?: number | null;
};

// TODO: Add custom hook or HOC to keep code DRY (SocialCalls and SocialAccounts virtually the same code)
export default function SocialCalls() {
  const address = useAddress();
  const [socialCalls, setSocialCalls] = useState<SocialPosts | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState<SortConfig<keyof SocialPost> | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(TABLE_RECORDS_PER_PAGE_LIMIT);
  const [loading, setLoading] = useState(false);

  const handleSortChange = (key: keyof SocialPost) => {
    setSortConfig((currentSortConfig): SortConfig<keyof SocialPost> | null => {
      if (currentSortConfig && currentSortConfig.key === key) {
        return {
          key,
          direction: currentSortConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

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

  const preProcessedData = socialCalls ? processData(socialCalls) : [];
  const sortedData = sortData<SocialPost, keyof SocialPost>(preProcessedData ?? [], sortConfig);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
  };

  const fetchData = async (page: number, limit: number) => {
    if (address) {
      setLoading(true);
      try {
        const data: SocialCallsResponse = await getSocialCalls(page, limit);
        setSocialCalls(data.socialPosts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error({ error });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    async function fetchDataAsync() {
      await fetchData(currentPage, itemsPerPage);
    }

    fetchDataAsync().catch(console.error);
  }, [address, currentPage, itemsPerPage]);

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
