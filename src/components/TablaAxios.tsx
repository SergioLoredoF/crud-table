import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Box from "@mui/material/Box";
import CustomDataTable from "./CustomDataTable";

export const TableAxios = () => {
  const [products, setProducts] = useState([]);

  const endpoint = "https://fakestoreapi.com/products";

  const getData = async () => {
    try {
      const response = await axios.get(endpoint);
      console.log("data", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // type RatingType = { rate: number, count: number };
  // type TableMetaType = {
  //   // Define aquí los campos que necesites de tableMeta
  //   rowData: any[];
  // };
  
  
  const columns = [
    {
      name: "id",
      label: "ID"
    },
    {
      name: "title",
      label: "TÍTULO"
    },
    {
      name: "category",
      label: "CATEGORÍA"
    },
    {
      name: "price",
      label: "PRECIO"
    },
    {
      name: "description",
      label: "DESCRIPCION"
    },
    {
      name: "title",
      label: "title"
    },
  ];

  const handleAddClick = () => {
    console.log('Añadir nuevo registro');
  };
  const handleEditClick = (rowData: any) => {
    console.log('Editar registro seleccionado', rowData);
  };

  const handleDeleteClick = (rowData: any) => {
    console.log('Eliminar registro seleccionado', rowData);
  };

  const handleCopyClick = (rowData: any) => {
    console.log('Duplicar registro seleccionado', rowData);
  };
  return (
    <Box p={15}>
      <CustomDataTable
        title={"Consumiendo Datos con Axios"}
        data={products}
        columns={columns}
        onAddClick={handleAddClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onCopyClick={handleCopyClick}
      />
    </Box>

  );
};