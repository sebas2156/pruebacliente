import { useState, useEffect } from "react";
import PageContainer from "../../../components/pageContainer";
import Table from "../../../components/table/table";
import { createColumnHelper } from "@tanstack/react-table";

const Usuarios = () => {
  const [data, setData] = useState([]);
  const columnHelper = createColumnHelper();

  useEffect(() => {
  const fetchUsuarios = async () => {
    const token = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type") || "bearer";

    if (!token) {
      console.warn("No hay token guardado, no se puede hacer la petición autenticada");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/usuario/usuarios/?skip=0&limit=10",
        {
          headers: {
            Accept: "application/json",
            Authorization: `${tokenType} ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Revisar si llegó un nuevo token en el header
      const newToken = response.headers.get("x-new-token");
      if (newToken) {
        console.log("Recibido nuevo token, actualizando localStorage");
        localStorage.setItem("access_token", newToken);
      }

      const result = await response.json();
      setData(result.data.items);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  fetchUsuarios();
}, []);
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
      setData(data.filter((item) => item.id !== row.id));
    }
  };

  return (
    <PageContainer title={"Gestión de Usuarios"}>
      <Table
        data={data}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </PageContainer>
  );
};

export default Usuarios;
