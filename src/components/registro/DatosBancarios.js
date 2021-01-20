import { Fragment } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { schema } from '../../libs/validarDatos'

export default function DatosBancarios({ 
  datos, 
  guardarDatos,
  erroresdatos,
  guardarErroresDatos
}) {

  const { numeroClave, cuenta, razonSocial } = datos

  const { errorNumeroClave, errorCuenta} = erroresdatos

  const changeDatosBancarios = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value.trim()
    })
  }

  const inputPropsNumeroClave= () =>{
    const { error } = schema.validate({alfanumerico: numeroClave})    
    if ( error ){
      guardarErroresDatos({
        ...erroresdatos,
        errorNumeroClave: true
      })
    }else{
      guardarErroresDatos({
        ...erroresdatos,
        errorNumeroClave: false
      })
    }   
  }

  const inputPropsCuenta= () =>{
    const { error } = schema.validate({numerico: cuenta})    
    if ( error ){
      guardarErroresDatos({
        ...erroresdatos,
        errorCuenta: true
      })
    }else{
      guardarErroresDatos({
        ...erroresdatos,
        errorCuenta: false
      })
    }   
  }

  return (
    <Fragment>      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="numeroClave" 
            name="numeroClave"
            label="Numero de Clave"
            value={numeroClave}
            onChange={changeDatosBancarios}
            error={errorNumeroClave}
            onKeyUp={inputPropsNumeroClave}
            fullWidth 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cuenta"
            name="cuenta"
            value={cuenta}
            onChange={changeDatosBancarios}
            error={errorCuenta}
            onKeyUp={inputPropsCuenta}
            label="Cuenta"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField 
            required 
            id="razonSocial"
            name="razonSocial"
            value={razonSocial}
            onChange={changeDatosBancarios}
            label="Razon Social" 
            fullWidth 
          />
        </Grid>        
      </Grid>
    </Fragment>
  );
}