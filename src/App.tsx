import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/Home';
import History from './pages/History/History';
import RootLayout from './RootLayout';
import Searched from './pages/History/Searched';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/history/:id",
        element: <Searched />
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App

