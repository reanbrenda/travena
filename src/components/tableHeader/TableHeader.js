import PropTypes from 'prop-types';
// material
import { Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
// import { useState } from 'react';

// ----------------------------------------------------------------------

// const visuallyHidden = {
//   border: 0,
//   margin: -1,
//   padding: 0,
//   width: '1px',
//   height: '1px',
//   overflow: 'hidden',
//   position: 'absolute',
//   whiteSpace: 'nowrap',
//   clip: 'rect(0 0 0 0)',
// };

TableHeader.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabels: PropTypes.array,
  numSelected: PropTypes.number,
 // onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function TableHeader({
  order,
  orderBy,
  rowCount,
  headLabels,
  numSelected,
 // onRequestSort,
  onSelectAllClick,
}) {
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

 // const [sortedBy, setSortedBy] = useState(orderBy);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabels.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : 'asc'}
              // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
