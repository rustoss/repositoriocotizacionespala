import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles,} from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    overflow: '2',
    
  },
  paper: {
    marginTop: '100px',
    maxWidth: 650,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1)
    
  },


  rb1:{
    background:'#3f50b5',
    borderRadius: '60px 60px 60px 60px',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center'
   },

}));

export default function DatosPersonales({correo}) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.rb1}>
        DATOS PERSONALES
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled = {true}
            id="correo"
            name="correo"
            label="Correo"
            value={correo}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            disabled = {true}
            id="nombreContact"
            name="nombreContact"
            label="Nombre contacto"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12}  sm={4}>
          <TextField
            disabled = {true}
            id="tel"
            name="telefono"
            label="Telefono fijo"
            fullWidth
           
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            disabled = {true}
            id="cel"
            name="celular"
            label="Telefono celular"
            fullWidth
           
          />
        </Grid>
        
      </Grid>
      

    </React.Fragment>
    </div>
  );
}
