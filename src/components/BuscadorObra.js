import FormControlLabel from '@material-ui/core/FormControlLabel'
import {Switch, Grid, TextField, withStyles} from '@material-ui/core/'


const SwitchPurple = withStyles({
	switchBase: {
		color: '#3f50b5',
		'&$checked': {
			color: '#3f50b5',
		},
		'&$checked + $track': {
			backgroundColor: '#3f50b5',
		},
	},
	checked: {},
	track: {},
})(Switch)

const BuscadorObra = ({ folio, guardarFolio, obrastotal, guardarRows, guardarErrorConsulta, bandObrasCotizadas, tipobusqueda, guardarTipoBusqueda }) => {
        
    const consulta_ = (folio_, band) => {
        let consulta = []
            if(band === 'Buscar por Folio Obra'){                
                consulta = obrastotal.filter(row => row.folio_obra.startsWith(folio_))
            }else{                
                consulta = obrastotal.filter(row => row.folio_cotizacion.startsWith(folio_))
            }
            
            if(consulta.length === 0){
                guardarErrorConsulta(true)
                return
            }
            guardarErrorConsulta(false)
            let obrasCard
            if(bandObrasCotizadas === false){
                obrasCard = consulta.map(obra => (
                    {
                    folioObra: obra.folio_obra,
                    nombreObra: obra.nombre_obra                    
                    }
                ))
            }else{
                obrasCard = consulta.map(obra => (
                    {
                    folioObra: obra.folio_obra,
                    folioCotizacion: obra.folio_cotizacion,
                    nombreObra: obra.nombre_obra                    
                    }
                ))
            }
            guardarRows(obrasCard)
            
    }
	const handleChange = e => {
        e.target.checked === false ? guardarTipoBusqueda('Buscar por Folio Obra') : guardarTipoBusqueda('Buscar por Folio Cotizacion')
        const band = e.target.checked === false ? 'Buscar por Folio Obra' : 'Buscar por Folio Cotizacion'
        consulta_(folio, band)
    }
    
    const handleChangeFolio = e => {
        
        if(e.target.value.trim() === ""){            
            //let obrasCard
            guardarErrorConsulta(false)
            if (bandObrasCotizadas === false){        
                const obrasCard = obrastotal.map(obra => (
                    {
                      folioObra: obra.folio_obra,
                      nombreObra: obra.nombre_obra                    
                    }
                ))                
                guardarRows(obrasCard)
            }else{
                const obrasCard = obrastotal.map(obra => (
                    {
                      folioObra: obra.folio_obra,
                      folioCotizacion: obra.folio_cotizacion,
                      nombreObra: obra.nombre_obra
                    }
                ))
                guardarRows(obrasCard)
            }
           
        }else{
            consulta_(e.target.value, tipobusqueda)                        
        }
        guardarFolio(e.target.value)
        
    }

	return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            {
                bandObrasCotizadas
                ?
                <FormControlLabel
                    control={<SwitchPurple onChange={handleChange}></SwitchPurple>}
                    label={tipobusqueda}
                ></FormControlLabel>
                :
                null
            }                       
            <TextField                                    
                id="folio"
                name="folio"
                label="folio"
                value={folio}
                onChange={handleChangeFolio}                                                             
            />
        </Grid>
	)
}

export default BuscadorObra
