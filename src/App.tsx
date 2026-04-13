import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Navigate } from "react-router-dom";
const GroupDatasetVersions = React.lazy(
  () => import("@page/GroupDatasetVersions")
);
const ListGroupDataset = React.lazy(() => import("@page/GroupDatasets"));

// import MainLayout from "@component/layout/MainLayout";
const MainLayout = React.lazy(() => import("@component/layout/MainLayout"));
import Portal from "src/containers/Portal";
import { popperRef, popupRef } from "./constants";

const FormGroupDatasetVersions = React.lazy(
  () => import("@page/GroupDatasetVersions/Details/Form")
);
const Admin = React.lazy(() => import("@page/Users/admin"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <div>Trang chủ</div> },
        {
          path: "/pipelines",
          children: [
            { index: true, element: <ListGroupDataset /> },
            {
              path: ":groupDatasetId",
              element: <Navigate to="./pipeline-version" />,
            },
            {
              path: ":groupDatasetId/pipeline-version",
              children: [
                { index: true, element: <GroupDatasetVersions /> },
                {
                  path: "new",
                  element: <FormGroupDatasetVersions key="new" />,
                },
                {
                  path: ":datasetVersionId",
                  element: <FormGroupDatasetVersions key=":datasetVersionId" />,
                },
              ],
            },
          ],
        },
        { path: "/user-settings", element: <div>svsvsvs</div> },
        { path: "/admin", element: <Admin /> },
      ],
    },
  ]);

  return (
    <>
      <Portal.Popup ref={popupRef} />
      <Portal.Popper ref={popperRef} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
