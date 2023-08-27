import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { router } from './router';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
