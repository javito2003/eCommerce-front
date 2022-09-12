import Router from './Router';
import { useAppSelector } from './redux'
import { BrowserRouter } from 'react-router-dom';
import CartItem from './components/CartItem';
function App() {
  const fetched = useAppSelector(store => store.auth.fetched)
  const { cart, cartTotal } = useAppSelector(store => store.cart)

  if (fetched) {
    return (
      <BrowserRouter>
        <Router />
        <div className="offcanvas offcanvas-end" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Carrito</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          {
            cart &&
            <div className="offcanvas-body d-flex flex-column justify-content-between">
              <div>
                {
                  cart.items.map(item => (
                    <CartItem key={item.Id} cart_item={item} />
                  ))
                }
              </div>
              <div className='p-2'>
                <div className='d-flex justify-content-between align-items-center'>
                  <h4>Total a pagar</h4>
                  <h4 className='text-primary'>${cartTotal}</h4>
                </div>
                <div className="d-grid">
                  <button className='btn btn-success'>PAY NOW</button>
                </div>
              </div>
            </div>
          }
        </div>
      </BrowserRouter>
    );
  } else {
    return <div />
  }

}

export default App;
