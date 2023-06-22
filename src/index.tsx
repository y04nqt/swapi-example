import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "./404";
import Loader from "./Loader";
import ItemView from "./ItemView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <h2 className="text-center mt-[calc(76.5px+1rem)]">
            Hello! Choose a subject above to search!!
          </h2>
        ),
      },
      {
        loader: ({ params }) => Loader(params),
        path: "/:id",
        element: <ItemView />,
        errorElement: <NotFound />,
      },
      {
        loader: ({ params }) => Loader(params),
        path: "/:id/:page",
        element: <ItemView />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
