import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Adminhome from './components/adminhome';
import Addpack from './components/addpackage';
import Addguide from './components/addguide';
import Addplace from './components/addplace';
import Updateplace from './components/updateplace';
import Updatepackage from './components/updatepackage';
import Updateguide from './components/updateguide';
import Booking from './components/Booking';
import BookingPage from './components/BookingPage';
import LogoutButton from './components/Logout';
import Updatepackdetails from './components/updatepackdetails';
import Updateguidedetails from './components/updateguidedetails';
import Updateplacedetails from './components/updateplacedetails';
import Travelers from './components/travellersdetails';
import UserProfile from './components/UserProfile';
export const GlobalContext = createContext();

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  const contextValues = {
    isLoggedIn,
    setisLoggedIn,
    isAdmin,
    setisAdmin,
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if(token && localStorage.getItem('isAdmin')) 
      {
        setisLoggedIn(true);
        setisAdmin(true);
        console.log("setisLoggedIn", isLoggedIn);
        console.log("isAdmin", isAdmin);
      }
      else if(token)
      {
        setisLoggedIn(true);
        console.log("setisLoggedIn", isLoggedIn);
        console.log("isAdmin", isAdmin);
      }
    };
    fetchData();
  }, [isLoggedIn, isAdmin]);

  return (
    <GlobalContext.Provider value={contextValues}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/Home" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/" element={<Signup />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/adminhome" element={<Adminhome />}></Route>
          <Route exact path="/addpack" element={<Addpack />}></Route>
          <Route exact path="/addguide" element={<Addguide />}></Route>
          <Route exact path="/addplace" element={<Addplace />}></Route>
          <Route exact path="/updatepack" element={<Updatepackage />}></Route>
          <Route exact path="/updateguide" element={<Updateguide />}></Route>
          <Route exact path="/updateplace" element={<Updateplace />}></Route>
          <Route exact path="/bookPackage/:id" element={<Booking></Booking>}></Route>
          <Route exact path="/bookingPage/:id" element={<BookingPage></BookingPage>}></Route>
          {/* <Route exact path="/bookingPage" element={<LogoutButton></LogoutButton>}></Route> */}
          <Route exact path="/updatepackdetails/:id" element={<Updatepackdetails />}></Route>
          <Route exact path="/updateguidedetails/:id" element={<Updateguidedetails />}></Route>
          <Route exact path="/updateplacedetails/:id" element={<Updateplacedetails />}></Route>
          <Route exact path="/traveler" element={<Travelers />}></Route>
          <Route exact path="/profile" element={<UserProfile />}></Route>
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;

