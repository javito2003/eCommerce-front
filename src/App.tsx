import Router from './Router';
import { useAppDispatch } from './redux'
import { useEffect } from 'react';
import * as userActions from './redux/action-creators/user'
import { BrowserRouter } from 'react-router-dom';
function App() {
  const dispatch = useAppDispatch()
  

  useEffect(() => {
    dispatch(userActions.logIn() as any)
  }, [dispatch])
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    );
}

export default App;
