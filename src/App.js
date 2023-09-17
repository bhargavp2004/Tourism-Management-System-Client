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

export const GlobalContext = createContext();

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await fetch("http://localhost:5000/checkLogin");
      //   if (response.status === 200) {
      //     setisLoggedIn(true);
      //   } else {
      //     throw new Error('Failed to fetch data');
      //   }
      // } catch (error) {
      //   console.error('Error:', error);
      // }

      const token = localStorage.getItem('token');
      if(token)
      {
        setisLoggedIn(true);
      }
    };
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setisLoggedIn }}>
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
          <Route exact path="/bookPackage" element={<Booking></Booking>}></Route>
          <Route exact path="/bookingPage" element={<BookingPage></BookingPage>}></Route>
          <Route exact path="/bookingPage" element={<LogoutButton></LogoutButton>}></Route>
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;

