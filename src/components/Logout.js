import React, { useContext } from 'react';
import { GlobalContext } from '../App';


const LogoutButton = (props) => {

  const { isLoggedIn, setisLoggedIn, isAdmin, setisAdmin } = useContext(GlobalContext);
    const cookieName = "token"
    function handleLogout(){
        console.log("Button Logout Clicked");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        setisLoggedIn(false);
        setisAdmin(false);
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setisLoggedIn(false);
        
    }
  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
