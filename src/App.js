import React, { Fragment, useState } from 'react';
import Login from './components/Login'
import Checkout from './components/Checkout'
import ObrasAdmin from './components/ObrasAdmin'

function App() {

  const [ numerocomponente, guardarNumeroComponente ] = useState(0)

  const pagina = () => {
    switch (numerocomponente) {
      case 0:
        return <Login
          guardarNumeroComponente={guardarNumeroComponente}
        />
      case 1:
        return <ObrasAdmin
          guardarNumeroComponente={guardarNumeroComponente}
        />
      case 2:
        return <Checkout
          guardarNumeroComponente={guardarNumeroComponente}
        />
      case 3:
        return 'obra registrada'
      default:
        throw new Error('Unknown step')
    }
  }
  return (
    <Fragment>
      {
        pagina()
      }
    </Fragment>
  )
}

export default App;