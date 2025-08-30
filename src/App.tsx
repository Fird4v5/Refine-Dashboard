import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider, authProvider } from "./providers";
import { Home, Register, ForgotPassword, Login, CompanyList, Create, EditCompany, List } from "./pages";
import { Outlet } from "react-router";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout";
import { resources } from "./config/resources";


function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "NBgoqv-lDqh2s-jFUMDW",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route 
                  element={<Authenticated 
                    key="authenticated-layout"
                    fallback={<CatchAllNavigate to="/login"/>}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>}
                  >
                    <Route index element={<Home />} />
                    <Route path="/companies">
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<EditCompany />} />
                    </Route>
                    <Route path="/tasks">
                      <Route index element={<List />} />
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
