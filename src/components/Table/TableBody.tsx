import { type CommonTableProps } from '../../lib/types';
import TableRow from './TableRow';

type TableBodyProps = CommonTableProps & {
  displayedData: any;
};

function TableBody({ displayedData, ...props }: TableBodyProps) {
  return (
    <tbody className='table-rounded-bottom'>
      {displayedData.map((item: any) => (
        <TableRow key={item?.[props.idProp]} record={item} {...props} />
      ))}
    </tbody>
  );
}

export default TableBody;
