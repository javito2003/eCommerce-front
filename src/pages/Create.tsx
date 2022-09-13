import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import * as Yup from 'yup'

import { IProductInput } from '../interfaces/Product'
import { useAppSelector } from '../redux'
import fetchApi from '../utils/fetchApi'
import callToast from '../utils/toast'

const ProductSchema = Yup.object().shape({
  title: Yup.string().min(2, "Titulo demasiado corto").max(50, "Titulo demasiado extenso").required("Titulo es necesario"),
  price: Yup.number().min(0, "El precio debe ser mayor a 0").required("El precio es requerido"),
  categoryId: Yup.number().min(1, "La categoria es requerida").required("Titulo requerido")
})

interface IState {
  previewImage: string,
  pictureData: File | null
}


const Create = () => {
  const [ image, setImage ] = useState<IState>({ previewImage: "", pictureData: null })
  const history = useHistory()
  const categories = useAppSelector(store => store.category.categories)
  const { user, token } = useAppSelector(store => store.auth)

  const createProduct = async (values: IProductInput) => {
    if(image.pictureData) {
      const formData = new FormData()
      formData.append("picture", image.pictureData)
      formData.append("title", values.title)
      formData.append("description", values.description)
      formData.append("price", String(values.price))
      formData.append("categoryId", String(values.categoryId))
  
      let res = await fetchApi<string>({ urlDirec: "PRODUCT", url: "/create", body: formData, method: "POST", token: token, formData: true })
      console.log(res);
      
      if (res.error) {
        callToast(res.body, "error")
      } else {
        callToast(res.body + " Redireccionando...", "success")
        setTimeout(() => {
          history.push("/")
        }, 2000)
      }
    } else {
      callToast("Image is required", "error")
    }
  }

  function uploadPicture(e: React.ChangeEvent<HTMLInputElement>) {
    if(e.target.files) {
      let image = e.target.files[0]
      
      setImage({
        previewImage: URL.createObjectURL(image),
        pictureData: image
      })
    }
  }

  return (
    <div className='row'>
      <div className="col-md-4"></div>
      <div className="col-lg-4 col-12">
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: 0,
            categoryId: 0,
            userId: 0
          }}
          validationSchema={ProductSchema}
          onSubmit={(values: IProductInput, { setSubmitting }: FormikHelpers<IProductInput>) => {
            createProduct(values)
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='my-3'>
                <label>Titulo</label>
                <Field id="title" type="text" name='title' placeholder='Nombre' className="form-control" />
                {
                  errors.title && touched.title ? ( <small className='text-danger'>{errors.title}</small> ) : null
                }
              </div>
              <div className='my-3'>
                <label>Descripcion</label>
                <Field as="textarea" id="description"  name='description' placeholder='Descripcion' className="form-control" />
              </div>
              <div className='my-3'>
                <label>Precio</label>
                <Field id="price" name='price' type="number" placeholder='Precio' className="form-control" />
                {
                  errors.price && touched.price ? ( <small className='text-danger'>{errors.price}</small> ) : null
                }
              </div>
              <div className='my-3'>
                <label>Categoria</label>
                <Field as="select" id="categoryId" name='categoryId' className='form-select'>
                  {
                    categories.map(i => (
                      <option value={i.Id} key={i.Id}>{i.name}</option>
                    ))
                  }
                </Field>
                {
                  errors.categoryId && touched.categoryId ? ( <small className='text-danger'>{errors.categoryId}</small> ) : null
                }
                <div className='d-flex justify-content-between my-4'>
                  <div>
                    <label>Upload image</label>
                    <p><small className='text-info'>Solo .jpeg, jpg, png</small></p>
                    <input type="file" name='image' onChange={uploadPicture} accept=".jpeg, .jpg, .png" />
                  </div>
                  <img src={image.previewImage} width="250" alt="Product image" />
                </div>
                {
                  !image.previewImage &&
                  <small className='text-danger'>IMAGE IS REQUIRED</small>
                }
              </div>
              <div className="d-grid">
                <button type='submit' className='btn btn-success'>Publicar</button>
              </div>
            </Form>
          )}
        </Formik>
        <form action="">

        </form>
      </div>
      <div className="col-md-4"></div>
    </div>
  )
}

export default Create