import { Routes, Route } from "react-router-dom"; //маршрутизатор

import Layout from "./Layout"; //обгортка з хедером
//pages
import Home from "../pages/Home/Home";
import Contacts from "../pages/Contacts/Contacts";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  //чи є такий користувач
  useEffect(() => {
    dispatch(refreshUser()); //goitApi.get("/users/current");
  }, [dispatch]);

  return isRefreshing ? null : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="/register"
        element={
          <RestrictedRoute component={<Register />} redirectTo="/contacts" />
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute component={<Login />} redirectTo="/contacts" />
        }
      />
    </Routes>
  );
}

export default App;

//  <div>
//    <h1>Phonebook (home-work_8)</h1>
//    <ContactForm />
//    <SearchBox />
//    <ContactList />
//  </div>;
