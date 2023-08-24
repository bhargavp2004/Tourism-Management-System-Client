import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Signin from './components/Signin';
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
        <Navbar />
        <div className="container my-3">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/signin" element={<Signin />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
