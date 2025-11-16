import React from 'react';
import styled from 'styled-components';
import Paper from './Paper';

interface GridColDef {
  field: string;
  headerName?: string;
  width?: number;
  sortable?: boolean;
  type?: string;
  description?: string;
  renderCell?: (params: { row: any; value: any; field: string }) => React.ReactNode;
}

interface DataGridProps {
  rows: any[];
  columns: GridColDef[];
  initialState?: {
    pagination?: {
      paginationModel: {
        page: number;
        pageSize: number;
      };
    };
  };
  pageSizeOptions?: number[];
  sx?: React.CSSProperties;
  className?: string;
  onRowClick?: (row: any) => void;
}

const TableWrapper = styled.div<{ customStyles?: React.CSSProperties }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  ${props => props.customStyles && Object.entries(props.customStyles).map(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssKey}: ${value};`;
  }).join('\n')}
`;

const TableContainer = styled.div`
  overflow: auto;
  flex: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const TableRow = styled.tr<{ clickable: boolean }>`
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${props => props.clickable ? 'rgba(0, 0, 0, 0.04)' : 'transparent'};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th<{ width?: number; sortable: boolean }>`
  padding: 16px;
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5rem;
  letter-spacing: 0.01071em;
  color: rgba(0, 0, 0, 0.87);
  width: ${props => props.width ? `${props.width}px` : 'auto'};
  min-width: ${props => props.width ? `${props.width}px` : '150px'};
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${props => props.sortable ? 'rgba(0, 0, 0, 0.04)' : 'transparent'};
  }
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 16px;
  font-size: 0.875rem;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid rgba(224, 224, 224, 1);
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px 16px;
  border-top: 1px solid rgba(224, 224, 224, 1);
`;

const PaginationInfo = styled.span`
  margin-right: 16px;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PaginationButton = styled.button<{ disabled: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 4px;
  background-color: #fff;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.875rem;
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.26)' : 'rgba(0, 0, 0, 0.87)'};
  
  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.04);
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

const PageSizeSelect = styled.select`
  margin-left: 16px;
  padding: 4px 8px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
`;

const DataGrid: React.FC<DataGridProps> = ({
  rows,
  columns,
  initialState,
  pageSizeOptions = [5, 10, 25, 50, 100],
  sx,
  className,
  onRowClick
}) => {
  const [paginationModel, setPaginationModel] = React.useState(
    initialState?.pagination?.paginationModel || { page: 0, pageSize: 10 }
  );
  const [sortModel, setSortModel] = React.useState<{ field: string; sort: 'asc' | 'desc' } | null>(null);

  const handleSort = (field: string) => {
    const column = columns.find(col => col.field === field);
    if (!column || !column.sortable) return;

    setSortModel(prev => {
      if (prev?.field === field) {
        if (prev.sort === 'asc') {
          return { field, sort: 'desc' };
        } else {
          return null;
        }
      } else {
        return { field, sort: 'asc' };
      }
    });
  };

  const sortedRows = React.useMemo(() => {
    if (!sortModel) return rows;
    
    return [...rows].sort((a, b) => {
      const aValue = a[sortModel.field];
      const bValue = b[sortModel.field];
      
      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortModel.sort === 'asc' ? comparison : -comparison;
    });
  }, [rows, sortModel]);

  const paginatedRows = React.useMemo(() => {
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    return sortedRows.slice(start, end);
  }, [sortedRows, paginationModel]);

  const totalPages = Math.ceil(sortedRows.length / paginationModel.pageSize);

  const handlePageChange = (newPage: number) => {
    setPaginationModel(prev => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationModel({ page: 0, pageSize: newPageSize });
  };

  const getCellValue = (row: any, column: GridColDef) => {
    if (column.renderCell) {
      return column.renderCell({ row, value: row[column.field], field: column.field });
    }
    return row[column.field] ?? '';
  };

  return (
    <Paper sx={sx} className={className}>
      <TableWrapper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow clickable={false}>
                {columns.map((column) => (
                  <TableHeaderCell
                    key={column.field}
                    width={column.width}
                    sortable={column.sortable !== false}
                    onClick={() => handleSort(column.field)}
                    title={column.description}
                  >
                    {column.headerName || column.field}
                    {sortModel?.field === column.field && (
                      <span> {sortModel.sort === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  clickable={!!onRowClick}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {getCellValue(row, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationWrapper>
          <PaginationInfo>
            {sortedRows.length === 0 ? '0' : paginationModel.page * paginationModel.pageSize + 1}-
            {Math.min((paginationModel.page + 1) * paginationModel.pageSize, sortedRows.length)} из {sortedRows.length}
          </PaginationInfo>
          <PaginationButtons>
            <PaginationButton
              disabled={paginationModel.page === 0}
              onClick={() => handlePageChange(0)}
            >
              {'<<'}
            </PaginationButton>
            <PaginationButton
              disabled={paginationModel.page === 0}
              onClick={() => handlePageChange(paginationModel.page - 1)}
            >
              {'<'}
            </PaginationButton>
            <PaginationButton
              disabled={paginationModel.page >= totalPages - 1}
              onClick={() => handlePageChange(paginationModel.page + 1)}
            >
              {'>'}
            </PaginationButton>
            <PaginationButton
              disabled={paginationModel.page >= totalPages - 1}
              onClick={() => handlePageChange(totalPages - 1)}
            >
              {'>>'}
            </PaginationButton>
          </PaginationButtons>
          <PageSizeSelect value={paginationModel.pageSize} onChange={handlePageSizeChange}>
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </PageSizeSelect>
        </PaginationWrapper>
      </TableWrapper>
    </Paper>
  );
};

export default DataGrid;

