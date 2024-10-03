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
import VehiclesList from "./features/vehicles/pages/VehiclesList";
import AddVehicle from "./features/vehicles/pages/AddVehicle";
import EditVehicle from "./features/vehicles/pages/EditVehicle";
import ViewGoods from "./components/goods/ViewGoods";
import AddGoods from "./components/goods/AddGoods";
import EditGoods from "./components/goods/EditGoods";
import ViewBranches from "./components/customer_branches/ViewBranches";
import AddBranch from "./components/customer_branches/AddBranch";
import EditBranch from "./components/customer_branches/EditBranch";
import OrderLists from "./components/orders/OrderLists";
import AddOrder from "./components/orders/AddOrder";
import EditOrder from "./components/orders/EditOrder";
import CategoriesList from "./features/categories/pages/CategoriesList";
import AddCategory from "./features/categories/pages/AddCategory";
import EditCategory from "./features/categories/pages/EditCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriversList from "./features/drivers/pages/DriversList";
import AddDriver from "./features/drivers/pages/AddDriver";
import EditDriver from "./features/drivers/pages/EditDriver";
import CustomersList from "./features/customers/pages/CustomersList";
import AddCustomer from "./features/customers/pages/AddCustomer";
import EditCustomer from "./features/customers/pages/EditCustomer";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ToastContainer
          toastStyle={{
            backgroundColor: "#212529",
          }}
        />

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<OrderLists />} />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/dashboard" /> : <Login />}
            />

            <Route
              path="/vehicles/add"
              element={<ProtectedRoute element={<AddVehicle />} />}
            />
            <Route
              path="/vehicles"
              element={<ProtectedRoute element={<VehiclesList />} />}
            />
            <Route
              path="/Vehicles/edit/:vehicleId"
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
              path="/categories"
              element={<ProtectedRoute element={<CategoriesList />} />}
            />
            <Route
              path="/categories/add"
              element={<ProtectedRoute element={<AddCategory />} />}
            />
            <Route
              path="/categories/edit/:categoryId"
              element={<ProtectedRoute element={<EditCategory />} />}
            />

            <Route
              path="/customers"
              element={<ProtectedRoute element={<CustomersList />} />}
            />
            <Route
              path="/customers/add"
              element={<ProtectedRoute element={<AddCustomer />} />}
            />
            <Route
              path="/customers/edit/:customerId"
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
              element={<ProtectedRoute element={<DriversList />} />}
            />
            <Route
              path="/drivers/add"
              element={<ProtectedRoute element={<AddDriver />} />}
            />

            <Route
              path="/drivers/edit/:driverId"
              element={<ProtectedRoute element={<EditDriver />} />}
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
