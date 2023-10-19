import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import '../styles/Card.css';

const PackageCard = (props) => {
  return (
    <Container className="mb-4 my-4">
        <Card className="text-center custom-card">
          <Card.Body className="custom-card-body ">
            <Card.Title className="text-primary text-lg ">
              {props.package_name}
            </Card.Title>
            <Col>
              <Card.Text>
                <strong className="text-lg">Days:</strong> {props.package_days}
              </Card.Text>
              <Card.Text>
                <strong className="text-lg">Price:</strong> Rs. {props.package_price}
              </Card.Text>
              <Card.Text>
                <strong className="text-lg">Guide:</strong> {props.package_guide}
              </Card.Text>
            </Col>
            <div className="button-container my-4">
              <a href={`${props.add}/${props.idd}`} className="btn btn-primary custom-btn">
                {props.task}
              </a>
            </div>
          </Card.Body>
        </Card>
    </Container>
  );
};

export default PackageCard;
