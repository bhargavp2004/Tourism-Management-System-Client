import './App.css';

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
import Updatepackdetails from './components/updatepackdetails';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
       
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
            <Route exact path="/updatepackdetails/:id" element={<Updatepackdetails />}></Route>
          </Routes>
        
      </Router>
    </>
  );
}

export default App;
