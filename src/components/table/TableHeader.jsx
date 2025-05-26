import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Search, Sheet, FileText, Plus } from "lucide-react";
const TableHeader = ({
  onAdd,
  onExportExcel,
  onExportPDF,
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <SearchContainer>
          <SearchInput
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
          />
          <SearchIcon>
            <Search />
          </SearchIcon>
        </SearchContainer>
      </LeftSection>

      <RightSection>
        <ExportButton onClick={onExportExcel} variant="excel">
          <Sheet /> Excel
        </ExportButton>
        <ExportButton onClick={onExportPDF} variant="pdf">
          <FileText />
          PDF
        </ExportButton>
        <SubmitButton onClick={onAdd}>
          <Plus />
          Agregar
        </SubmitButton>
      </RightSection>
    </HeaderContainer>
  );
};

export default TableHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  gap: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;

    > * {
      flex: 1;
      min-width: 120px;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 8px 10px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 400;
  background: #ffffff;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
    background: #ffffff;
  }

  &:hover {
    border-color: #cbd5e0;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 18px;
  pointer-events: none;
  display: flex;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  white-space: nowrap;
  background: transparent;

  ${(props) =>
    props.variant === "excel" &&
    `
    color: #10b981;
    &:hover {
      transform: translateY(-2px);
      opacity: 0.8;
    }
    
    &:active {
      transform: translateY(0);
    }
  `}

  ${(props) =>
    props.variant === "pdf" &&
    `
    color:  #ef4444;
     &:hover {
      transform: translateY(-2px);
      opacity: 0.8;
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

const SubmitButton = styled.button`
  width: 120px;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.medium};
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.short};
  box-shadow: 0 4px 10px rgba(46, 139, 87, 0.2);
  display: flex;
  gap: 5px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(46, 139, 87, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: ${theme.colors.gray};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
