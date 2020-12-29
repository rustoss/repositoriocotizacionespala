import { Fragment, useState } from 'react';
import { makeStyles, CssBaseline, Paper, Button, Typography, InputLabel, Select, MenuItem, Grid, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons/'
import Copyright from './Copyright'
import TablaObrasAdmin from './TablaObrasAdmin'
import Error from './Error'

const items = [
    {
        "__id": 1,
        "categoria": "cemento",
        "subcategoria": "cemento PVC",
        "folio": "01010001",
        "nombre": "Cemento para PVC sanitario lata de 480 ml, marca Amanco",
        "unidades": "pza"
    },
    {
        "__id": 2,
        "categoria": "cemento",
        "subcategoria": "cemento PVC",
        "folio": "01010002",
        "nombre": "Cemento para pvc alta presión lata de 480 ml",
        "unidades": "pza"
    },
    {
        "__id": 3,
        "categoria": "Miscelaneos Construccion",
        "subcategoria": "Cable de acero",
        "folio": "02010001",
        "nombre": "Cable acero galvanizado 7 x 19 de 5/16\" tipo aircraft",
        "unidades": "m"
    },
    {
        "__id": 4,
        "categoria": "Miscelaneos Construccion",
        "subcategoria": "Arena",
        "folio": "02020001",
        "nombre": "Arena de mina (por camión 6m3)",
        "unidades": "m3"
    },
    {
        "__id": 5,
        "categoria": "Miscelaneos Construccion",
        "subcategoria": "Grava",
        "folio": "02030001",
        "nombre": "Grava de 1/4\"",
        "unidades": "m3"
    },
    {
        "__id": 6,
        "categoria": "Tuberias",
        "subcategoria": "PVC",
        "folio": "03010001",
        "nombre": "Codo 90° de PVC  de 3\"",
        "unidades": "pza"
    },
    {
        "__id": 7,
        "categoria": "Tuberias",
        "subcategoria": "PVC",
        "folio": "03010002",
        "nombre": "Tubo pvc sanitario de 75 mm (3\") norma extremos lisos, marca Amanco",
        "unidades": "tmo/6m"
    },
    {
        "__id": 8,
        "categoria": "Madero",
        "subcategoria": "Triplay",
        "folio": "04010001",
        "nombre": "Triplay de 1.22 x 2.44 m 15 mm 1 cara",
        "unidades": "m2"
    },
    {
        "__id": 9,
        "categoria": "Alambres",
        "subcategoria": "Recocido",
        "folio": "05010001",
        "nombre": "ALAMBRE RECOCIDO",
        "unidades": "kg"
    },
    {
        "__id": 10,
        "categoria": "Concretos",
        "subcategoria": "FC150",
        "folio": "06010001",
        "nombre": "Concreto f¨c=150 kg/cm2, pmezc",
        "unidades": "m3"
    },
    {
        "__id": 11,
        "categoria": "Concretos",
        "subcategoria": "Premezclado",
        "folio": "07010001",
        "nombre": "Concreto premezclado convencional fc=250 kg/cm2 RN, tma= 20mm rev 14 (clase 2) bombeable,",
        "unidades": "m3"
    },
    {
        "__id": 12,
        "categoria": "Traves",
        "subcategoria": "Polin",
        "folio": "08010001",
        "nombre": "Polin 3\" x 3 1/2\" x 8 regular",
        "unidades": "pt"
    },
    {
        "__id": 13,
        "categoria": "llantas",
        "subcategoria": "Moto CAT 16G",
        "folio": "09010001",
        "nombre": "LLANTAS MOTOCONFORMADORA CAT 16-G",
        "unidades": "piezas"
    },
    {
        "__id": 14,
        "categoria": "llantas",
        "subcategoria": "Cargador 988-F",
        "folio": "10010001",
        "nombre": "LLANTA PARA CARGADOR 988-F",
        "unidades": "piezas"
    },
    {
        "__id": 15,
        "categoria": "Fibras",
        "subcategoria": "Sintetica",
        "folio": "11010001",
        "nombre": "Fibra sintetica SIKA FIBER 600 GRS",
        "unidades": "pza"
    },
    {
        "__id": 15,
        "categoria": "Escalera",
        "subcategoria": "Aluminio",
        "folio": "12010001",
        "nombre": "Escalera recta de aluminio para alcanzar 11 m máximo, marca Cuprum, con sistema de izado doble con cuerda de nylon.",
        "unidades": "pza"
    },
    {
        "__id": 16,
        "categoria": "Malla",
        "subcategoria": "Electrosoldada",
        "folio": "13010001",
        "nombre": "Malla electosoldada 6x6-10x10, marca Deacero",
        "unidades": "m2"
    },
    {
        "__id": 17,
        "categoria": "impermiavilizante",
        "subcategoria": "curafest",
        "folio": "14010001",
        "nombre": "Curafest MC-320 19 lt, marca Fester",
        "unidades": "pza"
    },
    {
        "__id": 18,
        "categoria": "Primiario",
        "subcategoria": "Anticorrosivo",
        "folio": "16010001",
        "nombre": "Primario anticorrosivo #3 rojo oxido, marca Comex.",
        "unidades": "cb/19L"
    },
    {
        "__id": 19,
        "categoria": "laminas",
        "subcategoria": "Pintro",
        "folio": "17010001",
        "nombre": "LAMINA PINTRO CAL. 26",
        "unidades": "ml"
    }
]

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(1500 + theme.spacing(2) * 2)]: {    
        width: 1500,    
        marginLeft: 'auto',
        marginRight: 'auto',
      },
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
    border: {
        
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const ObrasAdmin = () => {
    const classes = useStyles();
    //const [age, setAge] = useState('')

    const [ error, guardarError ] = useState(false)

    const [ categorias, guardarCategorias] = useState([...new Set(items.map(e => (e.categoria)))])
    

    const [ subcategorias, guardarSubCategorias ] = useState()

    const [ datos, guardarDatos ] = useState({        
        folioItem: '',
        categoria: '',
        subcategoria: '',
        producto: '',
        unidad: '',
        requeridos: '',
        anotaciones: '',
        eliminar: ''
    })

    const [ rows, guardarRows ] = useState([
        //{folioItem: 'sdfd', categoria: 'dsfds', subcategoria: 'fdsf', producto: 'sdf', unidad: 'dsfdsf', requeridos: 'dsfsdf', anotaciones: 'dsf'}
    ])
    
    const { folioItem, categoria, subcategoria, producto, unidad, requeridos, anotaciones } = datos

 

    const crearObjeto = ( folioItem, categoria, subcategoria, producto, unidad, requeridos, anotaciones ) =>{  
        return { folioItem, categoria, subcategoria, producto, unidad, requeridos, anotaciones };
    }

    const submitTabla = e => {
        e.preventDefault()
        
        if (folioItem.trim() === '' || unidad.trim() === '' || requeridos.trim() === '' || anotaciones.trim() === ''){
            guardarError(true)
            return
        }
        guardarError(false)
        guardarRows([...rows, datos])
    }

    const handleChange = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

        
    }
    const handleChangeSelect = e => {
        
        //const resultado = categorias.filter(e => e.categoria === categoria)
        console.log(e);
        
    }
   

    return ( 
        <Fragment>
            <CssBaseline />      
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Registro de Obras
                    </Typography>
                    <br/>
                    <br/>
                    { error ? <Error mensaje='Todos los campos son obligatorios'/> : null }
                    <br/>
                    <form
                        onSubmit={submitTabla}
                    >
                        <Grid container spacing={3}>
                            
                            <Grid item xs={3}>
                                <TextField
                                    required                    
                                    id="folioItem"
                                    name="folioItem"
                                    label="Folio Item"
                                    value={folioItem}
                                    onChange={handleChange}              
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>                        
                                <InputLabel id="categoria">Categoría</InputLabel>
                                <Select
                                    required
                                    id="categoria"
                                    name='categoria'
                                    value={categoria}
                                    //onChange={handleChange}
                                    onSelect={handleChangeSelect}
                                    fullWidth
                                >
                                    {
                                        categorias.map(item => <MenuItem value={item}>{item}</MenuItem>)
                                    }
                                    
                                    {
                                    /*
                                    <MenuItem value={10}>Categoría 1</MenuItem>
                                    <MenuItem value={20}>Categoría 2</MenuItem>
                                    <MenuItem value={30}>Categoría</MenuItem>
                                    */    
                                    }
                                </Select>                       
                            </Grid>
                            <Grid item xs={3}>                        
                                <InputLabel id="subcategoria">Sub Categoría</InputLabel>
                                <Select
                                    required
                                    id="subcategoria"
                                    name='subcategoria'
                                    value={subcategoria}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value={10}>Sub Categoría 1</MenuItem>
                                    <MenuItem value={20}>Sub Categoría 2</MenuItem>
                                    <MenuItem value={30}>Sub Categoría</MenuItem>
                                </Select>                       
                            </Grid>
                            <Grid item xs={3}>                        
                                <InputLabel id="producto">Producto</InputLabel>
                                <Select
                                    required
                                    id="producto"
                                    name='producto'
                                    value={producto}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value={10}>Producto 1</MenuItem>
                                    <MenuItem value={20}>Producto 2</MenuItem>
                                    <MenuItem value={30}>Producto 3</MenuItem>
                                </Select>                       
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>                        
                            <Grid item xs={3}>
                                <TextField
                                    required
                                    id="unidad"
                                    name="unidad"
                                    label="Unidad"
                                    value={unidad}
                                    onChange={handleChange}
                                    fullWidth                                    
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    required
                                    id="requeridos"
                                    name="requeridos"
                                    label="Requeridos"
                                    value={requeridos}
                                    onChange={handleChange}
                                    fullWidth                                    
                                />
                            </Grid>
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                    <br/>
                    <br/>
                    <br/> 
                    <TablaObrasAdmin
                        rows={rows}
                        guardarRows={guardarRows}
                    />
                </Paper>
                <Copyright />
            </main>
        </Fragment>
     )
}
 
export default ObrasAdmin;