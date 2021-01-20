import { useState, Fragment, useEffect } from 'react';
import { makeStyles, Grid, Button, CssBaseline, Typography, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core/';
import Copyright from '../Copyright'

const useStyles = makeStyles((theme) => ({ 
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        },
        paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        },
        btnregistrar: {
            float: 'right'
        },  
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    btn:{
        background: 'linear-gradient(80deg, #212121 40%, #616161 100%)',
        border: 3,
        borderRadius: 6,
        color: 'white',
        height: 30,
        width: '50%',
        cursor: 'pointer',

        '&:hover': {
        background: 'linear-gradient(80deg, #ab000d 40%, #c4001d 100%)',
        color: 'white',
        fontWeight: '700',
        fontSize: '15px'
        },
    },
}));

export default function DetalleObraAdmin({ obra }) {

  const columns = [
    { id: 'folioItem', label: 'Folio Item', minWidth: 100 },
    { id: 'categoria', label: 'Categoria', minWidth: 100 },
    {
      id: 'subcategoria',
      label: 'Sub Categoria',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'producto',
      label: 'Producto',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'unidad',
      label: 'Unidad',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'requeridos',
      label: 'Requeridos',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'anotaciones',
      label: 'Anotaciones',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'seleccionar',
      label: 'seleccionar',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    }
  ]


    const classes = useStyles()

    const [ page, setPage ] = useState(0)
    const [ rowsPerPage, setRowsPerPage ] = useState(10)
    const [ rows, guardarRows ] = useState(obra.materiales_cotizacion)
    const [ checks, guardarChecks ] = useState({})
    const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)
 
    useEffect(() => {
        const objeto = {}
        const h = obra.materiales_cotizacion.map(e => (objeto[e.folioItem] = false))
        guardarChecks(objeto)
    }, [])

  
    useEffect(() => {
        let band = false
        for (const property in checks) {
            if(checks[property]){
                band = true
                break
            }
        }        
        if(band === true){
            guardarBandBotonRegistrar(false)
        }else{
            guardarBandBotonRegistrar(true)
        }

    }, [checks])

    const registrar = () => {
        
    }
  

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    };

  const seleccionarFolio = e => {
    //const dato_eliminado = rows.filter(row => row.folioItem !== e.target.id)
    //guardarRows([...dato_eliminado])    
    guardarChecks({
        ...checks,
        [e.target.id]: e.target.checked
    })
  }

  return (
    <Fragment>
        <CssBaseline />      
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Requisición de Obras
                </Typography>
                <br/>
                <Paper className={classes.root}>
                    <TableContainer  className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                    <TableRow  hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                        const value = row[column.id]
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                            {
                                                column.id === 'seleccionar'
                                            ?
                                            <Checkbox
                                                checked={checks[row.folioItem]}
                                                id={row.folioItem}
                                                variant="contained"
                                                color="primary"
                                                onClick={seleccionarFolio}
                                            /> : value }
                                            </TableCell>
                                        );
                                        })}
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <br/>
                <Grid container justify="flex-end" spacing={3}>
                    <Grid item xs={3}>
                        <Button 
                            className={classes.btnregistrar}
                            disabled={bandbotonregistrar}
                            variant="contained"
                            color="primary"
                            onClick={registrar}
                            dir="rtl"
                        >Registrar</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Copyright />
        </main>
    </Fragment>
    
  );
}


/*


*/