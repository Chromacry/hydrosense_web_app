import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login/Login";
import WaterUsage from "../components/WaterUsage/WaterUsage";
import Dashboard from "../components/Dashboard/Dashboard";
import Users from "../components/Users/Users";
import Households from "../components/Households/Households";

function Routes() {
  // Web routes
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/water-usage" element={<WaterUsage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/households" element={<Households />} />
          </Route>
        </Router>
      </BrowserRouter>
    </>
  );
}

export default Routes;
