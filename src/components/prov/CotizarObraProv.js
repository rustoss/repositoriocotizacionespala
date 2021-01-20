import { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles, CssBaseline, Paper, Button, Typography, Grid } from '@material-ui/core';
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import Copyright from '../Copyright'
import TablaObraProv from './TablaObraProv'
import Error from '../Error'
import Modal from '../Modal'
import FormularioCotizarObraProv from './FormularioCotizarObraProv'
import {ComponenteContext} from '../../context/ComponenteContext'


const useStyles = makeStyles((theme) => ({
  
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      /*
      [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {    
        width: 1000,    
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      */
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
}));


const CotizarObraProv = ( { obra, guardarActualizarCards } ) => {
    const classes = useStyles();

    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

    // Creacion de states
    const [ error, guardarError ] = useState({
        bandError: false,
        mensajeError: ''
    })
    const [ categorias, guardarCategorias] = useState([])
    const [ subcategorias, guardarSubCategorias ] = useState([])
    const [ productos, guardarProductos ] = useState([])
    const [ datos, guardarDatos ] = useState({        
        folioItem: '',
        categoria: '',
        subcategoria: '',
        producto: '',
        unidad: '',
        requeridos: 0,
        preciounitario: '',
        anotaciones: '',
        eliminar: ''
    })
    const [ rows, guardarRows ] = useState([])
    const [ banddatosapi, guardarBandDatosApi ] = useState(false)
    const [openmodal, setOpenModal] = useState(false)
    const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)
    
    // Destructuring de los state
    const { categoria, subcategoria, producto } = datos
    const { bandError, mensajeError } = error


    useEffect(() => {        
        const consultarAPI = async () => {                
            const res = [...new Set(obra.materiales_obra.map(e => (e.categoria)))]            
            guardarCategorias(res)
        }
        consultarAPI()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(rows.length === 0){
            guardarBandBotonRegistrar(true)
        }
    }, [rows])

    useEffect(() => {   
        try{
            const resultado = obra.materiales_obra.filter(e => e.categoria === categoria) 
            guardarSubCategorias([...new Set(resultado.map(e => (e.subcategoria)))]) 
            guardarDatos({
                ...datos,
                folioItem: '',
                subcategoria: '',
                producto: '',
                unidad: '',
                requeridos: 0,
                preciounitario: '',
                anotaciones: '',
                eliminar: ''
            })        
        }catch{}
        //eslint-disable-next-line
    }, [categoria])

    useEffect(() => {
        try{
            const resultado = obra.materiales_obra.filter(e => e.subcategoria === subcategoria)        
            guardarProductos([...new Set(resultado.map(e => (e.producto)))]) 
            guardarDatos({
                ...datos,
                folioItem: '',
                producto: '',
                unidad: '',
                requeridos: 0,
                preciounitario: '',
                anotaciones: '',
                eliminar: ''
            })
        }catch{}
        //eslint-disable-next-line
    }, [subcategoria])

    useEffect(() => {
        try{
            const resultado = obra.materiales_obra.filter(e => e.producto === producto)

            console.log(resultado);
                
            resultado.map(e => (guardarDatos({
                ...datos,
                folioItem: e.folioItem,
                unidad: e.unidad,
                requeridos: e.requeridos
                })))
        }catch{}
        //eslint-disable-next-line
    }, [producto])

    useEffect(() => {
        const consultarAPI = async () => {
            try{
                let materiales = rows
                materiales.map(material => delete material.eliminar);


                const resultado = JSON.parse(localStorage.getItem('jwt'))
                const decoded = jwt_decode(resultado);
                console.log(decoded);
                
                let resultadoAPI = await Axios.post('https://apicotizacion.herokuapp.com/api/cotizaciones', {                    
                    "nombre_obra": obra.nombre_obra,
                    "folio_obra": obra.folio_obra,
                    "folio_cotizacion": Math.floor(Math.random() * 100) + 1,
                    "correo_prov": decoded.correo,
                    "materiales_cotizacion": materiales                    
                })
                //guardarNumeroComponenteDashboardProv(2)
                guardarActualizarCards(Math.floor(Math.random() * 500) + 1)
                guardarComponenteContx({
                    ...componentecontx,
                    numero_componente: 2
                })
                
                /*



                guardarComponente({
                    ...componente,
                    numero_componente: 2
                })



                */
            }catch(err){
                guardarBandDatosApi(false)
                alert("La obra ya ha sido registrada")
            }
        }

        if(banddatosapi && rows.length > 0){
            consultarAPI()
        }
        //eslint-disable-next-line
    }, [banddatosapi])

    const registrar = () => {
        setOpenModal(true)
    }

    return ( 
        <Fragment>
            <CssBaseline />      
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Cotización de Obra
                    </Typography>
                    <br/>
                    <br/>
                    { bandError ? <Error mensaje={mensajeError}/> : null }
                    <br/>  
                    <br/>
                    <FormularioCotizarObraProv
                        datos={datos}
                        guardarDatos={guardarDatos}
                        guardarError={guardarError}
                        rows={rows}
                        guardarRows={guardarRows}
                        guardarBandBotonRegistrar={guardarBandBotonRegistrar}
                        categorias={categorias}
                        subcategorias={subcategorias}
                        productos={productos}
                        classes={classes}
                    />
                    <br/>
                    <br/>
                    <br/> 
                    <TablaObraProv
                        rows={rows}
                        guardarRows={guardarRows}
                        guardarBandBotonRegistrar={guardarBandBotonRegistrar}
                    />
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
                    <Modal
                        openmodal={openmodal}
                        setOpenModal={setOpenModal}
                        guardarBandDatosApi={guardarBandDatosApi}
                    />
                </Paper>
                <Copyright />
            </main>
        </Fragment>
     )
}
 
export default CotizarObraProv;