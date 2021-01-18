import {Fragment} from 'react';

const DetalleObraAdmin = ({obra}) => {
    const {folio_obra} = obra
    return (
        <Fragment>
            <h1>Folio Obra: {folio_obra}</h1>
        </Fragment>
    );
}
 
export default DetalleObraAdmin;