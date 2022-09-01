import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux';
import * as userActions from './redux/action-creators/user'
import * as categoryActions from './redux/action-creators/categories'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(userActions.logIn() as any)
store.dispatch(categoryActions.getCategories() as any)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);