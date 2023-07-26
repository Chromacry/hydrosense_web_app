import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login/Login";
import WaterUsage from "../components/WaterUsage/WaterUsage";

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/login" element={<Login />} />
          {/* <Route element={<PrivateRoute />}> */}
            <Route path="/" element={<Home />} />
            <Route path="/water-usage" element={<WaterUsage />} />
          {/* </Route> */}
        </Router>
      </BrowserRouter>
    </>
  );
}

export default Routes;
