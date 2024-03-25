import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import './App.css';
import DetailPage from './page/Detail';
import HomePage from './page/Home';
import RootPage from './page/Root';

function App() {
  const routers = createBrowserRouter([
     {
      path: "/",
      element: <RootPage />,
      children: [
       { path: "/", element: <HomePage /> },
       { path: "/detail/:id", element: <DetailPage /> },
      ],
     },
    ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
