import React from 'react';
import {Button, InputLabel, Select, MenuItem, Grid, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons/'

const FormularioCotizarObraProv = ({ guardarBandBotonRegistrar, guardarRows, rows, guardarError, categorias, subcategorias, productos, datos, guardarDatos, classes}) => {

    const { folioItem, categoria, subcategoria, producto, unidad, preciounitario, requeridos, anotaciones, vigencia, sostenimiento, condiciones } = datos

    const handleChange = e => {
        console.log(e.target.value)
               
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const submitTabla = e => {
        e.preventDefault()

        if (producto.trim() === '' || preciounitario.trim() === '' || anotaciones.trim() === '' || unidad.trim() === '' || sostenimiento.trim() === '' || condiciones.trim() === ''){
            guardarError({ bandError: true, mensajeError: 'Todos los campos son obligadorios' })
            return
        }

        const result = rows.find(row => row.folioItem === folioItem)        

        if (result){            
            guardarError({ bandError: true, mensajeError: 'El producto ya ha sido ingresado' })
            return
        }

        guardarError({ bandError: false, mensajeError: '' })

        guardarRows([...rows, datos])
        guardarDatos({
            folioItem: '',
            categoria: '',
            subcategoria: '',
            producto: '',
            unidad: '',
            requeridos: 0,
            anotaciones: '',
            vigencia: '',
            sostenimiento: '',
            condiciones: '',
            eliminar: ''
        })
        guardarBandBotonRegistrar(false)
    }
    return ( 
        <form
            onSubmit={submitTabla}
        >
            <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                    <TextField
                        type="date"
                        id="vigencia"
                        name="vigencia"
                        label="Fecha Vigencia"
                        defaultValue={vigencia}
                        //value={vigencia}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        id="sostenimiento"
                        name="sostenimiento"
                        label="Días de sostenimiento"                        
                        value={sostenimiento}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField                                    
                        id="condiciones"
                        name="condiciones"
                        label="Condiciones"                        
                        value={condiciones}
                        onChange={handleChange}
                        fullWidth                                    
                    />
                </Grid>
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container spacing={3}>                                
                <Grid item xs={12} md={3}>                        
                    <InputLabel id="categoria">Categoría</InputLabel>
                    <Select
                        required
                        id="categoria"
                        name='categoria'
                        value={categoria}
                        onChange={handleChange}
                        fullWidth
                    >
                        {
                            categorias.map(item => <MenuItem value={item}>{item}</MenuItem>)
                        }
                    </Select>                       
                </Grid>
                <Grid item xs={12} md={3}>                        
                    <InputLabel id="subcategoria">Sub Categoría</InputLabel>
                    <Select
                        required
                        id="subcategoria"
                        name='subcategoria'
                        value={subcategoria}
                        onChange={handleChange}
                        fullWidth
                    >
                        {
                            subcategorias.map(item => <MenuItem value={item}>{item}</MenuItem>)
                        }
                    </Select>                       
                </Grid>
                <Grid item xs={12} md={3}>                        
                    <InputLabel id="producto">Producto</InputLabel>
                    <Select
                        required
                        id="producto"
                        name='producto'
                        value={producto}
                        onChange={handleChange}
                        fullWidth
                    >
                        {
                            productos.map(item => <MenuItem value={item}>{item}</MenuItem>)
                        }                                    
                    </Select>                       
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField                                    
                        id="unidad"
                        name="unidad"
                        label="Unidad"
                        disabled
                        value={unidad}
                        onChange={handleChange}
                        fullWidth                                    
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <TextField
                        disabled
                        id="requeridos"
                        name="requeridos"
                        label="Requeridos"
                        value={requeridos}
                        onChange={handleChange}                        
                        fullWidth                                    
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField     
                    required                               
                        id="preciounitario"
                        name="preciounitario"
                        label="Precio Unitario"
                        value={preciounitario}
                        onChange={handleChange}
                        fullWidth                                    
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        required
                        id="anotaciones"
                        name="anotaciones"
                        label="Anotaciones"
                        value={anotaciones}
                        onChange={handleChange}
                        fullWidth                                    
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button
                        type='submit'
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        fullWidth
                        startIcon={<Add />}
                    >
                        Añadir
                    </Button>
                </Grid>
                
            </Grid>

        </form>
    )
}
 
export default FormularioCotizarObraProv;


/**
 * 
 * 
 * 
 */