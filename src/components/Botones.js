import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const Botones = ({ activeStep, steps, handleNext, handleBack }) => {
    const classes = useStyles(); 
    return ( 
        <div className={classes.buttons}>
            {activeStep !== 0 && (
            <Button onClick={handleBack} className={classes.button}>
                Atras
            </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
            >
                {activeStep === steps.length - 1 ? 'Registrarse' : 'Siguiente'}
            </Button>
        </div>
     );
}
 
export default Botones;