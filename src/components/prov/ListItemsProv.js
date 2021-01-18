import { useContext } from 'react'
import { ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core/';
import { Dashboard, ShoppingCart, People } from '@material-ui/icons';
import {ComponenteContext} from '../../context/ComponenteContext'
import {guardarLS} from '../../funciones/guardarLS'

const ListItemsProv = ( { guardarPaginaActual, obrasdisponibles, guardarRowsObrasDisponibles, obrascotizadas, guardarRowsObrasCotizadas, setPage} ) => {

  const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)
  const { nivel_acceso, numero_ventana, numero_componente } = componentecontx
  
  const handleClickPerfil = () => {   
    
    guardarLS( nivel_acceso, 1, numero_ventana)
    guardarPaginaActual(0)
    setPage(1)
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 1
    })
  }
  
  const handleClickObrasDisp = () => {    
    const obras = obrasdisponibles.map(obra => (
      {
        folioObra: obra.folio_obra,
        nombreObra: obra.nombre_obra                    
      }
    ))
    guardarRowsObrasDisponibles(obras)
    guardarLS( nivel_acceso, 0, numero_ventana)
    guardarPaginaActual(0)
    setPage(1)
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 0
    })
  }

  const handleClickObrasCoti = () => {
    const obras = obrascotizadas.map(obra => (
      {
        folioObra: obra.folio_obra,
        folioCotizacion: obra.folio_cotizacion,
        nombreObra: obra.nombre_obra                    
      }
    ))
    guardarRowsObrasCotizadas(obras)
    guardarLS( nivel_acceso, 2, numero_ventana)
    guardarPaginaActual(0)
    setPage(1)
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 2
    })
  }

  return (
    <List>
    <div>
      <ListItem 
        button
        onClick={handleClickPerfil}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
      <ListItem
        button
        onClick={handleClickObrasDisp}
      >
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Obras Disponibles" />
      </ListItem>
      <ListItem
        button
        onClick={handleClickObrasCoti}
      >
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Obras Cotizadas" />
      </ListItem>      
    </div>
    </List>
  )
}

export default ListItemsProv
