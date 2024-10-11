import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { type CommonTableProps } from '../../lib/types';
import TableRow from './TableRow';

type TableBodyProps = CommonTableProps & {
  displayedData: any;
  loading?: boolean;
  onWatchlistToggle: (username: string) => void; 
  isInWatchlist: (username: string) => boolean; 
};

function TableBody({ displayedData, loading, onWatchlistToggle, isInWatchlist, ...props }: TableBodyProps) {
  const skeletonRowCount = 14;
  const columnCount = props?.renderedRecords?.length;

  const renderSkeletonRows = () => {
    return Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
      <tr key={`skeleton-row-${rowIndex}`}>
        <td colSpan={columnCount + 1}>
          <Skeleton height={43.3} />
        </td>
      </tr>
    ));
  };

  return (
    <tbody className='table-rounded-bottom'>
      {loading
        ? renderSkeletonRows()
        : displayedData?.map((item: any) => (
            <TableRow
              key={item?.[props.idProp]}
              record={item}
              onWatchlistToggle={onWatchlistToggle} 
              isInWatchlist={isInWatchlist}
              {...props}
            />
          ))}
    </tbody>
  );
}

export default TableBody;
