import Router from './Router';
import { useAppSelector } from './redux'
import { BrowserRouter } from 'react-router-dom';
function App() {
  const fetched = useAppSelector(store => store.auth.fetched)

  if (fetched) {
    return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  } else {
    return <div />
  }

}

export default App;
