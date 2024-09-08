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
            </Routes>
          </Router>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
