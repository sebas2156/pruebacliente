import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/pageContainer";
import Table from "../../components/table/table";
import FormModal from "../../components/form/FormModal";
import { useGet } from "../../hook/useGet";
import apiClient from "../../api/apiClient";
import { normalizeEndpoint } from "../../utils/endpointutils"; // Importamos la utilidad

const ResourcePage = ({
  resourceName,
  resourceLabel,
  endpoint,
  formFields,
  columns,
  initialPagination = { skip: 0, limit: 10 },
  rowIdentifier = "name",
  transformRequest = (data) => data,
  transformResponse = (data) => ({
    items: data?.items || [],
    total: data?.total || 0
  }),
  paginationParams = { skip: "skip", limit: "limit" },
  onOpenModal,
  onCloseModal
}) => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(initialPagination);
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    currentItem: null,
    errors: {}
  });

  const queryConfig = useMemo(() => ({
    params: {
      [paginationParams.skip]: pagination.skip,
      [paginationParams.limit]: pagination.limit
    },
    alert: true,
    onError: (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/", { replace: true });
      }
    }
  }), [pagination, navigate, paginationParams]);

  const { 
    data: apiData, 
    loading, 
    error, 
    refetch 
  } = useGet(
    endpoint,
    [resourceName, pagination.skip, pagination.limit],
    queryConfig
  );

  const { items, total } = useMemo(() => 
    transformResponse(apiData) || { items: [], total: 0 }, 
  [apiData, transformResponse]);

  useEffect(() => {
    console.log("Datos recibidos de la API:", apiData);
    console.log("Datos transformados:", { items, total });
  }, [apiData, items, total]);

  const openModal = useCallback((mode, item = null) => {
    setModalState({
      isOpen: true,
      mode,
      currentItem: item,
      errors: {}
    });
    if (onOpenModal) onOpenModal();
  }, [onOpenModal]);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false, errors: {} }));
    if (onCloseModal) onCloseModal();
  }, [onCloseModal]);

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const { mode, currentItem } = modalState;
        const isAddMode = mode === "add";
        const method = isAddMode ? "post" : "put";
        const dataToSend = transformRequest(formData);
        
        // Usar normalizeEndpoint para construir URL correctamente
        const url = isAddMode 
          ? endpoint 
          : normalizeEndpoint(endpoint, currentItem.id);
        
        const response = await apiClient[method](url, dataToSend);

        if ([200, 201].includes(response.status)) {
          refetch();
          closeModal();
        } else if (response.data?.errors) {
          setModalState(prev => ({ ...prev, errors: response.data.errors }));
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          setModalState(prev => ({ ...prev, errors: error.response.data.errors }));
        }
      }
    },
    [modalState, refetch, closeModal, endpoint, transformRequest]
  );

  const handleDelete = useCallback(
    async (row) => {
      const identifier = typeof rowIdentifier === "function" 
        ? rowIdentifier(row) 
        : row[rowIdentifier];
      
      if (window.confirm(`¿Eliminar ${resourceLabel} ${identifier}?`)) {
        try {
          // Usar normalizeEndpoint para DELETE
          const url = normalizeEndpoint(endpoint, row.id);
          await apiClient.delete(url);
          refetch();
        } catch (error) {
          console.error("Error al eliminar:", error);
        }
      }
    },
    [refetch, endpoint, resourceLabel, rowIdentifier]
  );

  const fields = useMemo(
    () => formFields(modalState.mode),
    [formFields, modalState.mode]
  );

  return (
    <PageContainer title={`Gestión de ${resourceLabel}s`}>
      {error && (
        <div className="alert alert-danger">
          {error.message || `Error al cargar ${resourceLabel}s`}
        </div>
      )}

      <Table
        data={items}
        columns={columns}
        loading={loading}
        onAdd={() => openModal("add")}
        onEdit={(row) => openModal("edit", row)}
        onDelete={handleDelete}
        pagination={{
          currentPage: Math.floor(pagination.skip / pagination.limit) + 1,
          pageSize: pagination.limit,
          totalItems: total,
          onChange: page => setPagination(prev => ({
            ...prev,
            skip: (page - 1) * prev.limit
          }))
        }}
      />

      <FormModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalState.mode}
        title={resourceLabel}
        fields={fields}
        initialData={modalState.currentItem || {}}
        errors={modalState.errors}
      />
    </PageContainer>
  );
};

export default ResourcePage;