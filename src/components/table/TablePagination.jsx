import styled from 'styled-components';
import { theme } from '../../styles/theme';

const TablePagination = ({ table }) => {
  const {
    getState,
    getPageCount,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
    setPageSize,
    getRowCount,
  } = table;

  const { pagination } = getState();
  
  const startRow = pagination.pageIndex * pagination.pageSize + 1;
  const endRow = Math.min((pagination.pageIndex + 1) * pagination.pageSize, getRowCount());

  return (
    <PaginationContainer>
      <PaginationInfo>
        Mostrando {startRow} a {endRow} de {getRowCount()} registros
      </PaginationInfo>
      
      <PaginationControls>
        <PageSizeSelector>
          <label>Mostrar: </label>
          <select
            value={pagination.pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 50, 100].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </PageSizeSelector>
        
        <ButtonGroup>
          <PaginationButton 
            onClick={() => setPageIndex(0)} 
            disabled={!getCanPreviousPage()}
          >
            {'<<'}
          </PaginationButton>
          <PaginationButton 
            onClick={previousPage} 
            disabled={!getCanPreviousPage()}
          >
            {'<'}
          </PaginationButton>
          
          <PageInfo>
            Página {pagination.pageIndex + 1} de {getPageCount()}
          </PageInfo>
          
          <PaginationButton 
            onClick={nextPage} 
            disabled={!getCanNextPage()}
          >
            {'>'}
          </PaginationButton>
          <PaginationButton 
            onClick={() => setPageIndex(getPageCount() - 1)} 
            disabled={!getCanNextPage()}
          >
            {'>>'}
          </PaginationButton>
        </ButtonGroup>
        
        <PageJump>
          Ir a página:
          <input
            type="number"
            min="1"
            max={getPageCount()}
            defaultValue={pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
          />
        </PageJump>
      </PaginationControls>
    </PaginationContainer>
  );
};

export default TablePagination;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: #ffffff;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PaginationInfo = styled.div`
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PageSizeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  
  select {
    padding: 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &:hover {
      border-color: #d1d5db;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f8fafc;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background:${theme.colors.darkSecondary};
    color: white;
    transform: scale(1.05);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

const PageInfo = styled.div`
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
`;

const PageJump = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  
  input {
    width: 60px;
    padding: 8px 12px;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &:hover {
      border-color: #d1d5db;
    }
  }
`;
