import React from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Layout from 'Component/Layout';
import { PrivateRouteList, PublicRouteList } from 'Routes/routes';
import './App.css';
import "antd/dist/antd.min.css";
import { useAuth } from 'hooks';
const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const AuthenticateRoute = ({ user, redirectPath = "/dashboard" }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
function App() {
  const {session} = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
        <Route element={<AuthenticateRoute user={session} />}>
          {PublicRouteList.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component} {...route} />
            );
          })}
        </Route>

        <Route

          element={
            <React.Suspense fallback={<p>loading... </p>}>
              <ProtectedRoute user={session} />
            </React.Suspense>
          }
        >
          {PrivateRouteList.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component} {...route} />
            );
          })}
         
        </Route>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
