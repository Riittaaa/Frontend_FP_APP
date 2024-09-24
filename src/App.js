import "@fortawesome/react-fontawesome";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Dashboard from "./components/Dashboard";
import OrderLists from "./components/orders/OrderLists";
import AddOrder from "./components/orders/AddOrder";
import EditOrder from "./components/orders/EditOrder";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const token = localStorage.getItem("token");
  console.log(token);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/dashboard" replace /> : <Login />}
            />

            <Route
              path="/addVehicle"
              element={<ProtectedRoute element={<AddVehicle />} />}
            />
            <Route
              path="/vehicles"
              element={<ProtectedRoute element={<ViewVehicles />} />}
            />
            <Route
              path="/editVehicle/:vehicleId"
              element={<ProtectedRoute element={<EditVehicle />} />}
            />

            <Route
              path="/goods"
              element={<ProtectedRoute element={<ViewGoods />} />}
            />
            <Route
              path="/addGoods"
              element={<ProtectedRoute element={<AddGoods />} />}
            />
            <Route
              path="/editGoods/:goodsId"
              element={<ProtectedRoute element={<EditGoods />} />}
            />

            <Route
              path="/customers"
              element={<ProtectedRoute element={<ViewCustomers />} />}
            />
            <Route
              path="/addCustomer"
              element={<ProtectedRoute element={<AddCustomer />} />}
            />
            <Route
              path="/editCustomer/:customerId"
              element={<ProtectedRoute element={<EditCustomer />} />}
            />
            <Route
              path="/customers/:customerId/branches"
              element={<ProtectedRoute element={<ViewBranches />} />}
            />
            <Route
              path="/customers/:customerId/addBranch"
              element={<ProtectedRoute element={<AddBranch />} />}
            />
            <Route
              path="/customers/:customerId/branches/:customerbranchId/editBranch"
              element={<ProtectedRoute element={<EditBranch />} />}
            />

            <Route
              path="/drivers"
              element={<ProtectedRoute element={<ViewDrivers />} />}
            />
            <Route
              path="/addDriver"
              element={<ProtectedRoute element={<AddDriver />} />}
            />
            <Route
              path="/editDriver/:driverId"
              element={<ProtectedRoute element={<EditDriver />} />}
            />

            <Route
              path="/orderlists"
              element={<ProtectedRoute element={<OrderLists />} />}
            />
            <Route
              path="/addOrder"
              element={<ProtectedRoute element={<AddOrder />} />}
            />
            <Route
              path="/editOrder/:orderId"
              element={<ProtectedRoute element={<EditOrder />} />}
            />
          </Routes>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
