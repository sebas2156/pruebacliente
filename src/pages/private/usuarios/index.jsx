import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import PageContainer from "../../../components/pageContainer";
import Table from "../../../components/table/table";
import FormModal from "../../../components/form/FormModal";
import { useGet } from "../../../hook/useGet";
import apiClient from "../../../api/apiClient";

const Usuarios = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  
  // Estado unificado para el modal
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "add",
    currentUser: null,
    errors: {}
  });
  
  // Obtener datos
  const queryConfig = useMemo(() => ({
    params: {
      skip: pagination.skip,
      limit: pagination.limit
    },
    alert: true,
    onError: (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/", { replace: true });
      }
    }
  }), [pagination, navigate]);

  const { 
    data: apiData, 
    loading, 
    error, 
    refetch
  } = useGet(
    "usuario/usuarios/",
    ["usuarios", pagination.skip, pagination.limit],
    queryConfig
  );

  // Handlers para el modal
  const openModal = useCallback((mode, user = null) => {
    setModalState({
      isOpen: true,
      mode,
      currentUser: user,
      errors: {}
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false, errors: {} }));
  }, []);

  // Handler para crear/actualizar usuarios
  const handleSubmit = useCallback(async (formData) => {
    try {
      const { mode, currentUser } = modalState;
      const isAddMode = mode === "add";
      const url = isAddMode 
        ? "usuario/usuarios/" 
        : `usuario/usuarios/${currentUser.id}`;
      
      const method = isAddMode ? "post" : "put";
      const response = await apiClient[method](url, formData);

      if (response.data.status === 200 || response.data.status === 201) {
        refetch();
        closeModal();
      } else if (response.data.errors) {
        setModalState(prev => ({ ...prev, errors: response.data.errors }));
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setModalState(prev => ({ ...prev, errors: error.response.data.errors }));
      }
    }
  }, [modalState, refetch, closeModal]);

  // Handler para eliminar usuarios
  const handleDelete = useCallback(async (row) => {
    if (window.confirm(`¿Eliminar usuario ${row.usuario}?`)) {
      try {
        await apiClient.delete(`usuario/usuarios/${row.id}`);
        refetch();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  }, [refetch]);

  // Configuración de campos del formulario
  const userFields = useMemo(() => [
    { 
      name: "usuario", 
      label: "Usuario", 
      required: true,
      placeholder: "Nombre de usuario único"
    },
    { 
      name: "password", 
      label: "Contraseña", 
      type: "password",
      required: modalState.mode === "add",
      placeholder: modalState.mode === "add" 
        ? "Mínimo 8 caracteres" 
        : "Dejar vacío para mantener"
    },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      required: true,
      options: [
        { value: "activo", label: "Activo" },
        { value: "inactivo", label: "Inactivo" }
      ]
    },
    { 
      name: "idsucursal", 
      label: "ID Sucursal", 
      type: "number", 
      required: true,
      placeholder: "Número de sucursal"
    },
    { 
      name: "idpersona", 
      label: "ID Persona", 
      type: "number", 
      required: true,
      placeholder: "ID de persona asociada"
    }
  ], [modalState.mode]);

  // Configuración de columnas
  const columnHelper = useMemo(() => createColumnHelper(), []);
  const columns = useMemo(() => [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("usuario", { 
      header: "Usuario",
      cell: info => <strong>{info.getValue()}</strong>
    }),
    columnHelper.accessor("estado", {
      header: "Estado",
      cell: info => {
        const estado = info.getValue();
        const isActive = estado === "activo";
        return (
          <span className={`badge ${isActive ? 'bg-success' : 'bg-danger'}`}>
            {estado}
          </span>
        );
      }
    }),
    columnHelper.accessor("idsucursal", { header: "Sucursal" }),
    columnHelper.accessor("idpersona", { header: "Persona" })
  ], [columnHelper]);

  return (
    <PageContainer title="Gestión de Usuarios">
      {error && (
        <div className="alert alert-danger">
          {error.message || "Error al cargar usuarios"}
        </div>
      )}
      
      <Table
        data={apiData?.items || []}
        columns={columns}
        loading={loading}
        onAdd={() => openModal("add")}
        onEdit={(row) => openModal("edit", row)}
        onDelete={handleDelete}
        pagination={{
          currentPage: Math.floor(pagination.skip / pagination.limit) + 1,
          pageSize: pagination.limit,
          totalItems: apiData?.total || 0,
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
        title="Usuario"
        fields={userFields}
        initialData={modalState.currentUser || {}}
        errors={modalState.errors}
      />
    </PageContainer>
  );
};

export default Usuarios;