import { Routes, Route } from "react-router-dom";

import { Header } from "../header";
import { RequireAuth } from "../auth";
import { routerConfig } from "../../config/router.config";

export const RouterController = () => (
  <Routes>
    <Route element={<Header />}>
      {routerConfig.map((config, i) =>
        config.requireAuth ? (
          <Route
            key={i}
            path={config.path}
            element={
              <RequireAuth>
                <config.component />
              </RequireAuth>
            }
          />
        ) : (
          <Route key={i} path={config.path} element={<config.component />} />
        )
      )}
    </Route>
  </Routes>
);
