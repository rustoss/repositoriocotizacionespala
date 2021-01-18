import { useState, useEffect, Fragment, useContext } from 'react';
import { makeStyles, FormControl, FormLabel, Radio, RadioGroup,FormControlLabel, CssBaseline, TextField, Grid, Typography, Paper } from '@material-ui/core/';
import axios from 'axios'
import Copyright from './Copyright'
import CardObra from './CardObra'
import Error from './Error'

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
    }
}))

const Obras = ( { titulo, siguientecomponente,paginaactual,guardarPaginaActual, paginafinal, guardarPaginaFinal,cantidadcards,page, setPage, totalpaginas, guardarObra, rows, guardarRows, obrastotal } ) => {

    const classes = useStyles();

    const [ folio, guardarFolio ] = useState()
    const [ errorconsulta, guardarErrorConsulta ] = useState(false)
    
    const handleChange = e => {
        if(e.target.value.trim() === ""){
            const obrasCard = obrastotal.map(obra => (
                {
                  folioObra: obra.folio_obra,
                  nombreObra: obra.nombre_obra                    
                }
            ))
            guardarRows(obrasCard)
        }else{
            const consulta = obrastotal.filter(row => row.folio_obra.startsWith(e.target.value))
            console.log(consulta);
            if(consulta.length === 0){
                guardarErrorConsulta(true)
                return
            }
            guardarErrorConsulta(false)

            const obrasCard = consulta.map(obra => (
                {
                  folioObra: obra.folio_obra,
                  nombreObra: obra.nombre_obra                    
                }
            ))
            guardarRows(obrasCard)
            
            
        }
        
    }
    const handleChangeRadio = e => {
        console.log(e.target.value);
    }
    
    
    
    return (
        <Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        {titulo}
                    </Typography>
                    <br/>
                    
                    <Grid
                       container
                       spacing={0}
                       direction="column"
                       alignItems="center"
                       justify="center"
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Folio:</FormLabel>
                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                <FormControlLabel
                                    value="obra"
                                    control={<Radio  onChange={handleChangeRadio} color="primary" />}
                                    label="Obra"
                                    labelPlacement="obra"
                                />
                                <FormControlLabel
                                    value="cotizacion"
                                    control={<Radio  onChange={handleChangeRadio} color="primary" />}
                                    label="Cotizacion"
                                    labelPlacement="cotizacion"
                                />                                                        
                            </RadioGroup>
                        </FormControl>
                        <TextField                                    
                            id="folio"
                            name="folio"
                            label="folio"
                            value={folio}
                            onChange={handleChange}                                                             
                        />
                    </Grid>
                    <br/>
                    {
                        errorconsulta
                        ? 
                        <Error mensaje={'no se ha encontrado'}/> 
                        : 
                        <CardObra
                            rows={rows}
                            obrastotal={obrastotal}
                            guardarObra={guardarObra}
                            siguientecomponente={siguientecomponente}
                            totalpaginas={totalpaginas}
                            paginaactual={paginaactual}
                            guardarPaginaActual={guardarPaginaActual}
                            paginafinal={paginafinal}
                            guardarPaginaFinal={guardarPaginaFinal}
                            page={page}
                            setPage={setPage}
                            cantidadcards={cantidadcards}
                            //guardarComponente={guardarComponente}
                            //componente={componente}
                        />
                    }
                    
                </Paper>
            </main>
            <Copyright/>
        </Fragment>
    );
}

export default Obras;