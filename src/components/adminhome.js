import React from 'react';
import MyCard from './Card';
import img1 from '../images/package.jpg';
import img2 from '../images/guide1.jpg'
import img3 from '../images/place.jpg'

function App() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-3 mb-4">
          <MyCard
            img={img1}
            title="Package"
            desc="Add Some Packages"
            add="/addpack"
            update="/updatepack"
          />
        </div>
        <div className="col-md-3 mb-4">
          <MyCard
            img={img2}
            title="Guide"
            desc="Add Guide"
            add="/addguide"
            update="/updateguide"
          />
        </div>
        <div className="col-md-3 mb-4">
          <MyCard
            img={img3}
            title="Place"
            desc="Add Some Places"
            add="/addplace"
            update="/updateplace"
          />
        </div>
        
      </div>
    </div>
  );
}

export default App;
