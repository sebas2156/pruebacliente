// src/pages/Bloques.js
import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import ResourcePage from "../../../components/resource/resourcepage";
import { useSucursales } from "../../../api/sucursalservice"; // Importa el nuevo servicio

const Bloques = () => {
  const columnHelper = createColumnHelper();
  const { sucursales, loading: sucursalesLoading } = useSucursales();

  const columns = useMemo(() => [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("nombre", { 
      header: "Nombre",
      cell: info => <strong>{info.getValue()}</strong>
    }),
    columnHelper.accessor("sucursal", { 
      header: "Sucursal",
      cell: info => info.row.original.sucursalNombre || "N/A"
    }),
  ], [columnHelper]);

  const formFields = () => [
    {
      name: "nombre",
      label: "Nombre",
      required: true,
      placeholder: "Nombre del bloque"
    },
    {
      name: "idsucursal",
      label: "Sucursal",
      type: "select",
      required: true,
      options: sucursales.map(s => ({
        value: s.id,
        label: s.nombre
      })),
      disabled: sucursalesLoading // Deshabilitar mientras carga
    },
  ];

  const transformRequest = (data) => {
    return data;
  };

  const transformResponse = (apiData) => {
    if (!apiData) return { items: [], total: 0 };
    
    const responseData = apiData.data;
    let items = [];
    let total = 0;

    if (responseData && responseData.data) {
      items = responseData.data.data || [];
      total = responseData.data.total_registros || 0;
    } else {
      items = responseData || [];
      total = responseData?.length || 0;
    }

    // Mapear IDs de sucursal a nombres
    return {
      items: items.map(item => ({
        ...item,
        sucursalNombre: sucursales.find(s => s.id === item.idsucursal)?.nombre || item.idsucursal
      })),
      total
    };
  };

  return (
    <ResourcePage
      resourceName="bloques"
      resourceLabel="Bloque"
      endpoint="bloque/bloques/"
      formFields={formFields}
      columns={columns}
      rowIdentifier="nombre"
      transformRequest={transformRequest}
      transformResponse={transformResponse}
      paginationParams={{ skip: "skip", limit: "limit" }}
      // Mostrar spinner mientras cargan las sucursales
      isLoading={sucursalesLoading}
    />
  );
};

export default Bloques;