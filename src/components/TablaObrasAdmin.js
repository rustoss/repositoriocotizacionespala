import { useState } from 'react';
import { makeStyles } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Input } from '@material-ui/core';



/*
const rows = [
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'), 
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
  createData('01010001', 'cemento', 'cemento PVC', 'Cemento para PVC sanitario lata de 480 ml, marca Amanco', 'pza', 2, 'que sea todo chido'),
];
*/

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TablaObrasAdmin({ rows, guardarRows }) {

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
      id: 'eliminar',
      label: 'eliminar',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    }
  ]
  
  

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //const rows = []
  //{ folioItem: 'sdfd', categoria: 'dsfds', subcategoria: 'fdsf', producto: 'sdf', unidad: 'dsfdsf', requerido: 'dsfsdf', anotaciones: 'dsf' }
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const eliminarDato = e => {
    const dato_eliminado = rows.filter(row => row.folioItem !== e.target.id)
    guardarRows([...dato_eliminado])
    
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
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
          <TableBody>
              
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>                  
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        
                        { 
                        column.id === 'eliminar' 
                        ? 
                        <input 
                          type='button'
                          id={row.folioItem}
                          value='Eliminar'
                          variant="contained"
                          color="primary"
                          onClick={eliminarDato}
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
  );
}
