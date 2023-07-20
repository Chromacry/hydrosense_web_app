import { BrowserRouter, Route, Routes as Router } from "react-router-dom";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Router>
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route element={<PrivateRoute />}> */}
            <Route path="/" element={<Home />} />
          {/* </Route> */}
        </Router>
      </BrowserRouter>
    </>
  );
}

export default Routes;
