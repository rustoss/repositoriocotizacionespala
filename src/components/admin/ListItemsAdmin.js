import { useContext } from 'react'
import { ListItem, List, ListItemIcon, ListItemText, } from '@material-ui/core/';
import { Dashboard, ShoppingCart, People } from '@material-ui/icons';
import {ComponenteContext} from '../../context/ComponenteContext'
import {guardarLS} from '../../funciones/guardarLS'


const ListItemsAdmin = ( {guardarPaginaActual } ) => {

  const { componentecontx, guardarComponenteContx } = useContext(ComponenteContext)
  const { nivel_acceso, numero_ventana, numero_componente } = componentecontx

  const handleListItemClick = () => {
    guardarLS(nivel_acceso, 1, numero_ventana)
    guardarPaginaActual(0)
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 1
    })
  }
  
  const handleListItemClick2 = () => {    
    guardarLS(nivel_acceso, 0, numero_ventana)
    guardarPaginaActual(0)
    guardarComponenteContx({
      ...componentecontx,
      numero_componente: 0
    })
  }

  const handleListItemClick3 = () => {
    guardarLS(nivel_acceso, 2, numero_ventana)
    guardarPaginaActual(0)
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
        onClick={handleListItemClick}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
      <ListItem
        button
        onClick={handleListItemClick2}
      >
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="Crear Obra" />
      </ListItem>
      <ListItem
        button
        onClick={handleListItemClick3}
      >
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Obras Creadas" />
      </ListItem>    
    </div>
    </List>
  )
}

export default ListItemsAdmin
/*
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
*/