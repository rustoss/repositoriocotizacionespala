import { Fragment, useState, useEffect, useContext } from 'react';
import { IconButton, makeStyles, CssBaseline, Grid, Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import {Cancel} from '@material-ui/icons';
import axios from 'axios'
import DatosFiscales from './DatosFiscales';
import DatosBancarios from './DatosBancarios';
import DatosPersonales from './DatosPersonales';
import Botones from './Botones'
import Error from '../Error'
import Copyright from '../Copyright'
import Resumen from './Resumen'
import Modal from '../Modal'
import {
  validarVaciosDatosFiscales,
  validarVaciosDatosPersonales,
  validarVaciosDatosBancarios,
  verificarFormatoDatosFiscales,
  verificarFormatoDatosPersonales,
  verificarFormatoDatosBancarios
} from '../../libs/validarDatos'
import {guardarLS} from '../../libs/guardarLS'
import {ComponenteContext} from '../../context/ComponenteContext'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginRight: 0
    },
  },
  input: {
    display: 'none',
  },
}));

const steps = ['Datos Fiscales', 'Datos Personales', 'Datos Bancarios', 'Resumen'];

export default function Checkout() {    
  const classes = useStyles();

  const { guardarComponenteContx } = useContext(ComponenteContext)
  const [ activeStep, setActiveStep ] = useState(0);
  const [ error, guardarError ] = useState({
    bandError: false,
    mensajeError: ''
  })
  const [ erroresdatos, guardarErroresDatos ] = useState({
    errorRfc: false,
    errorCp: false,
    errorColonia: false,
    errorCiudad: false,
    errorEstado: false,
    errorCorreo: false,
    errorNombreContacto: false,
    errorTelefonoFijo: false,
    errorTelefonoMovil: false,
    errorNumeroClave: false,
    errorCuenta: false
  })  
  const [ banddatosapi, guardarBandDatosApi ] = useState(false)
  const [openmodal, setOpenModal] = useState(false);
  const [ datos, guardarDatos ] = useState({
    nombreMoralFisica: '',
    rfc: '',
    direccionFiscal: '',
    direccionOficina: '',
    calleReferencia1: '',
    calleReferencia2: '',
    cp: '',
    colonia: '',
    ciudad: '',
    estado: '',
    correo: '',
    password: '',
    nombreContacto: '',
    telefonoFijo: '',
    telefonoMovil: '',
    numeroClave: '',
    cuenta: '',
    razonSocial: ''
  })

  // Destructuring
  const { 
    errorRfc,
    errorCp,
    errorColonia,
    errorCiudad,
    errorEstado,
    errorCorreo,
    errorNombreContacto,
    errorTelefonoFijo,
    errorTelefonoMovil,
    errorNumeroClave,
    errorCuenta
  } = erroresdatos
  const { bandError, mensajeError } = error

  const funcGuardarError = (band, mensaje) => {
    guardarError({
      bandError: band,
      mensajeError: mensaje
    })
  }

  useEffect(() => {
    const consultarAPI = async () => {
      if(banddatosapi){
        const { nombreMoralFisica, rfc, direccionFiscal, direccionOficina } = datos
        const { calleReferencia1, calleReferencia2, cp, colonia } = datos
        const { ciudad, estado } = datos
        const { correo, password, nombreContacto, telefonoFijo, telefonoMovil} = datos        
        const { numeroClave, cuenta, razonSocial } = datos
        
        try{
          await axios.post('https://apicotizacion.herokuapp.com/api/proveedores', {
            "nombre_prov": nombreMoralFisica,
            "rfc_prov": rfc,
            "direccion_fiscal_prov": direccionFiscal,
            "direccion_oficina_prov": direccionOficina,
            "calle_referencia1_prov": calleReferencia1,
            "calle_referencia2_prov": calleReferencia2,
            "codigo_postal_prov": cp,
            "colonia_prov": colonia,
            "ciudad_prov": ciudad,
            "estado_prov": estado,
            "correo_prov": correo,
            "nombre_contacto_prov": nombreContacto,   
            "telefono_fijo_prov": telefonoFijo,
            "telefono_movil_prov": telefonoMovil,
            "numero_clave_prov": numeroClave,
            "cuenta_prov": cuenta,
            "razon_social_prov": razonSocial,
            "password_prov": password
          })

          ///guardarLS(null, null, null)

          guardarComponenteContx({
            numero_componente: null,
            numero_ventana: 0,
            nivel_acceso: null,
          })
          /*






          //guardarNumeroComponente(1)  






          */        
        }catch{
          guardarBandDatosApi(false)
          alert("El correo ya ha sido registrado")
        }        
      }
    }
    consultarAPI()
    //eslint-disable-next-line
  }, [banddatosapi])
  

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DatosFiscales
          datos={datos}
          guardarDatos={guardarDatos}
          guardarErroresDatos={guardarErroresDatos}
          erroresdatos={erroresdatos}                
        />;
      case 1:             
        return <DatosPersonales
          datos={datos}
          guardarDatos={guardarDatos}
          guardarErroresDatos={guardarErroresDatos}
          erroresdatos={erroresdatos}     
        />;
      case 2:
        return <DatosBancarios
          datos={datos}
          guardarDatos={guardarDatos}
          guardarErroresDatos={guardarErroresDatos}
          erroresdatos={erroresdatos}          
        />;
      case 3:
        return <Resumen
          datos={datos}
        />
      case 4:
        return <Resumen
          datos={datos}
        />
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {   
    if ( activeStep === 0){
      let band = validarVaciosDatosFiscales(datos)
      if(band === false) {   
        funcGuardarError(true, 'Error, hay campos vacios en los datos Fiscales')             
        return
      }
      band = verificarFormatoDatosFiscales(errorRfc, errorCp, errorColonia, errorCiudad, errorEstado)
      if(band[0] === false){
        funcGuardarError(true, band[1])
        return
      }
    } else if( activeStep === 1){
      let band = validarVaciosDatosPersonales(datos)
      if(band === false) {
        funcGuardarError(true, 'Error, hay campos vacios en los datos Personales')        
        return
      }
      band = verificarFormatoDatosPersonales(errorCorreo, errorNombreContacto, errorTelefonoFijo, errorTelefonoMovil)
      if(band[0] === false){
        funcGuardarError(true, band[1])
        return
      }
    }
    else if( activeStep === 2){
      let band = validarVaciosDatosBancarios(datos)
      if(band === false) {
        funcGuardarError(true, 'Error, hay campos vacios en los datos Bancarios')        
        return
      }
      band = verificarFormatoDatosBancarios(errorNumeroClave, errorCuenta)
      if(band[0] === false){
        funcGuardarError(true, band[1])
        return
      }
    }   
    funcGuardarError(false, '')    
    if(activeStep === steps.length-1){
      setOpenModal(true)    
      return
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const cancel = () => {
    guardarLS(null, null, 0)
    guardarComponenteContx({
      numero_componente: null,
      numero_ventana: 0,
      nivel_acceso: null,
    })
  }
  
  return (
    <Fragment>
      <CssBaseline />      
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Grid container justify="flex-end">
          <input className={classes.input} id="cancel" type="button" onClick={cancel} />
          <label htmlFor="cancel">
            <IconButton color="secondary" aria-label="cancel" component="span">
              <Cancel />
            </IconButton>
          </label>
          </Grid>
          <Typography component="h1" variant="h4" align="center">
            Registro de Proveedores
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          { bandError ? <Error mensaje={mensajeError}/> : null }
          <br/>
          <Fragment>
            {
              getStepContent(activeStep)
            }
            <Botones
              activeStep={activeStep}
              steps={steps}
              handleNext={handleNext}
              handleBack={handleBack}
            />
            <Modal
              openmodal={openmodal}
              setOpenModal={setOpenModal}
              guardarBandDatosApi={guardarBandDatosApi}
            />
          </Fragment>
        </Paper>
        <Copyright />
      </main>
    </Fragment>
  );
}