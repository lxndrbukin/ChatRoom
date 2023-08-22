import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(<RouterProvider router={router} />);
