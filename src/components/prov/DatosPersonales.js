import { Fragment } from 'react';
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

export default function DatosPersonales({perfil}) {
  const classes = useStyles();

  const { correo_prov, nombre_contacto_prov, telefono_fijo_prov, telefono_movil_prov } = perfil  

  

  return (
    <div className={classes.paper}>
    <Fragment>
      <Typography variant="h6" gutterBottom className={classes.rb1}>
        DATOS PERSONALES
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled = {true}
            id="correo_prov"
            name="correo_prov"
            label="Correo"
            value={''+correo_prov}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            disabled = {true}
            id="nombre_contacto_prov"
            name="nombre_contacto_prov"
            label="Nombre contacto"
            value={''+nombre_contacto_prov}
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12}  sm={4}>
          <TextField
            disabled = {true}
            id="telefono_fijo_prov"
            name="telefono_fijo_prov"
            label="Telefono fijo"
            value={''+telefono_fijo_prov}
            fullWidth
           
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            disabled = {true}
            id="telefono_movil_prov"
            name="telefono_movil_prov"
            label="Telefono celular"
            value={''+telefono_movil_prov}
            fullWidth           
          />
        </Grid>
        
      </Grid>
      

    </Fragment>
    </div>
  );
}
