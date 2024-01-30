import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, FormControlLabel, FormGroup, FormLabel, Grid, Paper, Radio, RadioGroup, Switch, TextField } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { IkrnReportes, InitKrnReportes } from '../hooks/useFetch';


interface SelectedRows {
  data: Array<{ index: number; dataIndex: number }>;
}

const CustomBodyCell = styled.span`
  color: rgba(0, 0, 0, 0.6);
  padding: 2px 4px;
  text-align: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: #d8d8d8;
  }
`;

type MUIDataTableOptions = any;

interface Column {
  name: string;
  label: string;
  options?: MUIDataTableOptions;
}

interface CustomDataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  options?: MUIDataTableOptions;
  onAddClick?: (rowData: any) => void;
  onEditClick?: (rowData: any) => void;
  onDeleteClick?: (rowData: any) => void;
  onCopyClick?: (rowData: any) => void;
}

const ToolbarSelectContainer = styled('div')`
display: flex;
justify-content: flex-end;
`;

const CustomDataTable: React.FC<CustomDataTableProps> = ({
  title,
  data,
  columns,
  options = { sort: true },
  onAddClick,
  onEditClick,
  onDeleteClick,
  onCopyClick,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<IkrnReportes>(InitKrnReportes);
  const [currentAction, setCurrentAction] = useState<'delete' | 'edit' | 'copy' | 'add' | null>(null);
  const handleOpenDialog = (rowData: IkrnReportes, action: 'delete' | 'edit' | 'copy' | 'add') => {
    setSelectedRowData( action === 'copy' ? { ...rowData, reporteKey: -1 } : rowData );
    setCurrentAction(action); // Guardar la acción que se ha iniciado
    setDialogOpen( action != 'delete' ? true : false );
    setDialogOpenDelete( action === 'delete' ? true : false )
  };
  const handleConfirmAction = () => {
    if (currentAction && selectedRowData) {
      switch (currentAction) {
        case 'delete':
          onDeleteClick && onDeleteClick(selectedRowData);
          break;
        case 'edit':
          onEditClick && onEditClick(selectedRowData);
          break;
        case 'copy':
          onCopyClick && onCopyClick(selectedRowData);
          break;
        case 'add':
          onAddClick && onAddClick(selectedRowData);
        break;
        default:
          break;
      }
    }
    handleCloseDialog();
    handleCloseDialogDelete();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseDialogDelete = () => {
    setDialogOpenDelete(false);
  };

  const defaultOptions: MUIDataTableOptions = {
    sort: true,
    selectableRows: "single",
    sortOrder: {},
    textLabels: {
      body: {
        noMatch: "Lo siento, no se encontraron registros",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column: any) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Siguiente página",
        previous: "Página anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas de la Tabla",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar Filas Seleccionadas",
      },
    },
    filter: false,
    customToolbar: () => {
      return (
        <React.Fragment>
          {onAddClick && (
            <Tooltip title="Añadir nuevo elemento" placement="bottom">
              <IconButton onClick={() => handleOpenDialog(InitKrnReportes, 'add')}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </React.Fragment>
      );
    },


    customToolbarSelect: (selectedRows: SelectedRows) => (
      <ToolbarSelectContainer>
        {onDeleteClick && (
          <Tooltip title="Eliminar elemento" placement="bottom">
            <IconButton onClick={() => handleOpenDialog(getSelectedData(selectedRows), 'delete')}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {onEditClick && (
          <Tooltip title="Editar elemento" placement="bottom">
            <IconButton onClick={() => handleOpenDialog(getSelectedData(selectedRows), 'edit')}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {onCopyClick && (
          <Tooltip title="Duplicar elemento" placement="bottom">
            <IconButton onClick={() => handleOpenDialog(getSelectedData(selectedRows), 'copy')}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        )}
      </ToolbarSelectContainer>
    ),
  };

  // función para obtener datos seleccionados
  const getSelectedData = (selectedRows: SelectedRows) => {
    const selectedData = selectedRows.data.map(({ dataIndex }) => data[dataIndex]);
    return selectedData.length === 1 ? selectedData[0] : null;
  };

  const modifiedColumns = columns.map((column: Column) => ({
    name: column.name,
    label: column.label,
    options: {
      ...column.options,
      setCellHeaderProps: () => ({
        style: {
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.7)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'left',
          paddingLeft: '16px',
          borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
          fontSize: '1rem',
          letterSpacing: '0.05em',
          transition: 'all 0.3s',
          '&:hover': {
            backgroundColor: 'rgba(65, 151, 203, 0.3)',
          },
        },
      }),
      customBodyRender: (value: any) => (
        <CustomBodyCell>{value}</CustomBodyCell>
      ),
    },
  }));

  // aqui combinamos las opciones :v
  const finalOptions = { ...defaultOptions, ...defaultOptions, ...options };

  return (
    <>
      <MUIDataTable
        title={title}
        data={data}
        columns={modifiedColumns}
        options={finalOptions}
      />
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth='lg'>
        <DialogTitle>Añadir</DialogTitle>
        <DialogContent>
          <DialogContent>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    value={selectedRowData.reporteKey === -1 ? '' : selectedRowData.reporteKey}
                    onChange={(e) => { setSelectedRowData({ ...selectedRowData, reporteKey: parseInt(e.target.value) }) }}
                    id='reporte-key'
                    label="Cve. Reporte"
                    variant="outlined"
                    size='small'
                    disabled
                    fullWidth />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    value={selectedRowData.nombre}
                    onChange={(e) => { setSelectedRowData({ ...selectedRowData, nombre: e.target.value }) }}
                    id='nombre'
                    label="Nombre"
                    variant="outlined"
                    size='small'
                    fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={selectedRowData.asunto}
                    onChange={(e) => { setSelectedRowData({ ...selectedRowData, asunto: e.target.value }) }}
                    id='asunto'
                    label="Asunto"
                    variant="outlined"
                    size='small'
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={selectedRowData.destinatarios}
                    onChange={(e) => { setSelectedRowData({ ...selectedRowData, destinatarios: e.target.value }) }}
                    id='destinatarios'
                    label="Destinatarios"
                    variant="outlined"
                    size='small'
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={selectedRowData.query}
                    onChange={(e) => { setSelectedRowData({ ...selectedRowData, query: e.target.value }) }}
                    id='query'
                    label="Query"
                    variant="outlined"
                    multiline
                    rows={8}
                    size='small'
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={selectedRowData.plantillaCorreo}
                    onChange={(e) => { setSelectedRowData({ ...selectedRowData, plantillaCorreo: e.target.value }) }}
                    id='plantilla-correo'
                    label="Plantilla de correo"
                    variant="outlined"
                    multiline
                    rows={8}
                    size='small'
                    fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                    <FormLabel id="TipoRadio">Tipo</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="TipoRadio"
                      defaultValue={selectedRowData.tipo ? selectedRowData.tipo: 'EXCEL' }
                      onChange={(e) => { setSelectedRowData({ ...selectedRowData, tipo: e.target.value }) }}
                    >
                      <FormControlLabel value="EXCEL" control={<Radio />} label="Excel" />
                      <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
                    </RadioGroup>
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormGroup>
                  <FormLabel id="estatus">Estatus</FormLabel>
                    <FormControlLabel 
                    name='estatus'
                    control={<Switch defaultChecked 
                    onChange={(e) => {
                      if(e.target.checked){
                        setSelectedRowData({ ...selectedRowData, estatus: 'ACTIVO' })
                      }else{
                        setSelectedRowData({ ...selectedRowData, estatus: 'INACTIVO' })
                      }
                      console.log("Switch", e.target.checked)
                    } } />} label={selectedRowData.estatus?.toLowerCase()} />
                  </FormGroup>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" id='aceptar' onClick={handleConfirmAction} startIcon={<SaveIcon />} sx={{ marginRight: '10px' }}>Guardar</Button>
          <Button variant="contained" color="error" id='eliminar' onClick={handleCloseDialog} startIcon={<CancelIcon />}>Cancelar</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={dialogOpenDelete} onClose={handleCloseDialogDelete} maxWidth='sm'>
        <DialogTitle>Eliminar elemento</DialogTitle>
        <DialogContent>
          <DialogContent>
            <Box>
              {`¿Quieres eliminar el registro? ${selectedRowData.reporteKey} ${selectedRowData.asunto}`}
            </Box>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button 
          variant="contained" 
          color="error"
           id='aceptar-eliminar' 
           onClick={handleConfirmAction} startIcon={<SaveIcon />} 
           sx={{ marginRight: '10px' }}>Eliminar</Button>
          <Button 
          variant="contained" 
          color="secondary" 
          id='cancelar-eliminar' 
          onClick={handleCloseDialogDelete} 
          startIcon={<CancelIcon />}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDataTable;