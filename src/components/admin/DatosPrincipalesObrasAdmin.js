import {Grid, TextField } from '@material-ui/core';

const DatosPrincipalesObrasAdmin = ({ datosprincipalesobra, guardarDatosPrincipalesObra, erroresdatos, guardarErroresDatos }) => {

    const { nombreObra, direccionObra, dependenciaObra } = datosprincipalesobra

    const { errorNombreObra, errorDireccionObra, errorDependenciaObra } = erroresdatos

    const handleChange = e => {
        guardarDatosPrincipalesObra({
            ...datosprincipalesobra,
            [e.target.name]: e.target.value
        })
    }

    return (        
            <Grid container spacing={3}>                
                <Grid item xs={12} md={3}>
                    <TextField                                              
                        required     
                        error={errorNombreObra}     
                        id="nombreObra"
                        name="nombreObra"
                        label="Nombre de Obra"
                        value={nombreObra}
                        onChange={handleChange}         
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>                        
                    <TextField                                              
                        required        
                        error={errorDireccionObra}  
                        id="direccionObra"
                        name="direccionObra"
                        label="Direccion de Obra"
                        value={direccionObra}
                        onChange={handleChange}         
                        fullWidth
                    />                      
            </Grid>
                <Grid item xs={12} md={3}>                        
                    <TextField                                              
                        required   
                        error={errorDependenciaObra}       
                        id="dependenciaObra"
                        name="dependenciaObra"
                        label="Dependencia de Obra"
                        value={dependenciaObra}
                        onChange={handleChange}         
                        fullWidth
                    />                     
                </Grid>                
            </Grid>                    
    );
}
 
export default DatosPrincipalesObrasAdmin;