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
import EditCustomer from "./components/customers/EditCustomer";
import ViewBranches from "./components/customer_branches/ViewBranches";
import AddBranch from "./components/customer_branches/AddBranch";
import EditBranch from "./components/customer_branches/EditBranch";
import ViewDrivers from "./components/drivers/ViewDrivers";
import AddDriver from "./components/drivers/AddDriver";
import EditDriver from "./components/drivers/EditDriver";
import AddOrder from "./components/orders/AddOrder";
import OrderLists from "./components/orders/OrderLists";

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
              <Route
                path="/editCustomer/:customerId"
                element={<EditCustomer />}
              />

              <Route
                path="/customers/:customerId/branches"
                element={<ViewBranches />}
              />
              <Route
                path="/customers/:customerId/addBranch"
                element={<AddBranch />}
              />
              <Route
                path="/customers/:customerId/branches/:customerbranchId/editBranch"
                element={<EditBranch />}
              />

              <Route path="/drivers" element={<ViewDrivers />} />
              <Route path="/addDriver" element={<AddDriver />} />
              <Route path="/editDriver/:driverId" element={<EditDriver />} />

              <Route path="/orderlists" element={<OrderLists />} />
              <Route path="/addOrder" element={<AddOrder />} />
            </Routes>
          </Router>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
