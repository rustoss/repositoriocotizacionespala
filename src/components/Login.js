import { useState } from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel} from '@material-ui/core';
import {Checkbox, Link, Grid, Box, Typography, makeStyles, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Error from './Error'
import Copyright from './Copyright'


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

const Login = ({ guardarNumeroComponente }) => {

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
            /*const consulta = await Axios.post('http://localhost:5000/api/auth', {
                email: email,
                password: password
            })*/                        
            guardarNumeroComponente(1)           
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
        guardarNumeroComponente(2)
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
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordar"
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