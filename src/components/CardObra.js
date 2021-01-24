import { Fragment, useContext } from 'react';
import { Card, Container, CardActions, CardContent, Grid, Typography, makeStyles }  from '@material-ui/core/';
import {Pagination} from '@material-ui/lab/';
import {ComponenteContext} from '../context/ComponenteContext'
import {createPDF} from '../libs/createPdf'

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
  btn:{
    background: '#3f50b5',
    border: 0,
    borderRadius: 6,
    color: 'white',
    height: 30,
    width: '100%',
    cursor: 'pointer',
    fontWeight: 600,

    '&:hover': {
        background: 'linear-gradient(45deg, #1e88e5 50%, #00b0ff 100%)',
     },
  },
}));



const CardObra = ({siguientecomponente, rows, cantidadcards, totalpaginas, paginaactual, paginafinal, guardarPaginaFinal, page, setPage, guardarPaginaActual, obrastotal, obrascotizadas, guardarObra, bandObrasCotizadas, seleccionpor }) => {


    const classes = useStyles();
        
    
    
    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)

    const { nivel_acceso } = componentecontx

    const handleChange = (event, value) => {
      setPage(value);    
      guardarPaginaActual((cantidadcards*value)-cantidadcards)   
      guardarPaginaFinal(cantidadcards*value) 
    };

    const seleccionarObra = e => {      
      if(nivel_acceso === 1 && siguientecomponente === 4 ){
        createPDF()
      }else{
        let obraSeleccionada = []        
      
        if (seleccionpor === "obra" ){
          obraSeleccionada = obrastotal.filter(row => row.folio_obra === e.target.id)
        }else{          
          obraSeleccionada = obrastotal.filter(row => row.folio_cotizacion === e.target.id)
        }
        const obra = obraSeleccionada[0]        
        
        guardarObra(obra)
        guardarComponenteContx({
          ...componentecontx,
          numero_componente: siguientecomponente
        })
      }
        
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
                <Grid item key={bandObrasCotizadas ? row.folioCotizacion:row.folioObra} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>                  
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Folio Obra: {row.folioObra}
                        </Typography>
                        {
                          bandObrasCotizadas
                          ?
                          <Typography gutterBottom variant="h6" component="h2">
                            Folio Cotizacion: {row.folioCotizacion}
                          </Typography>
                          :
                          null
                        }
                        <Typography>
                        {row.nombreObra}
                        </Typography>

                        </CardContent>
                        <CardActions>
                        <input
                            type='button'
                            id={ seleccionpor === "obra" ? row.folioObra : row.folioCotizacion}
                            value="Seleccionar"
                            onClick={seleccionarObra}
                            className={classes.btn}
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