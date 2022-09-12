import { IProduct } from '../interfaces/Product'
import { useAppDispatch } from '../redux'
import ProductPlaceholder from './placeholder/Product'
import * as cartActions from '../redux/action-creators/cart'



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
    const dispatch = useAppDispatch()

    const addCart = async(Id: number) => {
        await dispatch(cartActions.addCart(Id, 1) as any)
    }
    return (
        <div className="card m-3" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <div className="d-flex align-items-center justify-content-between">
                    <b>${product.price}</b>
                    <button onClick={() => addCart(product.Id)} className='btn btn-info'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}
