import React from 'react';
import '../styles/Card.css';

function MyCard(props) {
  return (
    <div className="card">
      <img src={props.img} className="card-img-top" alt="Card Image" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.desc}</p>
        <div className="button-container">
          <a href={props.add} className="btn">Add</a>
        </div>
        <div className="button-container-right">
          <a href={props.update} className="btn">Update</a>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
