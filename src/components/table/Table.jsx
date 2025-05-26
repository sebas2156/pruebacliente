import React from 'react';
import styled from 'styled-components';
import { createColumnHelper } from '@tanstack/react-table';
import { useTableData } from '../../hook/useTable';
import TableHeader from './TableHeader';
import TableContent from './TableContent';
import TablePagination from './TablePagination';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { theme } from '../../styles/theme';

const Table = ({ 
  data = [], 
  columns = [], 
  title = "Tabla de Datos",
  onAdd,
  onEdit,
  onDelete 
}) => {
  const {
    table,
    globalFilter,
    setGlobalFilter
  } = useTableData(data, columns);

  const handleExportExcel = () => {
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, `${title}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 20, 20);
    
    const filteredData = table.getFilteredRowModel().rows.map(row => row.original);
    const tableColumns = columns.map(col => col.header || col.accessorKey);
    const tableRows = filteredData.map(row => 
      columns.map(col => row[col.accessorKey] || '')
    );
    
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });
    
    doc.save(`${title}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <TableWrapper>
      <TableHeader
        title={title}
        onAdd={onAdd}
        onExportExcel={handleExportExcel}
        onExportPDF={handleExportPDF}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      
      <TableContent
        table={table}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      
      <TablePagination table={table} />
    </TableWrapper>
  );
};

export default Table;

const TableWrapper = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
  }
`;
