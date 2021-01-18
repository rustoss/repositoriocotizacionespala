import { useState, useContext } from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel} from '@material-ui/core';
import {Checkbox, Link, Grid, Box, Typography, makeStyles, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Error from './Error'
import Copyright from './Copyright'
import {ComponenteContext} from '../context/ComponenteContext'
import {guardarLS} from '../funciones/guardarLS'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = ({ }) => {

    const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)    

    //console.log(`nivel acceso: ${nivel_acceso} y numero ventana: ${numero_ventana}`);

    const [ datoslogeo, guardarDatosLogeo] = useState({
        email: '',
        password: ''
    })
    const [ error, guardarError ] = useState(false)

    const { email, password } = datoslogeo
    
    const changeSubmit = e =>{
        guardarDatosLogeo({
            ...datoslogeo,
            [e.target.name]: e.target.value
        })
    }
    


    // const consultarAPI = async () => {
    //     const consulta = Axios.post('http://localhost:5000/api/auth', {
    //         email: email,
    //         password: password
    //     })
    //     consulta
    //         .then(value => {
    //             guardarBandLogin(true)
    //         })
    //         .catch(error => guardarError(true))
    // }
    const consultarAPI = async () => {
        try{
            const consulta = await axios.post('https://apicotizacion.herokuapp.com/api/autorizacion', {
                correo: email,
                password: password
            })
                               

            const decoded = jwt_decode(consulta.data.jwToken);
           
            localStorage.setItem('jwt', JSON.stringify(consulta.data.jwToken))
            let nivelAcceso = 1
            console.log(decoded);
            
            if (decoded.nivel_acceso === 0){
                nivelAcceso = 0
                /*


                guardarNivelAcceso(0)


                */
                const objeto = {
                    nivel_acceso: nivelAcceso,
                    numero_componente: 1,
                    numero_ventana: 1
                }
                localStorage.setItem('componente', JSON.stringify(objeto))
            }else if (decoded.nivel_acceso === 1 ){
                nivelAcceso = 1
                const objeto = {
                    nivel_acceso: nivelAcceso,
                    numero_componente: 1,
                    numero_ventana: 1
                }
                localStorage.setItem('componente', JSON.stringify(objeto))
                /*



                guardarNivelAcceso(0)


                */
            }else{
                alert("no se ha podido acceder")
            }
            guardarComponenteContx({
                nivel_acceso: nivelAcceso,
                numero_ventana: 1,
                numero_componente: 1
            })
            /*




            guardarNumeroComponente(1)



            */
        }
        catch{            
            guardarError(true)            
        }
      
    }

    const logeo = e => {
        e.preventDefault()

        if ( email.trim() === '' || password.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)
        consultarAPI()
    }

    const registarse = () => {

        guardarLS(null, null, 2)
        guardarComponenteContx({
            ...componentecontx,
            numero_ventana: 2
        })

        /*




        guardarNumeroComponente(2)



        */
    }

    const classes = useStyles();
    return ( 
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            { error ? <Error mensaje='Email o password incorrecto'/> : null}
            <form 
                className={classes.form} noValidate
                onSubmit={logeo}   
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={changeSubmit}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={changeSubmit}
                />                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                Ingresar
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" onClick={registarse}>
                        {"Registrate"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
            <Box mt={8}>
            <Copyright />
            </Box>
        </Container>
     );
}
 
export default Login;