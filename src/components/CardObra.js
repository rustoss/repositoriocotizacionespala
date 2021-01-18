import { Fragment, useState, useContext } from 'react';
import { Card, Container, CardActions, CardContent, Grid, Typography, makeStyles }  from '@material-ui/core/';
import {Pagination} from '@material-ui/lab/';
import {ComponenteContext} from '../context/ComponenteContext'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



const CardObra = ({siguientecomponente, rows, cantidadcards, totalpaginas, paginaactual, paginafinal, guardarPaginaFinal, page, setPage, guardarPaginaActual, obrastotal, guardarObra}) => {


    const classes = useStyles();
        
    
    
    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

    

    const handleChange = (event, value) => {
      setPage(value);    
      guardarPaginaActual((cantidadcards*value)-cantidadcards)   
      guardarPaginaFinal(cantidadcards*value) 
    };

    const seleccionarObra = e => {
        const obraSeleccionada = obrastotal.filter(row => row.folio_obra === e.target.id)        
      
        const obra = obraSeleccionada[0]        
     
        guardarObra(obra)
        guardarComponenteContx({
          ...componentecontx,
          numero_componente: siguientecomponente
        })
        /*



        guardarComponente({
          ...componente,
          numero_componente: 3
        })





        */
    }

    return (
        <Fragment>    
        <main>        
            <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={2}>
                {rows.slice(paginaactual, paginafinal).map((row) => (
                <Grid item key={row.folioObra} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>                  
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Folio Obra: {row.folioObra}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          Folio Cotizacion: {row.folioObra}
                        </Typography>
                        <Typography>
                        {row.nombreObra}
                        </Typography>

                        </CardContent>
                        <CardActions>
                        <input
                            type='button'
                            id={row.folioObra}
                            value="Seleccionar"
                            onClick={seleccionarObra}
                        />
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            

            </Container>
            <Grid
               container
               spacing={0}
               direction="column"
               alignItems="center"
               justify="center"
            >
              <div className={classes.root}>
                <Pagination count={totalpaginas} page={page} onChange={handleChange} />
              </div>
            </Grid>
        </main>
        </Fragment>
    );
}

export default CardObra