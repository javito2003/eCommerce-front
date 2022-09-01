import { IProduct } from '../interfaces/Product'
import ProductPlaceholder from './placeholder/Product'

interface IPropProducts {
    products: IProduct[]
    fetched?: boolean
}

const Products = ({ products, fetched }: IPropProducts) => {
    if (!fetched) {
        let data = []
        for (let i = 0; i < 10; i++) {
            data.push(i)
        }

        return (
            <div className='row'>
                {
                    data.map((_, i) => (
                        <div className="col-md-3" key={i} >
                            <ProductPlaceholder />
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return (
            <div className="row">
                {
                    products.map(p => (
                        <Product product={p} key={p.Id} />
                    ))
                }
            </div>
        )
    }
}

export default Products


interface IPropProduct {
    product: IProduct
}

const Product = ({ product }: IPropProduct) => {
    return (
        <div className="card m-3" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div className="d-flex align-items-center justify-content-between">
                    <b>${product.price}</b>
                    <button className='btn btn-info'>Buy now</button>
                </div>
            </div>
        </div>
    )
}
