import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {
  AddPost,
  EditPost,
  Home,
  Login,
  NotFoundPage,
  PostDetails,
  Register,
} from "./pages/index";
import Authenticate from "./components/Authenticate.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Authenticate allowed={true}>
            <Home />,
          </Authenticate>
        ),
      },
      {
        path: "/login",
        element: (
          <Authenticate authState={false}>
            <Login />,
          </Authenticate>
        ),
      },
      {
        path: "/register",
        element: (
          <Authenticate authState={false}>
            <Register />,
          </Authenticate>
        ),
      },
      {
        path: "add-post",
        element: (
          <Authenticate authState={true}>
            <AddPost />,
          </Authenticate>
        ),
      },
      {
        path: "edit-post/:id",
        element: (
          <Authenticate authState={true}>
            <EditPost />,
          </Authenticate>
        ),
      },
      {
        path: "post-details/:id",
        element: (
          <Authenticate allowed={true}>
            <PostDetails />,
          </Authenticate>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
