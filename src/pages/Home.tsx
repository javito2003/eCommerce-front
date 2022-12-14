import { useEffect, useState } from "react"
import { Option } from "../components"
import Products from "../components/Products"
import { IProduct } from "../interfaces/Product"
import { useAppSelector } from "../redux"
import fetchApi from "../utils/fetchApi"
import callToast from "../utils/toast"

type TSort = {
  name: string,
  value: string
}

const sortBy = [
  { name: "No filtro", value: "none" },
  { name: "Menor precio", value: "low_price" },
  { name: "Mayor precio", value: "high_price" }
]

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [sortState, setSortState] = useState<TSort>(sortBy[0])
  const [ProductName, setProductName] = useState("")
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const [fetched, setFetched] = useState(false)
  const categories = useAppSelector(store => store.category.categories)
  
  const selectCategory = (id: number) => {
    let categoryIdCopy = [...categoryIds]
    if (categoryIdCopy.indexOf(id) === -1) {
      categoryIdCopy.push(id)
    } else {
      categoryIdCopy = categoryIdCopy.filter(i => i !== id)
    }
    setCategoryIds(categoryIdCopy)
    categoriesToQuery(categoryIdCopy)
  }

  const searchProduct = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if(e) {
      e.preventDefault()
    }
    if(ProductName !== "") {
      let c = categoriesToQuery(categoryIds)
      let param = sortState.value
      let res = await fetchApi<IProduct[]>({ urlDirec: "PRODUCT", url: `/name?name=${ProductName}&sort=${param}&${c}`, method: "GET" })
      if(!res.error) {
        setProducts(res.body as IProduct[])
      }
    } else {
      await getProducts("", "")
    }
  }

  const categoriesToQuery = (c: number[]) => {
    let query = ""
    c.forEach(c => {
      query += `categories[]=${c}&`
    })
    return query
  }

  const getProducts = async (param: string, c: string) => {
    let res = await fetchApi<IProduct[]>({ urlDirec: "PRODUCT", url: `?sort=${param}&${c}`, method: "GET" })
    if (res.error) {
      callToast("Error to get products", "error")
      setFetched(true)
    } else {
      setProducts(res.body as IProduct[])
      setFetched(true)
    }
  }

  useEffect(() => {
    if(ProductName) {
      searchProduct()
    } else {
      getProducts(sortState.value, categoriesToQuery(categoryIds))
    }
  }, [sortState, categoryIds])

  return (
    <div>
      <h2>Ofertas y promociones</h2>
      <p>Compra Ofertas del D??a, Ofertas Rel??mpago y descuentos por tiempo limitado</p>
      <div className='card'>
        <div className='card-body text-bg-dark'>
          <h3>categorias</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 my-5">
          <h5>Categorias</h5>
          <div className="my-4">
            {
              categories.map(c => (
                <Option cb={selectCategory} title={c.name} id={c.Id} key={c.Id} />
              ))
            }
          </div>
        </div>
        <div className="col-md-9">
          <div className='d-flex justify-content-between my-3'>
            <div>
              <form className="d-flex" role="search">
                <input onChange={e => setProductName(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button onClick={searchProduct} className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
            <div className="dropdown">
              <button className="btn btn-outline-primary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Ordenar por: {sortState.name}
              </button>
              <ul className="dropdown-menu">
                {
                  sortBy.map(s => (
                    <li key={s.value}><span onClick={() => setSortState(s)} className="dropdown-item" style={{ cursor: "pointer" }} >{s.name}</span></li>
                  ))
                }
              </ul>
            </div>
          </div>
          <Products products={products} fetched={fetched} />
        </div>
      </div>
    </div>
  )
}

export default Home