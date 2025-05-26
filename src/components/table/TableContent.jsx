import React from 'react';
import styled from 'styled-components';
import { flexRender } from '@tanstack/react-table';
import { theme } from '../../styles/theme';
import { FilePenLine,Trash } from 'lucide-react';
const TableContent = ({ 
  table,
  onEdit,
  onDelete 
}) => {
  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHeader 
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())
                  }
                  <SortIndicator>
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? (header.column.getCanSort() ? '' : '')}
                  </SortIndicator>
                </TableHeader>
              ))}
              <TableHeader>Acciones</TableHeader>
            </TableRow>
          ))}
        </TableHead>
        
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              <TableCell>
                <ActionButtons>
                  <ActionButton 
                    onClick={() => onEdit(row.original)}
                    variant="edit"
                    title="Editar"
                  >
                    <FilePenLine/>
                  </ActionButton>
                  <ActionButton 
                    onClick={() => onDelete(row.original)}
                    variant="delete"
                    title="Eliminar"
                  >
                      <Trash/>
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      
      {table.getRowModel().rows.length === 0 && (
        <EmptyState>
          <EmptyIcon>📭</EmptyIcon>
          <EmptyText>No se encontraron datos</EmptyText>
        </EmptyState>
      )}
    </TableContainer>
  );
};

export default TableContent;
const TableContainer = styled.div`
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  overflow-y: auto;
  border: 1px solid #f1f5f9;
  height: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: ${theme.colors.darkSecondary};
`;

const TableBody = styled.tbody`
  background: #ffffff;

`;

const TableRow = styled.tr`
  transition: all 0.2s ease;
  
  ${props => !props.isHeader && `
    &:nth-child(even) {
      background-color: #f8fafc;
    }
    
    &:hover {
      transform: scale(1.001);
    }
  `}
`;

const TableHeader = styled.th`
  padding: 20px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  user-select: none;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  
  &:first-child {
    padding-left: 24px;
  }
  
  &:last-child {
    padding-right: 24px;
  }
  
  ${props => props.sortable && `
    &:active {
      background: rgba(255, 255, 255, 0.2);
    }
  `}
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
  
  &:first-child {
    padding-left: 24px;
    font-weight: 600;
    color: #1f2937;
  }
  
  &:last-child {
    padding-right: 24px;
  }
`;

const SortIndicator = styled.span`
  font-size: 12px;
  margin-left: 8px;
  opacity: 0.8;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  ${props => props.variant === 'edit' && `
    color: #d97706;
    &:hover {
      transform: scale(1.1);
    }
  `}
  ${props => props.variant === 'delete' && `
    color: #dc2626;
    &:hover {
      transform: scale(1.1);
    }
  `}
  
  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  color: #6b7280;
  background: #fafafa;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
`;

const EmptyText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;