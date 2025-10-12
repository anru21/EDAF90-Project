import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider} from "react-router";
import './index.css'
import App from './App.tsx'
import { HomePage } from './HomePage.tsx';
import FavoritePage from './FavoritePage.tsx';

//routing (improve this)
const router = createBrowserRouter([
  { Component: App, 
    children: [
      {
        index: true,
        Component: HomePage, 
      },
      {path: "/FavoritePage", Component: FavoritePage},
      {
        path: "/*",
        element: <div className="w-full p-3">PageNotFound</div>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
