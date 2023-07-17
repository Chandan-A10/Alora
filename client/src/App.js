import { Route, Routes } from "react-router-dom";
import { privateRoute, publicRoutes } from "./routes/route";

const App = () => {
  return (
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
        {privateRoute.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
