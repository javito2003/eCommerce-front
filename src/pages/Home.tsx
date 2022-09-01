import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h2>Ofertas y promociones</h2>
      <p>Compra Ofertas del Día, Ofertas Relámpago y descuentos por tiempo limitado</p>
      <div className='card'>
        <div className='card-body text-bg-dark'>
          <h3>categorias</h3>
        </div>
      </div>
      <div className='d-flex justify-content-end my-3'>
        <div className="dropdown">
          <button className="btn btn-outline-primary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Ordenar por: Precio bajo
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          IZQUIERDA
        </div>
        <div className="col-md-9">MEDIO</div>
      </div>
    </div>
  )
}

export default Home