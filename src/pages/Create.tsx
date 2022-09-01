import React, { ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IProductInput } from '../interfaces/Product'
import { useAppSelector } from '../redux'
import fetchApi from '../utils/fetchApi'
import callToast from '../utils/toast'

const Create = () => {
  const history = useHistory()
  const [product, setProduct] = useState<IProductInput>({
    title: "",
    description: "",
    price: 0,
    categoryId: 0,
    userId: 0
  })
  const categories = useAppSelector(store => store.category.categories)
  const user = useAppSelector(store => store.auth.user)

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let target = e.target.name
    let value: string | number = e.target.value
    if(target === "categoryId" || target === "price") {
      value = Number(value)
    }
    setProduct({...product, [target]: value})
  }

  const createProduct = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProduct({ ...product, userId: user?.Id || 0 })
    let toSend = {
      ...product,
      userId: user?.Id,
      categoryId: product.categoryId === 0 ? 1 : product.categoryId
    }
    
    let res = await fetchApi<string>({ urlDirec: "PRODUCT", url: "/create", body: toSend, method: "POST" })
    if(res.error) {
      callToast(res.body, "error")
    } else {
      callToast(res.body + " Redireccionando...", "success")
      setTimeout(() => {
        history.push("/")
      }, 2000)
    }
  }

  return (
    <div className='row'>
      <div className="col-md-4"></div>
      <div className="col-lg-4 col-12">
        <form action="">
          <div className='my-3'>
            <label>Titulo</label>
            <input onChange={handleInput} type="text" name='title' placeholder='Nombre' className="form-control" />
          </div>
          <div className='my-3'>
            <label>Descripcion</label>
            <textarea onChange={handleInput} name='description' placeholder='Descripcion' className="form-control" />
          </div>
          <div className='my-3'>
            <label>Precio</label>
            <input onChange={handleInput} name='price' type="number" placeholder='Precio' className="form-control" />
          </div>
          <div className='my-3'>
            <label>Categoria</label>
            <select onChange={handleInput} name='categoryId' className='form-select'>
              {
                categories.map(i => (
                  <option value={i.Id} key={i.Id}>{i.name}</option>
                ))
              }
            </select>
          </div>
          <div className="d-grid">
            <button className='btn btn-success' onClick={createProduct} >Publicar</button>
          </div>
        </form>
      </div>
      <div className="col-md-4"></div>
    </div>
  )
}

export default Create