import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { type CommonTableProps } from '../../lib/types';
import TableRow from './TableRow';

type TableBodyProps = CommonTableProps & {
  displayedData: any;
  loading?: boolean;
};

function TableBody({ displayedData, loading, ...props }: TableBodyProps) {
  const skeletonRowCount = 12;
  const columnCount = props?.renderedRecords?.length;

  const renderSkeletonRows = () => {
    return Array.from({ length: skeletonRowCount }).map((_, rowIndex) => (
      <tr key={`skeleton-row-${rowIndex}`}>
        <td colSpan={columnCount + 1}>
          <Skeleton height={45.5} />
        </td>
      </tr>
    ));
  };

  return (
    <tbody className='table-rounded-bottom'>
      {loading
        ? renderSkeletonRows()
        : displayedData?.map((item: any) => <TableRow key={item?.[props.idProp]} record={item} {...props} />)}
    </tbody>
  );
}

export default TableBody;
