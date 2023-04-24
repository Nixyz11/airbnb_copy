import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import Account from "./pages/Account";
import Places from "./pages/Places";
import Nav2 from "./components/Nav2";
import AllPlaces from "./pages/AllPlaces";
import Every from "./pages/Every";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
function App() {

  return (
    <div className="pt-2 px-4 flex flex-col h-screen pb-0">
      <UserContextProvider>
        <div className="lg:mx-0 -mx-2">
          <Navbar />
        </div>

        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/accounts" element={<Account />} />
          <Route path="/accounts/places/new" element={<Places />} />
          <Route path="/accounts/places/:id" element={<Places />} />
          <Route path="/accounts2" element={<Nav2 />} />
          <Route path="/all" element={<AllPlaces />} />
          <Route path="/every" element={<Every />} />
          <Route path="/every/:id" element={<PlacePage />} ></Route>
          <Route path="/accounts/bookings" element={<BookingsPage/>}></Route>
          <Route path="/accounts/bookings/:id" element={<BookingPage/>}></Route>
         {/*  <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} /> */}
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
