import Router from './Router';
import { useAppSelector } from './redux'
import { BrowserRouter } from 'react-router-dom';
import CartItem from './components/CartItem';
function App() {
  const fetched = useAppSelector(store => store.auth.fetched)
  const cart = useAppSelector(store => store.cart.cart)
  console.log(cart);
  
  if (fetched) {
    return (
      <BrowserRouter>
        <Router />
        <div className="offcanvas offcanvas-end" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Carrito</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            {
              cart &&
                cart.items.map(item => (
                  <CartItem key={item.Id} cart_item={item} />
                ))
            }
          </div>
        </div>
      </BrowserRouter>
    );
  } else {
    return <div />
  }

}

export default App;
