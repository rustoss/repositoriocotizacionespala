import { Fragment, useState, useEffect } from 'react';
import { makeStyles, CssBaseline, Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import Axios from 'axios'
import DatosFiscales from './DatosFiscales';
import DatosBancarios from './DatosBancarios';
import DatosPersonales from './DatosPersonales';
import Botones from './Botones'
import Error from './Error'
import Copyright from './Copyright'
import Resumen from './Resumen'
import Modal from './Modal'
import {
  validarVaciosDatosFiscales,
  validarVaciosDatosPersonales,
  validarVaciosDatosBancarios,
  verificarFormatoDatosFiscales,
  verificarFormatoDatosPersonales,
  verificarFormatoDatosBancarios
} from '../funciones/validarDatos'

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
  }
}));

const steps = ['Datos Fiscales', 'Datos Personales', 'Datos Bancarios', 'Resumen'];

export default function Checkout({ guardarNumeroComponente }) {    
  const classes = useStyles();

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
        
        const resultado = await Axios.post('https://apicotizacion.herokuapp.com/api/proveedores', {
          nombre_empresa: nombreMoralFisica,
          rfc: rfc,
          direccion_fiscal: direccionFiscal,
          direccion_oficina: direccionOficina,
          calle_referencia1: calleReferencia1,
          calle_referencia2: calleReferencia2,
          codigo_postal: cp,
          colonia: colonia,
          ciudad: ciudad,
          estado: estado,
          correo: correo,
          nombre: nombreContacto,   
          telefono_fijo: telefonoFijo,
          telefono_movil: telefonoMovil,
          numero_clave: numeroClave,
          cuenta: cuenta,
          razon_social: razonSocial,
          password: password
        })

        let bandera = resultado.data.Error

        if(bandera === undefined){
          guardarNumeroComponente(1)
        }else{
          guardarBandDatosApi(false)
          alert(bandera)
        }
      }
    }
    consultarAPI()
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
 
  
  return (
    <Fragment>
      <CssBaseline />      
      <main className={classes.layout}>
        <Paper className={classes.paper}>
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