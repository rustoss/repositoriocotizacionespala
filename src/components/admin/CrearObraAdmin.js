import { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles, CssBaseline, Paper, Button, Typography, Grid } from '@material-ui/core';
import Axios from 'axios'
import Copyright from '../Copyright'
import TablaObrasAdmin from './TablaObrasAdmin'
import Error from '../Error'
import Modal from '../Modal'
import FormularioRegistroObrasAdmin from './FormularioRegistroObrasAdmin'
import DatosPrincipalesObrasAdmin from './DatosPrincipalesObrasAdmin'
import {ComponenteContext} from '../../context/ComponenteContext'

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
}));


const CrearObraAdmin = ( { guardarActualizarCards } ) => {
    const classes = useStyles();

    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

    // Creacion de states
    const [ error, guardarError ] = useState({
        bandError: false,
        mensajeError: ''
    })
    const [ items, guardarItems ] = useState([])
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
        anotaciones: '',
        eliminar: ''
    })
    const [ rows, guardarRows ] = useState([])
    const [ banddatosapi, guardarBandDatosApi ] = useState(false)
    const [openmodal, setOpenModal] = useState(false)
    const [ bandbotonregistrar, guardarBandBotonRegistrar ] = useState(true)
    const [ datosprincipalesobra, guardarDatosPrincipalesObra ] = useState({
        nombreObra: '',
        direccionObra: '',
        dependenciaObra: ''
    })
    const [ erroresdatos, guardarErroresDatos ] = useState({
        errorNombreObra: false,
        errorDireccionObra: false,
        errorDependenciaObra: false
    })
    
    // Destructuring de los state
    const { categoria, subcategoria, producto } = datos
    const { bandError, mensajeError } = error
    const { nombreObra, direccionObra, dependenciaObra } = datosprincipalesobra
    

    useEffect(() => {        
        const consultarAPI = async () => {
            const resultado = await Axios('https://apicotizacion.herokuapp.com/api/items')
            const res = [...new Set(resultado.data.items.map(e => (e.categoria)))]
            guardarItems(resultado.data.items)
            guardarCategorias(res)
        }
        consultarAPI()
        
    }, [])

    useEffect(() => {
        if(rows.length === 0){
            guardarBandBotonRegistrar(true)
        }
    }, [rows])

    useEffect(() => {
        const resultado = items.filter(e => e.categoria === categoria)
        guardarSubCategorias([...new Set(resultado.map(e => (e.subcategoria)))]) 
        guardarDatos({
            ...datos,
            folioItem: '',
            subcategoria: '',
            producto: '',
            unidad: ''
        })       
        //eslint-disable-next-line
    }, [categoria])

    useEffect(() => {
        const resultado = items.filter(e => e.subcategoria === subcategoria)
        guardarProductos([...new Set(resultado.map(e => (e.nombre)))]) 
        guardarDatos({
            ...datos,
            folioItem: '',
            producto: '',
            unidad: ''
        })
        //eslint-disable-next-line
    }, [subcategoria])

    useEffect(() => {
        const resultado = items.filter(e => e.nombre === producto)
               
        resultado.map(e => (guardarDatos({
               ...datos,
               unidad: e.unidades,
               folioItem: e.folio
            })))
        //eslint-disable-next-line
    }, [producto])

    useEffect(() => {
        const consultarAPI = async () => {
            try{
                let materiales = rows
                materiales.map(material => delete material.eliminar)                                
                const objeto = {
                    "nombre_obra": nombreObra,
                    "direccion_obra": direccionObra,
                    "dependencia_obra": dependenciaObra,
                    "folio_obra": Math.floor(Math.random() * 10000) + 1,
                    "creador_obra": "quien sabe",
                    "materiales_obra": materiales
                }
                let resultadoAPI = await Axios.post('https://apicotizacion.herokuapp.com/api/obras', {objeto})
                //guardarNumeroComponenteDashboardAdmin(2)
                guardarActualizarCards(Math.floor(Math.random() * 1000) + 1)
                guardarComponenteContx({
                    ...componentecontx,
                    numero_componente: 2
                })
                // guardarComponente({
                //     ...componente,
                //     numero_componente: 2
                // })
                
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
        if (nombreObra.trim() === ''){            
            guardarErroresDatos({
                ...erroresdatos,
                errorNombreObra: true
            })
            return
        }
        
        if (direccionObra.trim() === ''){
            guardarErroresDatos({
                ...erroresdatos,
                errorNombreObra: false,
                errorDireccionObra: true
            })
            return
        }
        if (dependenciaObra.trim() === '') {
            guardarErroresDatos({
                ...erroresdatos,
                errorDireccionObra: false,
                errorDependenciaObra: true
            })
            return
        }
        guardarErroresDatos({
            ...erroresdatos,
            errorNombreObra: false,
            errorDireccionObra: false,
            errorDependenciaObra: false
        })
        
        setOpenModal(true)
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
                    { bandError ? <Error mensaje={mensajeError}/> : null }
                    <br/>
                    <DatosPrincipalesObrasAdmin
                        datosprincipalesobra={datosprincipalesobra}
                        guardarDatosPrincipalesObra={guardarDatosPrincipalesObra}
                        erroresdatos={erroresdatos}
                        guardarErroresDatos={guardarErroresDatos}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <FormularioRegistroObrasAdmin
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
                    <TablaObrasAdmin
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
 
export default CrearObraAdmin;