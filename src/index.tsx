import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './Layout/Layout';
import BooksPage from './pages/BooksPage/BooksPage';
import BookPage from './pages/BookPage/BookPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <BooksPage />,
            },
            {
                path: 'book/:id',
                element: <BookPage />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
