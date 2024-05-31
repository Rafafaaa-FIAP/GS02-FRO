import './styles.scss'

import error from '../../assets/images/error-404.svg'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div id="error-page">
      <div className="container">
        <img src={error} alt="erro 404" />
        <div>
          <h1>Página não encontrada</h1>
          <Link to='/'>Voltar para o site.</Link>
        </div>
      </div>
    </div>
  )
}

export default Error