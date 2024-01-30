import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const FormCustom = () => {
    return (
        <Box>
            <Paper elevation={2} sx={{ padding: '30px', marginBottom: '20px' }}>
            <h1>Form</h1>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Input 1" variant="outlined" size='small' fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <TextField id="outlined-basic" label="Input 1" variant="outlined" size='small' fullWidth />
                </Grid>
                <Grid item xs={4}>
                    <TextField id="outlined-basic" label="Input 1" variant="outlined" size='small' fullWidth />
                </Grid>
                <Grid item xs={8}>
                    <TextField id="outlined-basic" label="Input 1" variant="outlined" size='small' fullWidth />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="success" fullWidth startIcon={<SaveIcon />}>Guardar</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="error" fullWidth startIcon={<CancelIcon />}>Cancelar</Button>
                </Grid>
            </Grid>
           </Paper> 
        </Box>
    )
}

export default FormCustom;