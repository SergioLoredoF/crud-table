import { Alert, Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField } from "@mui/material";
import "./App.css";
//Componentes custom
import CustomDataTable from './components/CustomDataTable'
//CustomHooks
import useFetch from './hooks/useFetch'
import { useEffect, useState } from "react";
//Interfaces
import { IkrnReportes } from "./hooks/useFetch";

interface IAlerta {
  open: false | true,
  tipo: 'success' | 'warning' | 'error',
  mensaje: string
}

const columns = [
  {
    name: "reporteKey",
    label: "Reporte key",

  },
  {
    name: "nombre",
    label: "Nombre",

  },
  {
    name: "tipo",
    label: "Tipo",

  },
  {
    name: "estatus",
    label: "Estatus",

  },
];


function App() {
  //Hooks
  const [getData, postData, putData, deleteData] = useFetch('https://10.16.103.82/api/srkernel-configuracion/reportanet/')
  const [datosTabla, setDatosTabla] = useState<IkrnReportes[]>([])
  const [alerta, setAlerta] = useState<IAlerta>({ open: false, tipo: "success", mensaje: '' });
  const [cargando, setCargando] = useState<boolean>(false)

  useEffect(() => {
    pintarTabla()
  }, [])

  //alertas
  const mostrarAlerta = (ptipo: 'success' | 'warning' | 'error', pmensaje: string) => {
    setAlerta({ open: true, tipo: ptipo, mensaje: pmensaje });
  };

  const cerrarAlerta = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlerta({ open: false, tipo: 'success', mensaje: '' });
  };

  const pintarTabla = async () => {
    //@ts-ignore
    getData()
      .then((res) => {
        //@ts-ignore
        setDatosTabla(res)
        setCargando(false)
      })
      .catch(error => {
        mostrarAlerta('error', error.message)
        setCargando(false)
      })

  }

  const handleAddClick = (rowData: IkrnReportes) => {
    setCargando(true)
    postData(rowData)
      .then(res => {
        pintarTabla()
        mostrarAlerta('success', 'Registro guardado correctamente.')
      })
      .catch(error => {
        mostrarAlerta('error', error.message)
        setCargando(false)
      })
  };
  const handleEditClick = (rowData: IkrnReportes) => {
    setCargando(true)
    putData(rowData)
      .then(res => {
        pintarTabla()
        mostrarAlerta('success', 'Registro guardado correctamente.')
      })
      .catch(error => {
        mostrarAlerta('error', error.message)
        setCargando(false)
      })
  };

  const handleDeleteClick = (rowData: IkrnReportes) => {
    setCargando(true)
    console.log('Usar el metodo solo mandar el ID', rowData);
    deleteData(rowData)
      .then(res => {
        pintarTabla()
        mostrarAlerta('warning', 'El registro fue eliminado.')
      })
      .catch(error => {
        mostrarAlerta('error', error.message)
        setCargando(false)
      })
  };

  const handleCopyClick = (rowData: any) => {
    setCargando(true)
    postData(rowData)
      .then(res => {
        pintarTabla()
        mostrarAlerta('success', 'Registro guardado correctamente.')
      })
      .catch(error => {
        mostrarAlerta('error', error.message)
        setCargando(false)
      })
  };

  return (
    <Box>
      <Box sx={{ marginInline: '5vw', marginTop: '25px' }}>
        <CustomDataTable
          title="Reportes"
          data={datosTabla}
          columns={columns}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onCopyClick={handleCopyClick} />
      </Box>
      <Snackbar open={alerta.open} autoHideDuration={6000} onClose={cerrarAlerta}>
        <Alert
          onClose={cerrarAlerta}
          severity={alerta.tipo}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>
      {cargando &&
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          top: 0,
          left: 0,
          position: 'fixed',
          zIndex: 9999,
          background: 'rgba(223, 223, 223, 0.433)'
        }} >
          <CircularProgress />
        </Box>
      }
    </Box>
  );
}

export default App;
