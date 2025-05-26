import { useState } from "react";
import PageContainer from "../../../components/pageContainer";
import Table from "../../../components/table/table";
import { createColumnHelper } from "@tanstack/react-table";

import { useGet } from "../../../hooks/useGet"; // Ajusta la ruta según tu estructura

const Usuarios = () => {
  const columnHelper = createColumnHelper();

  // Usamos useGet para obtener los usuarios con React Query
  const { data, loading, refetch } = useGet(
    "api/usuario/usuarios/",
    ["usuarios", 0, 10],
    { params: { skip: 0, limit: 10 } }
  );

  // Estado local para poder modificar la tabla (eliminar filas localmente)
  const [localData, setLocalData] = useState([]);

  // Cuando data cambie, sincronizamos localData (siempre que data exista)
  React.useEffect(() => {
    if (data?.items) {
      setLocalData(data.items);
    }
  }, [data]);

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("usuario", {
      header: "Usuario",
      cell: (info) => <strong>{info.getValue()}</strong>,
    }),
    columnHelper.accessor("estado", {
      header: "Estado",
      cell: (info) => {
        const estado = info.getValue();
        const esActivo = estado === "activo";
        return (
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "500",
              backgroundColor: esActivo ? "#d4edda" : "#f8d7da",
              color: esActivo ? "#155724" : "#721c24",
              textTransform: "capitalize",
            }}
          >
            {estado}
          </span>
        );
      },
    }),
    columnHelper.accessor("idsucursal", {
      header: "ID Sucursal",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("idpersona", {
      header: "ID Persona",
      cell: (info) => info.getValue(),
    }),
  ];

  const handleAdd = () => {
    console.log("Agregar usuario no implementado todavía");
  };

  const handleEdit = (row) => {
    console.log("Editar usuario:", row);
  };

  const handleDelete = (row) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario ${row.usuario}?`)) {
      setLocalData(localData.filter((item) => item.id !== row.id));
    }
  };

  if (loading) {
    return <PageContainer title="Gestión de Usuarios">Cargando...</PageContainer>;
  }

  return (
    <PageContainer title={"Gestión de Usuarios"}>
      <Table
        data={localData}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </PageContainer>
  );
};

export default Usuarios;
