import "@fortawesome/react-fontawesome";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import store from "./store/store";
import { Provider } from "react-redux";
import AddVehicle from "./components/vehicles/AddVehicle";
import ViewVehicles from "./components/vehicles/ViewVehicles";
import EditVehicle from "./components/vehicles/EditVehicle";
import ViewGoods from "./components/goods/ViewGoods";
import AddGoods from "./components/goods/AddGoods";
import EditGoods from "./components/goods/EditGoods";
import ViewCustomers from "./components/customers/ViewCustomers";
import AddCustomer from "./components/customers/AddCustomer";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addVehicle" element={<AddVehicle />} />
              <Route path="/vehicles" element={<ViewVehicles />} />
              <Route path="/editVehicle/:vehicleId" element={<EditVehicle />} />

              <Route path="/goods" element={<ViewGoods />} />
              <Route path="/addGoods" element={<AddGoods />} />
              <Route path="/editGoods/:goodsId" element={<EditGoods />} />

              <Route path="/customers" element={<ViewCustomers />} />
              <Route path="/addCustomer" element={<AddCustomer />} />
            </Routes>
          </Router>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
