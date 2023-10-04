import React from 'react';
import MyCard from './Card';
import img1 from '../images/package.jpg';
function App() {
  const rowStyle = {
    marginBottom: '40px', // Adjust the value to control the spacing
  };
  return (
    <div className="container">
      <div className="row" style={rowStyle}>
        <div className="col-md-4">
          <MyCard
            img={img1}
            title="Package"
            desc="Add Some Packages"
            add="/addpack"
            update="/updatepack"
          />
        </div>
        <div className="col-md-4">
          <MyCard
            img={img1}
            title="Guide"
            desc="Add Guide"
            add="/addguide"
            update="/updateguide"
           
          />
        </div>
        <div className="col-md-4">
          <MyCard
            img={img1}
            title="Place"
            desc="Add Some Places"
            add="/addplace"
            update="/updateplace"
           
          />
        </div>
        <div className="col-md-4">
          <MyCard
            img={img1}
            title="Add Dates"
            desc="Add Dates to Package"
            add="/adddate"
            update="/updatedate"
           
          />
        </div>
      </div>
      

      
    </div>
  );
}

export default App;
